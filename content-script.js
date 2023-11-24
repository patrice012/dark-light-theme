chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    (async () => {
      if (request.type === 'dark') {
        // Apply dark theme styles
        const response = await chrome.runtime.sendMessage({ type: 'dark', tabId: request.tabId });
        if (response === 'success') {
          sendResponse('disable')
        }
      }
      else if (request.type === 'reset') {
        // Reset styles to original state
        const response = await chrome.runtime.sendMessage({ type: 'reset', tabId: request.tabId });
        if (response === 'success') {
          sendResponse('disable')
        }
      }
    })();
    return true;
  }
);


