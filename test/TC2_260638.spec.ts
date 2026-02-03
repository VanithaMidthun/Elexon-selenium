import { expect } from "chai";
import { WebElement } from "selenium-webdriver";


 
    describe.only("US_260638_TC2: Validate Document Type filter behavior", function () {

 
    it("should search and validate Document Type filter", async () => {
    await bscPage.openHomePage();
    
    await searchPage.validateDocumentTypeFilterBehavior()
  
  });
});
 