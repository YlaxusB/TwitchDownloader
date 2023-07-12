// Attach to the target tab's debugger
chrome.debugger.attach({tabId: tabId}, '1.0', function() {

    // Enable the Network domain
    chrome.debugger.sendCommand({tabId: tabId}, 'Network.enable', {}, function() {

        // Listen for new network requests
        chrome.debugger.onEvent.addListener(function(debuggeeId, message, params) {

            // Only handle Network.requestWillBeSent events
            if (message === 'Network.requestWillBeSent') {

                // Send a message to the devtools page with the request details
                backgroundPageConnection.postMessage({type: 'network-request', data: params.request});
            }
        });
    });
});