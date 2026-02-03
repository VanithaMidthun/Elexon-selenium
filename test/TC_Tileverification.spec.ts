
import { Builder, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

 
describe("BSC Homepage Tile Verification", function () {
  //this.timeout(40000);
 
  it("should show exactly 12 category tiles on the homepage", async () => {
    await bscPage.openHomePage();
    const tileCount = await bscPage.getCategoryTileCount();
    console.log("Tile count:", tileCount);
    expect(tileCount).to.equal(12, "Expected exactly 12 category tiles");
  });
  it("should click each category tile and verify the title", async () => {
  const tileElements = await bscPage.getCategoryTileElements();
 
  for (let i = 0; i < tileElements.length; i++) {
    const refreshedTiles = await bscPage.getCategoryTileElements(); // Avoid stale element
    const tileText = await bscPage.getTileText(refreshedTiles[i]);
 
    await bscPage.clickTile(refreshedTiles[i]);
    await driver.sleep(2000);
 
    const pageTitle = await bscPage.getLandingPageHeaderText();
    console.log(`Tile Text: "${tileText}" | Page Title: "${pageTitle}"`);
   expect(
  tileText.trim().toLowerCase()
).to.equal(
  pageTitle.trim().toLowerCase()
);
    await bscPage.goBackToHomePage();
  }
});
});