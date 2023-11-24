document.addEventListener('DOMContentLoaded', function () {
    const convertBtn = document.getElementById('convertButton');
    const resetBtn = document.getElementById('resetButton');

    // set initial state of buttons
    convertBtn.disabled = false;
    resetBtn.disabled = true;

    // send convert message to content-script
    convertBtn.addEventListener('click', function () {

        // enable the reset button
        resetBtn.disabled = false;

        // send message to the context-script
        (async () => {
            const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
            const applyResponse = await chrome.tabs.sendMessage(tabs.id, { type: 'dark', tabId: tabs.id });
            
            if (applyResponse === 'disable') {
                // disable button if the action is a success
                convertBtn.disabled = true;
            }
        })();
    });

    // send reset message to content-script
    resetBtn.addEventListener('click', function () {

        // enable the convert button
        convertBtn.disabled = false;

        // send message to the context-script
        (async () => {
            const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
            const resetResponse = await chrome.tabs.sendMessage(tabs.id, { type: "reset", tabId: tabs.id });
            
            // disable button if the action is a success
            if (resetResponse === 'disable') {
                resetBtn.disabled = true;
            }
        })();
    })
});
