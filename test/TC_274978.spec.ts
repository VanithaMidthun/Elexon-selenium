
import { expect } from "chai";
import { until, WebElement } from "selenium-webdriver";
 
describe("US_274978_TC_1: Verify doc listing page layout and filter panel display", function () {
//this.timeout(60000);

it("should search and validate Role filter", async () => {
   
await bscPage.openHomePage();
    
await bscPage.clickCategoryByName("Simple Guides");
   
await Panel.waitForLeftPanel();

expect(await Panel.isLeftPanelVisible()).to.be.true;

//expect(await Panel.getLeftPanelBgColor()).to.include("rgb(246, 245, 243)");
 
expect(await Panel.headingsAreVisible()).to.be.true;
 
await Panel.expandImplementationSection();
const checkboxes: WebElement[] = await Panel.getImplementationCheckboxes();
expect(checkboxes.length).to.be.greaterThan(0);

// Test clicking a checkbox and automatic results update
if (checkboxes.length > 0) {
  await Panel.clickCheckboxAndWaitForResults(checkboxes[0]);
  console.log("Successfully clicked checkbox and waited for automatic results update");
}

expect(await Panel.filterButtonsAreVisible()).to.be.true;

await Panel.validateToggleBehavior(); // Handles collapse/expand flow internally
  
});
});
 