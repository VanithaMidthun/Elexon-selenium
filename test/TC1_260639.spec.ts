
import { expect } from "chai";
import { WebDriver } from "selenium-webdriver";

 
describe("TC1_260639: Search and Role Filter Test", function () {
//this.timeout(40000);
 
it("should search and validate Role filter", async () => {
    await bscPage.openHomePage();
    await searchPage.validateDocumentTypeFilterBehavior()
  });
});






























