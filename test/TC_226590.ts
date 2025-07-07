import "./testSetup";
import { expect } from "chai";
import { WebDriver } from "selenium-webdriver";
import { driver, bscPage } from "./testSetup";
import { By, until } from "selenium-webdriver";

describe("Verify search option", function () {
   this.timeout(40000);
it("should verify document search option behavior", async () => {
  await bscPage.openHomePage();
  await bscPage.clickCategoryByName("BSC");
  await bscPage.clickDocumentByName("BSC Section B: The Panel");

  await driver.wait(until.elementLocated(bscPage.documentSearchRadio), 10000);
  const radio = await driver.findElement(bscPage.documentSearchRadio);
  await driver.wait(until.elementIsVisible(radio), 5000);
 
 
  const isSelected = await radio.isSelected();
expect(isSelected).to.be.true;

 
  const placeholder = await bscPage.getSearchInputPlaceholder();
  console.log("Actual placeholder text is :", placeholder);
  expect(placeholder).to.equal("Search on this page");
 
  let isSearchBtnEnabled = await bscPage.isSearchButtonEnabled();
  console.log("Is search button enabled? ", isSearchBtnEnabled);
expect(isSearchBtnEnabled).to.be.false;
 
  await bscPage.typeInSearchInput("test search");
  isSearchBtnEnabled = await bscPage.isSearchButtonEnabled();
  console.log("Is search button enabled after typing? ", isSearchBtnEnabled);
expect(isSearchBtnEnabled).to.be.true;
});
});