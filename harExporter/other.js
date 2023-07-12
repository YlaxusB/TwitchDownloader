const WebSocket = require("ws");
const http = require("http");

let url = "http://127.0.0.1:9222/json/list";

const tabId = "FF143D6591AAF5D2E0F7F983A40F215C";
let parentElements = [];

http
  .get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        // do something with JSON
        console.log("YEEEEEEEAAAAAAAAA");
        json.forEach((element) => {
          if (element.parentId && element.parentId == tabId) {
            console.log(element.id);
            parentElements.push(element);
            // const ws = new WebSocket("ws://127.0.0.1:9222/devtools/page/" + element.id);

            // ws.on("open", () => {
            //   // Enable the Network domain
            //   ws.send(
            //     JSON.stringify({
            //       id: 1,
            //       method: "Network.enable",
            //     })
            //   );
            // });

            // ws.send(
            //   JSON.stringify({
            //     id: 1,
            //     method: "Network.requestWillBeSent",
            //     params: {
            //       urlPattern: "*",
            //       documentURL: "*",
            //     },
            //   })
            // );

            // ws.on("message", (data) => {
            //   const message = JSON.parse(data);

            //   if (message.method === "Network.requestWillBeSent") {
            //     const requestUrl = message.params.request.url;
            //     console.log("Request URL:", requestUrl);
            //   }
            // });
          }
        });
      } catch (error) {
        console.log("error here :");
        console.error(error.message);
      }
    });
  })
  .on("close", () => {
    console.log("xiiiiiiiii acabou");
    parentElements.forEach((element) => {
      // console.log(element.id);
      // let ws = new WebSocket("ws://127.0.0.1:9222/devtools/page/" + tabId);
      // ws.addEventListener("open", () => {
      //   console.log("WebSocket connection established.");
      //   ws.send(
      //     JSON.stringify({
      //       id: 1,
      //       method: "Network.enable",
      //     })
      //   );
      //   ws.send(
      //     JSON.stringify({
      //       id: 2,
      //       method: "Network.requestWillBeSent",
      //     })
      //   );
      // });

      // ws.addEventListener("message", (event) => {
      //   const message = JSON.parse(event.data);
      //   if (message.method === "Network.requestWillBeSent") {
      //     const requestUrl = message.params.request.url;
      //     console.log("Request URL:", requestUrl);
      //   }
      // });
    });
  })
  .on("error", (error) => {
    console.log("another error here :");
    console.error(error.message);
  });

let ws = new WebSocket("ws://127.0.0.1:9222/devtools/page/" + tabId);
ws.addEventListener("open", () => {
  console.log("WebSocket connection established.");
  ws.send(
    JSON.stringify({
      id: 1,
      method: "Network.enable",
    })
  );
  ws.send(
    JSON.stringify({
      id: 2,
      method: "Network.requestWillBeSent",
    })
  );
});

ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Network.requestWillBeSent") {
    const requestUrl = message.params.request.url;
    console.log("Request URL:", requestUrl);
  }
});

// console.log("------------------------ READ END ---------------------------")
// console.log("------------------------ READ END ---------------------------")
// console.log("------------------------ READ END ---------------------------")
// console.log("------------------------ READ END ---------------------------")
// console.log("------------------------ READ END ---------------------------")
// // Replace {PAGE_ID} with the ID of the page you want to connect to
//const ws = new WebSocket("ws://localhost:9222/devtools/page/" + tabId);

// let sockets = [];
// parentIds.forEach(element=>{
//     sockets.push({ws:new WebSocket("ws://localhost:9222/devtools/page/" + element.id)})
// })
// console.log(sockets)

// ws.on('open', () => {
//     // Enable the Network domain
//     ws.send(JSON.stringify({
//       id: 1,
//       method: 'Network.enable'
//     }));
//   });

//   ws.send(JSON.stringify({
//     id: 1,
//     method: 'Network.requestWillBeSent',
//     params: {
//       urlPattern: '*',
//       documentURL: '*'
//     }
//   }));

//   ws.on('message', (data) => {
//     const message = JSON.parse(data);

//     if (message.method === 'Network.requestWillBeSent') {
//       const requestUrl = message.params.request.url;
//       console.log('Request URL:', requestUrl);
//     }
//   });

// const WebSocket = require("ws");
// const tabId = "0463C5EE8050CFE7DED5224944D55BC5";
// //const ws = new WebSocket("ws://localhost:9222/devtools/page/" + tabId);
// const url = "http://127.0.0.1:9222/json/list";
// const https = require("https"); // or 'https' for https:// URLs
// const http = require("http"); // or 'https' for https:// URLs
// const fs = require("fs");
// const fetch = require("node-fetch");
// //const { json } = require("stream/consumers");

// const listSocket = new WebSocket('https://www.twitch.tv/chratosgameplay');

// listSocket.on('open', function () {
//   listSocket.send(JSON.stringify({method: 'Target.getTargets'}));
// });

// listSocket.on('message', function (data) {
//   const targets = JSON.parse(data);

//   targets.forEach((target) => {
//     console.log(target.url);
//   });
// });

// let urlSockets = [];
// let sockets = [];
