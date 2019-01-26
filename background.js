chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.local.get(['catify_disabled'], (storage) => {
    chrome.storage.local.set({'catify_disabled': !storage.catify_disabled}, () => {
      chrome.browserAction.setIcon({path: !storage.catify_disabled ? 'icons/16.disabled.png' : 'icons/16.png'});
      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.reload(tab.id);
        });
      });
    });
  });
});

chrome.storage.local.get(['catify_disabled'], (storage) => {
  chrome.browserAction.setIcon({path: storage.catify_disabled ? 'icons/16.disabled.png' : 'icons/16.png'});
});