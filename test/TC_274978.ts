import "./testSetup"
import { expect } from "chai";
import { driver, bscPage } from "./testSetup";
import { searchPage } from "./testSetup";
import { Panel } from "./testSetup";
import { until, WebElement } from "selenium-webdriver";
 
describe("US_274978_TC_1: Verify doc listing page layout and filter panel display", function () {
  this.timeout(60000);

   it("should search and validate Role filter", async () => {
   await bscPage.openHomePage();
    
 await bscPage.clickCategoryByName("Simple Guides");
    //console.log("clicked category")
    
    await Panel.waitForLeftPanel();
 const isVisible = await Panel.isLeftPanelVisible();
expect(isVisible).to.be.true;
 
    const bgColor = await Panel.getLeftPanelBgColor();
    console.log("Left panel background color:", bgColor);
    // Light gray: rgb(246, 245, 243) or similar
    expect(bgColor).to.include("rgb(246, 245, 243)"); 
  
 

    const headingsvisible = await Panel.headingsAreVisible();
    console.log("headings visible")
expect(headingsvisible).to.be.true;
 
 
 await Panel.expandImplementationSection();
const checkboxes: WebElement[] = await Panel.getImplementationCheckboxes();
console.log("Checkbox count:", checkboxes.length);
expect(checkboxes.length).to.be.greaterThan(0);
 
 
  
    const buttonsVisible = await Panel.filterButtonsAreVisible();
expect(buttonsVisible).to.be.true;
console.log("Apply and clear filter buttons visible")

 // Validate initial state
expect(await Panel.isCollapseButtonVisible()).to.be.true;
 
// Collapse and verify expand appears
await Panel.clickCollapseButton();
await driver.sleep(1000);
expect(await Panel.isExpandButtonVisible()).to.be.true;
 
// Expand again and verify collapse reappears
await Panel.clickExpandButton();
await driver.sleep(1000);
expect(await Panel.isCollapseButtonVisible()).to.be.true
  
   
  });
});