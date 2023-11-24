chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        (async () => {
            if (request.type === 'dark') {
                // inject CSS
                await toggleDarkTheme(request.tabId);
                sendResponse('success')
            } else if (request.type === 'reset') {
                // remove register CSS
                await resetTheme(request.tabId);
                sendResponse('success');
            }
            // console.log(getCurrentDate())
        })();
        return true;
    }
);


// inject dynamically a css code
async function toggleDarkTheme(tabId) {
    try {
        await chrome.scripting.insertCSS({
            target: {
                tabId: tabId,
            },
            files: ["css/convert.css"],
        });
        chrome.storage.session.set({ theme: 'dark' }).then(() => {
            console.log("Black Value was set");
        });
    } catch (err) {
        console.error(`Failed to insert CSS: ${err}`);
    }
}


// remove a custom css apply
async function resetTheme(tabId) {
    try {
        await chrome.scripting
            .insertCSS({
                target: {
                    tabId: tabId,
                },
                files: ["css/reset.css"],
            });
        chrome.storage.session.set({ theme: 'default' }).then(() => {
            console.log("Default Value was set");
        });
    } catch (err) {
        console.error(`failed to remove CSS: ${err}`);
    }
}


// Create an initial alarm when the extension is installed or updated
// chrome.runtime.onInstalled.addListener(function () {
//     setDarkThemeAlarm();
// });

// // Listen for tab creation
// chrome.tabs.onCreated.addListener(function (tab) {
//     checkDarkTheme();
// });

// // Set the alarm for the next toggle
// function setDarkThemeAlarm() {
//     const intervalInMinutes = 1; // Change this to the desired interval
//     chrome.alarms.create('toggleDarkTheme', { periodInMinutes: intervalInMinutes });
// }

// // Check if it's time to toggle the dark theme when the alarm fires
// chrome.alarms.onAlarm.addListener(function (alarm) {
//     if (alarm.name === 'toggleDarkTheme') {
//         checkDarkTheme();
//     }
// });


// Check if it's time to toggle the dark theme
async function checkDarkTheme() {
    const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTimer = getCurrentDate();
    if (needToToggleDarkTheme(currentTimer, defaultTimer())) {
        await toggleDarkTheme(tabs.id);
    }
    // Set the alarm for the next toggle
    setDarkThemeAlarm();
}


// get the current date
function getCurrentDate() {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return formatCurentDate(h, m, s);
}

// format the date in hh:mm:ss format
function formatCurentDate(h, m, s) {
    const fullDate = `${h}:${m}:${s}`;
    console.log(fullDate, 'fulldate')
    return fullDate;
}

// save the theme in local storage
function setDefaultDarkModeTime() {
    chrome.storage.local.set({ timer: defaultTimer() }).then(() => {
        console.log("Value is set");
    });
}

// set the default dark theme time
function defaultTimer() {
    const defaultDate = '11:00:00'
    return defaultDate
}

// test if it's time to toggle the dark time
function needToToggleDarkTheme(timer, defaultTimer) {
    const [h1, m1, s1] = timer.split(":");
    const [h2, m2, s2] = defaultTimer.split(":")
    const date = new Date()
    const Year = date.getFullYear()
    const Month = date.getMonth()
    const Day = date.getDate()
    const date1 = new Date(Year, Month, Day, +h1, +m1, +s1);
    const date2 = new Date(Year, Month, Day, +h2, +m2, +s2);
    return date1.getTime() > date2.getTime()
}
