chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('linkedin')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentScript.js']
    });
  }
});