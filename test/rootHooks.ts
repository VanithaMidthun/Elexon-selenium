import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import edge from "selenium-webdriver/edge";
import fs from "fs";
 
import { BscPage } from "../src/Pages/BscPage";
import { BscSearchResultsPage } from "../src/Pages/BscSearchPage.page";
import { FilterPanel } from "../src/Pages/FilterPanel";
import { Collections } from "../src/Pages/Collections";
 
import { VideoRecorder } from "../src/utils/videoRecorder";
import { Logger } from "../src/utils/logger";
 
import { frameworkConfig } from "../src/config/framework.config";
import { envConfig } from "../src/config/env.config";
import { browserConfig } from "../src/config/browser.config";
 
/**
* GLOBALS (one per worker / test)
*/
declare global {
  var driver: WebDriver;
  var bscPage: BscPage;
  var searchPage: BscSearchResultsPage;
  var Panel: FilterPanel;
  var Collect: Collections;
}
 
/**
* Resolve browser name for Selenium
*/
function resolveBrowser(): string {
  const b = browserConfig.name.toLowerCase();
  if (b === "edge") return "MicrosoftEdge";
  return b;
}
 
let recorder: VideoRecorder;
let currentTestName = "";
 
/**
* Mocha 11 ROOT HOOKS
*/
export const mochaHooks = {
  async beforeEach(this: Mocha.Context) {
    // Apply retries (centralised)
    this.currentTest?.retries(frameworkConfig.retries);
 
    Logger.info(
      `PID=${process.pid} | ENV=${process.env.ENV || "qa"} | BROWSER=${
        browserConfig.name
      } | HEADLESS=${browserConfig.headless} | TEST=${
        this.currentTest?.title
      }`
    );
 
    const browser = resolveBrowser();
    let builder = new Builder().forBrowser(browser);
 
    /**
     * -------- Chrome --------
     */
    if (browser === "chrome") {
      const options = new chrome.Options();
 
      if (browserConfig.headless) {
        options.addArguments(
          "--headless=new",
          "--disable-gpu",
          "--window-size=1920,1080"
        );
      }
 
      builder.setChromeOptions(options);
      builder.setChromeService(
        new chrome.ServiceBuilder(`${process.cwd()}/drivers/chromedriver.exe`)
      );
    }
 
    /**
     * -------- Firefox --------
     */
    if (browser === "firefox") {
      const options = new firefox.Options();
 
      if (browserConfig.headless) {
        options.addArguments("-headless");
      }
 
      builder.setFirefoxOptions(options);
      builder.setFirefoxService(
        new firefox.ServiceBuilder(`${process.cwd()}/drivers/geckodriver.exe`)
      );
    }
 
    /**
     * -------- Edge --------
     */
    if (browser === "MicrosoftEdge") {
      const options = new edge.Options();
 
      if (browserConfig.headless) {
        options.addArguments("--headless=new", "--window-size=1920,1080");
      }
 
      builder.setEdgeOptions(options);
      builder.setEdgeService(
        new edge.ServiceBuilder(`${process.cwd()}/drivers/msedgedriver.exe`)
      );
    }
 
    // Build driver
    global.driver = await builder.build();
 
    // Window & timeouts (centralised)
    await global.driver.manage().window().maximize();
    await global.driver.manage().setTimeouts({
      implicit: 0,
      pageLoad: frameworkConfig.timeouts.pageLoad,
      script: frameworkConfig.timeouts.script
    });
 
    // Page objects (inject baseUrl)
    global.bscPage = new BscPage(global.driver, envConfig.baseUrl);
    global.searchPage = new BscSearchResultsPage(global.driver);
    global.Panel = new FilterPanel(global.driver);
    global.Collect = new Collections(global.driver);
 
    // Ensure artifact folders exist
    if (!fs.existsSync("screenshots")) fs.mkdirSync("screenshots");
    if (!fs.existsSync("videos")) fs.mkdirSync("videos");
 
    // Start video recording
    recorder = new VideoRecorder();
    currentTestName =
      this.currentTest?.title.replace(/[^a-zA-Z0-9]/g, "_") || "unknown_test";
 
    recorder.start(currentTestName, browserConfig.name);
  },
 
  async afterEach(this: Mocha.Context) {
    const failed = this.currentTest?.state === "failed";
 
    if (recorder) await recorder.stop();
 
    if (failed && global.driver) {
      Logger.error(`Test failed: ${this.currentTest?.title}`);
 
      const screenshot = await global.driver.takeScreenshot();
      fs.writeFileSync(
        `screenshots/${currentTestName}.png`,
        screenshot,
        "base64"
      );
    } else {
      // Delete video for passed tests
      const vid = recorder.getVideoPath();
      if (vid && fs.existsSync(vid)) fs.unlinkSync(vid);
    }
 
    if (global.driver) {
      await global.driver.quit();
    }
 
    Logger.info(
      `Finished test: ${this.currentTest?.title} → ${this.currentTest?.state}`
    );
  }
};
 
export {};





























