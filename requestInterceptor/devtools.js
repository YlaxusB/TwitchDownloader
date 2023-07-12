// Connect to the background script
var port = chrome.runtime.connect({name: 'devtools'});

// Listen for messages from the background script
port.onMessage.addListener(function(message) {
  // If the message is a network request, add it to the list
  if (message.type === 'network-request') {
    var request = message.data;
    var url = request.url;
    var method = request.method;
    var item = document.createElement('li');
    item.textContent = method + ' ' + url;
    document.getElementById('requests').appendChild(item);
  }
});