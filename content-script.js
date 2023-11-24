chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    return (async () => {
      if (request.type === 'dark') {
        // Apply dark theme styles
        const response = await chrome.runtime.sendMessage({ type: 'dark', tabId: request.tabId });
        console.log(response, 'response')
      }
      else if (request.type === 'reset') {
        // Reset styles to original state
        const response = await chrome.runtime.sendMessage({ type: 'reset', tabId: request.tabId });
        console.log(response, 'response')
      }
    })();
  }

);


