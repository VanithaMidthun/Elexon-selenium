import "./testSetup"
import { expect } from "chai";
//import { WebDriver } from "selenium-webdriver";
import { driver, bscPage } from "./testSetup";
import { searchPage } from "./testSetup";

 
describe("US_260638_TC2: Validate Document Type filter behavior", function () {
  this.timeout(60000);
 
  it("should search and validate Document Type filter", async () => {
     await bscPage.openHomePage();
    console.log("Opened homepage");
 
    await searchPage.waitForSearchBox(); // Ensure input is ready
    console.log("Search box is visible");
 
    await searchPage.searchKeyword("energy");
    console.log("Keyword typed");
 
    await searchPage.clickFilterBy();
    console.log("Clicked 'Filter by'");

    const isHeadingVisible = await searchPage.isDocTypeVisible();
    console.log("heading visible")
    expect(isHeadingVisible).to.be.true;

    const isExpanded = await searchPage.isExpandButtonVisible();
    expect(isExpanded).to.be.true;
    console.log("Document type filter expanded by default")
 
    const checkboxes = await searchPage.getCheckboxes();
    console.log("checkbox count:", checkboxes.length);
    expect(checkboxes.length).to.be.greaterThan(0);
 
    await searchPage.clickCheckboxByIndex(0);
   console.log("First checkbox selected")
 
    await searchPage.collapseFilter();
    const isCollapsed = await searchPage.isFilterCollapsed();
    console.log("Filter collapsed")
    expect(isCollapsed).to.be.true;

    await searchPage.expandFilter();
    console.log("Reexpand doc type filter")

    /*const isSelectedAfter = await searchPage.isCheckboxSelected(0);
    expect(isSelectedAfter).to.be.true;
    console.log("checkbox still selected after expand");*/


 
  });
});
 