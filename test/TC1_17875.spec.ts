
import { expect } from "chai";
import { By, until } from "selenium-webdriver";

 
describe("US 17875_TC_1: Verify 'Related Documents' display", function () {
  //this.timeout(30000);
 
  it("should display Related Documents in the right-hand panel", async () => {
    await bscPage.openHomePage();
   
    await bscPage.clickCategoryByName("Simple Guides");
    
    await bscPage.clickDocumentByName("TC3");
    console.log("clicked doc")
    await driver.wait(until.elementLocated(bscPage.rightPanel), 10000);
    console.log("Right panel is now visible")
    expect(await bscPage.isRightPanelDisplayed()).to.be.true;
    expect(await bscPage.isRelatedDocumentsVisible()).to.be.true;
    await bscPage.clickRelatedDocuments();
   // const bgColor = await bscPage.getRelatedDocumentsButtonBackground();
   // console.log("Background color of Related Documents button:", bgColor);
   // expect(bgColor).to.equal("rgb(33, 219, 173)");
  });
});
 