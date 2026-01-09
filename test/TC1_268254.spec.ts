import { expect } from "chai";
import { until, WebElement } from "selenium-webdriver";


 
describe("@smoke Verify right hand functionality Collections", function () {
  //this.timeout(30000);
it("should validate navigation panel behavior", async () => {
    await bscPage.openHomePage();
    await bscPage.clickCategoryByName("Simple Guides");
    await bscPage.clickDocumentByName("Mam 10");
    await Collect.validateAllCategoriesDisplayed();

  });
});
 