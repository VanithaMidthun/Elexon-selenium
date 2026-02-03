
import { expect } from "chai";
import { WebDriver } from "selenium-webdriver";
import { By, until } from "selenium-webdriver";

describe("Verify search option", function () {
   //this.timeout(40000);
it("should verify document search option behavior", async () => {
  await bscPage.openHomePage();
  await bscPage.clickCategoryByName("BSC");
  //await bscPage.clickDocumentByName("BSC Section B: The Panel");
  // Radio button no longer available in updated UI design
  await bscPage.getSearchInputPlaceholder("Search the Code Documents");
  //await bscPage.isSearchButtonEnabled(false, "before typing");
  await bscPage.typeInSearchInput("test search");

  //await bscPage.isSearchButtonEnabled(true, "after typing");
 
});
});