document.addEventListener('DOMContentLoaded', function () {
    const convertBtn = document.getElementById('convertButton');
    const resetBtn = document.getElementById('resetButton');

    // send convert message to content-script
    convertBtn.addEventListener('click', function () {
        (async () => {
            const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
            const response = await chrome.tabs.sendMessage(tabs.id, { type: 'dark', tabId: tabs.id });
        })();
    });

    // send reset message to content-script
    resetBtn.addEventListener('click', function () {
        (async () => {
            const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
            const resetResponse = await chrome.tabs.sendMessage(tabs.id, { type: "reset", tabId: tabs.id });
        })();
    })
});
