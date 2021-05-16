chrome.runtime.onMessage.addListener(request => {
  alert(request.data);
});
