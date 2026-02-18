import { WebDriver } from "selenium-webdriver";
import { BscPage } from "../src/Pages/BscPage";
import { BscSearchResultsPage } from "../src/Pages/BscSearchPage.page";
import { FilterPanel } from "../src/Pages/FilterPanel";
import { Collections } from "../src/Pages/Collections";
import { DocDetailPage } from "../src/Pages/DocDetailPage";
 
declare global {
  var driver: WebDriver;
  var bscPage: BscPage;
  var searchPage: BscSearchResultsPage;
  var Panel: FilterPanel;
  var Collect: Collections;
  var docDetailPage: DocDetailPage;
}
 
export {};