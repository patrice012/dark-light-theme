chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        const tabId = await getTabId();
        if (request.type === "convert") {
            // inject css
            await convert(tabId);
            const msg = "convert";
            // await sendFeedback(msg, tabId)
        } else if (request.type === 'reset') {
            // remove register css
            await reset(tabId);
            const msg = 'reset'
            // await sendFeedback(msg, tabId)
        }
    }
);

// notify a content-script
async function sendFeedback(msg, tabId) {
    const convertResponse = await chrome.tabs.sendMessage(tabId, { message: msg});
}


// get the current tab's id
function getTabId() {
    return (async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        return tab.id
    })();
}

// inject dynamically a css code
function convert(tabId) {
    return (async () => {
        try {
            await chrome.scripting
                .insertCSS({
                    target: {
                        tabId: tabId,
                    },
                    files: ["css/convert.css"],
                });
        } catch (err) {
            console.error(`failed to insert CSS: ${err}`);
        }
    })();
}

// remove a custom css apply
async function reset(tabId) {
    return (async () => {
        try {
            console.log('inside function')
            await chrome.scripting
                .insertCSS({
                    target: {
                        tabId: tabId,
                    },
                    files: ["css/reset.css"],
                });
        } catch (err) {
            console.error(`failed to remove CSS: ${err}`);
        }
    })();
}