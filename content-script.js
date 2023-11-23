chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "convert") {
      const tabId = request.tabId;
      // convert(tabId);
      console.log(message, 'message apply')
      // sendResponse({ message: 'Website converted to black and white.' });
    }
    else if (request.type === 'reset') {
      // reste();
      console.log(message, 'message reset')
      // sendResponse({ message: 'Website reset to original colors.' })
    }
  }
);
