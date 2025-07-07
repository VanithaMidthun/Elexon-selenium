import "./testSetup"
import { expect } from "chai";
//import { WebDriver } from "selenium-webdriver";
import { driver, bscPage } from "./testSetup";
import { searchPage } from "./testSetup";
 
describe("Search and Role Filter Test", function () {
  this.timeout(40000);
 
  it("should search and validate Role filter", async () => {2
    await bscPage.openHomePage();
    console.log("Opened homepage");
 
    await searchPage.waitForSearchBox(); // Ensure input is ready
    console.log("Search box is visible");
 
    await searchPage.searchKeyword("energy");
    console.log("Keyword typed");
 
    await searchPage.clickFilterBy();
    console.log("Clicked 'Filter by'");
 
expect(await searchPage.isRoleFilterVisible()).to.be.true;
 
    const roleOptions = await searchPage.getRoleFilterOptions();
    const sortedOptions = [...roleOptions].sort((a, b) => a.localeCompare(b));
    expect(roleOptions).to.deep.equal(sortedOptions);
  });
});