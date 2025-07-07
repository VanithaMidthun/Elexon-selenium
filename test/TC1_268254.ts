import "./testSetup"
import { expect } from "chai";
import { driver, bscPage } from "./testSetup";
import { searchPage } from "./testSetup";
import { Panel } from "./testSetup";
import { Collect } from "./testSetup";
import { until, WebElement } from "selenium-webdriver";
import { Collections } from "../src/Pages/Collections";

 
describe("Verify right hand functionality Collections", function () {
  this.timeout(30000);
it("should validate navigation panel behavior", async () => {
    await bscPage.openHomePage();
    await bscPage.clickCategoryByName("Simple Guides");
    //console.log("clicked category")
    
    const collectionsVisible = await Collect.isCollectionsHeadingVisible();
    console.log("Collections heading visible");
    expect(collectionsVisible).to.be.true;
 await driver.sleep(3000);
    const sidebarItems = await Collect.getSidebarCategories();
    console.log("Sidebar items found:", sidebarItems.length);
    expect(sidebarItems.length).to.be.greaterThan(0);
   console.log("Sidebar contents:", sidebarItems);
    expect(sidebarItems).to.not.include("Simple Guides");
  });
});
 