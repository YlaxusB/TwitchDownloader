const url = "https://www.twitch.tv/chratosgameplay";

const puppeteer = require("puppeteer");
const puppeteerHar = require("puppeteer-har");
const { promisify } = require("util");
const fs = require("fs");

const { harFromMessages } = require("chrome-har");

let events = [];

const observe = [
  "Page.loadEventFired",
  "Page.domContentEventFired",
  "Page.frameStartedLoading",
  "Page.frameAttached",
  "Network.requestWillBeSent",
  "Network.requestServedFromCache",
  "Network.dataReceived",
  "Network.responseReceived",
  "Network.resourceChangedPriority",
  "Network.loadingFinished",
  "Network.loadingFailed",
];

(async () => {
  const pathToExtension = "C:\\Users\\Giovane\\Desktop\\Workspace 2023\\TwitchDownloaderProjectPrototype\\harExtension\\autohar-master\\autohar-master";
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    devtools: true,
    args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`, "--disable-gpu", '--disable-features=Taskbar', "--headless=new"],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 2560,
    height: 1080,
    deviceScaleFactor: 1,
  });
  console.log("entrando na live")
  await page.goto(url);
  console.log("entrou na live")
  const backgroundPageTarget = await browser.waitForTarget((target) => target.type() === "background_page", { timeout: 120000 });
  const backgroundPage = await backgroundPageTarget.page();
  console.log("Loaded")
})();