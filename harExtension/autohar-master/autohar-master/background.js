var connections = {};
var har_log = {};
var settings = {};

chrome.storage.local.get(
  {
    save_blocked: false,
    save_images: true,
    save_fonts: true,
    save_css: true,
    save_tab_close: true,
    save_navigation: false,
    max_entries: 100,
  },
  function (items) {
    settings = items;

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      connections[tabs[i]].postMessage({
        cmd: "settings",
        settings: settings,
      });
    }
  }
);

function download(dataURI, tries = 0) {
  const data = {data:dataURI};
  console.log(typeof(dataURI))
  const url = "http://127.0.0.1:9000/upload";

  const formData = new FormData();
  formData.append("file", new Blob([JSON.stringify(data)], { type: "text/plain" }));

  // Define the options for the fetch request
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Send the fetch request
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        console.log("Data uploaded successfully!");
      } else {
        console.log("Data upload failed!");
      }
    })
    .catch((error) => {
      console.log("Error uploading data:", error);
    });
  // chrome.downloads.download(
  //   {
  //     url: dataURI,
  //     filename: `archive - ${Date.now() - 1544144717841}.har`,
  //     conflictAction: "uniquify",
  //     saveAs: false,
  //   },
  //   function (downloadId) {
  //     if (chrome.runtime.lastError) {
  //       console.error("Got lastError: ", chrome.runtime.lastError);
  //     }
  //     console.log("Download", downloadId);
  //   }
  // );
}

function saveHAR(port) {
  if (!har_log[port].length) {
    return;
  }
  console.log(port);
  var har = {
    log: {
      version: "1.2",
      creator: {
        name: "WebInspector",
        version: "537.36",
      },
      pages: [],
      entries: har_log[port],
    },
  };
  let newHar = [];
  har.log.entries.forEach((element) => {
    if (element.request.url.startsWith("https://video-edge")) {
      har.log.entries.splice(har.log.entries.indexOf(element), 1);
    }
  });
  console.log(har);
  const dataURI = har;
  har_log[port] = [];
  console.log(dataURI);
  download(dataURI);
}

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {console.log(details)/*do something*/},
//     {urls: ["<all_urls>"]},
//     ["blocking", "requestHeaders"]);

function addRequest(port, request) {
  const content = request.response.content;
  if (content.size > 0) {
    if (content.text && !content.encoding && needsEncoding(content.text)) {
      // console.log("needs encoding!", content.text)
      request.response.content.text = content.text.toBase64();
      request.response.content.encoding = "base64";
    }
  }
  har_log[port].push(request);
}

let isConnected = false;

chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected to devtools");
  isConnected = true;

  har_log[port] = [];

  function harLoop() {
    if (isConnected) {
      console.log("eae galera do youtube");
      saveHAR(port);
      console.log("eita");

      setTimeout(harLoop, 15000);
    }
  }
  // Call sendit() the first time
  setTimeout(harLoop, 5000);

  // const asd = (port)=>{
  //     window.setTimeout(()=>{
  //         console.log("eae galera do youtube")
  //         saveHAR(port);
  //         console.log("eita")
  //     }, 2000)
  // }

  // asd(port);

  port.postMessage({
    cmd: "settings",
    settings: settings,
  });

  const listener = function (message, sender, sendResponse) {
    // console.log("Got message", message);

    switch (message.cmd) {
      case "init":
        console.log("Tab init", message.tabId, port);
        connections[message.tabId] = port;
        break;
      case "request_finished":
        // console.log("got request finished: ", message.request)
        addRequest(port, message.request);
        break;
      case "navigated":
        // console.log("got navigated: ", message.url)
        if (settings.save_navigation || (port in har_log && har_log[port].length >= settings.max_entries && settings.max_entries > 0)) {
          saveHAR(port);
        }
        break;
    }
  };

  port.onMessage.addListener(listener);

  port.onDisconnect.addListener(function () {
    isConnected = false;
    console.log("Disconnected from devtools");
    if (settings.save_tab_close) {
      saveHAR(port);
    }
    port.onMessage.removeListener(listener);

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

chrome.storage.onChanged.addListener((changes, storageType) => {
  console.log("onChanged", changes);

  for (key in changes) {
    var storageChange = changes[key];
    settings[key] = changes[key].newValue;
  }

  var tabs = Object.keys(connections);
  for (var i = 0, len = tabs.length; i < len; i++) {
    connections[tabs[i]].postMessage({
      cmd: "settings",
      settings: settings,
    });
  }
});

String.prototype.toBase64 = function () {
  /**
   * @param {number} b
   * @return {number}
   */
  function encodeBits(b) {
    return b < 26 ? b + 65 : b < 52 ? b + 71 : b < 62 ? b - 4 : b === 62 ? 43 : b === 63 ? 47 : 65;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(this.toString());
  const n = data.length;
  let encoded = "";
  if (n === 0) return encoded;
  let shift;
  let v = 0;
  for (let i = 0; i < n; i++) {
    shift = i % 3;
    v |= data[i] << ((16 >>> shift) & 24);
    if (shift === 2) {
      encoded += String.fromCharCode(encodeBits((v >>> 18) & 63), encodeBits((v >>> 12) & 63), encodeBits((v >>> 6) & 63), encodeBits(v & 63));
      v = 0;
    }
  }
  if (shift === 0) encoded += String.fromCharCode(encodeBits((v >>> 18) & 63), encodeBits((v >>> 12) & 63), 61, 61);
  else if (shift === 1) encoded += String.fromCharCode(encodeBits((v >>> 18) & 63), encodeBits((v >>> 12) & 63), encodeBits((v >>> 6) & 63), 61);
  return encoded;
};

function isValidCharacter(code_point) {
  // Excludes non-characters (U+FDD0..U+FDEF, and all codepoints ending in
  // 0xFFFE or 0xFFFF) from the set of valid code points.
  return (
    code_point < 0xd800 || (code_point >= 0xe000 && code_point < 0xfdd0) || (code_point > 0xfdef && code_point <= 0x10ffff && (code_point & 0xfffe) !== 0xfffe)
  );
}

function needsEncoding(content) {
  for (let i = 0; i < content.length; i++) {
    if (!isValidCharacter(content.charCodeAt(i))) return true;
  }

  return false;
}
