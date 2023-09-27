chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "buttonClicked") {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id !== sender.tab.id) {
          chrome.tabs.remove(tabs[i].id);
        }
      }
    });
    chrome.tabs.update(sender.tab.id, { url: 'http://answer.dev.gaokao.cn/index/products/show?id=zsed' });
  }
});