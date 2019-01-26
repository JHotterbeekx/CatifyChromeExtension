chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.local.get(['catify_disabled'], (storage) => {
    chrome.storage.local.set({'catify_disabled': !storage.catify_disabled}, () => {
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.reload(tab.id);
        });
      });
    });
  });
});
