import { WebDriver } from "selenium-webdriver";
import { buildFirefoxDriver } from "../src/utils/browser.utils";
import { BscPage } from "../src/Pages/BscPage";
import { BscSearchResultsPage } from "../src/Pages/BscSearchPage.page";
import { FilterPanel } from "../src/Pages/FilterPanel";
import { Collections} from "../src/Pages/Collections";

 
export let driver: WebDriver;
export let bscPage: BscPage;
export let searchPage: BscSearchResultsPage;
export let Panel: FilterPanel
export let Collect: Collections
 
before(async function  () {
    
  this.timeout(20000);
  driver = await buildFirefoxDriver();
  await driver.manage().window().maximize();
  bscPage = new BscPage(driver);
  searchPage = new BscSearchResultsPage(driver);
  Panel = new FilterPanel(driver);
  Collect = new Collections(driver);
});
 
after(async function () {
    this.timeout(10000);
    if(driver)
    {
  await driver.quit();
    }
});