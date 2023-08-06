browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('linkedin')) {
    browser.tabs.executeScript(tabId, {
      file: 'contentScript.js'
    }).catch(error => {
      console.error(`Failed to inject content script: ${error}`);
    });
  }
});