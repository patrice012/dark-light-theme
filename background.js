chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        (async () => {
            if (request.type === 'dark') {
                // inject CSS
                await convert(request.tabId);
                sendResponse('Apply dark theme')
            } else if (request.type === 'reset') {
                // remove register CSS
                await reset(request.tabId);
                sendResponse('Reset style');
            }
        })();
        return true;
    }
);

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