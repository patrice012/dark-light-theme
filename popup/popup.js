document.addEventListener('DOMContentLoaded', function () {
    const convertBtn = document.getElementById('convertButton');
    const resetBtn = document.getElementById('resetButton');

    // send convert message to content-script
    convertBtn.addEventListener('click', function () {
        (async () => {
            const convertResponse = await chrome.runtime.sendMessage({ type: "convert" });
            // do something with response here, not outside the function
        })();
    });

    // send reset message to content-script
    resetBtn.addEventListener('click', function () {
        (async () => {
            const resetResponse = await chrome.runtime.sendMessage({ type: "reset" });
        })();
    })
});
