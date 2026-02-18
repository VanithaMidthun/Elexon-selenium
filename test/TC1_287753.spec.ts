import { expect } from "chai";
import { Logger } from "../src/utils/logger";
 
describe("US 287603 - Verify toggles are moved to the top", function () {
  this.timeout(120000);
 
  it("TC1: Toggles should appear in top header", async () => {
    Logger.info("Opening BSC home page");
    await global.bscPage.openHomePage();
 
    Logger.info("Selecting category");
    await global.bscPage.clickCategoryByName("Guidance Notes");
 
    Logger.info("Opening document");
    await global.bscPage.clickDocumentByName("Doc2");
 
    // ---- Top Header Assertions ----
    expect(
      await global.docDetailPage.isDefinedTermsToggleVisibleInTop(),
      "Defined Terms toggle should be visible in top header"
    ).to.be.true;
 
    expect(
      await global.docDetailPage.isCrossReferencesToggleVisibleInTop(),
      "Cross-references toggle should be visible in top header"
    ).to.be.true;
 
     });
});