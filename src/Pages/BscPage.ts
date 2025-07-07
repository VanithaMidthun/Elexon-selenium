import { By, WebDriver, WebElement, until } from "selenium-webdriver";

 
export class BscPage {
  constructor(private driver: WebDriver) {}
 
  // Selectors
 homeUrl = "https://devbscdocs.elexon.co.uk/"; 
  cookieAcceptBtn = By.xpath("//div[@id='cookiescript_accept']");
 //categorySelector = By.xpath("//a[@href='/category-3-documents']");
 // documentSelector = By.xpath("//span[normalize-space()='Vers2']");
  rightPanel = By.xpath("//div[@class='DocumentAside_c-document-aside__item-container__xRHIZ']");
  relatedDocuments = By.css("button[data-testid='document-aside--related-documents']");
  categoryTiles = By.css("div.Card_c-card__9PvF2");
  tileHeading = By.css("h3.mt-0.mb-5.b-text.b-text--xl");
  landingPageTitle = By.css("h2[data-test='title']");
  documentSearchRadio = By.id("scope-document"); 
  documentSearchInput = By.xpath("//input[@id='search']");
  documentSearchButton  = By.xpath("//button[normalize-space()='Search']"); 
  // Actions

  async openHomePage() {
  await this.driver.get(this.homeUrl);
 
  try {
    const cookieBtn = await this.driver.wait(
      until.elementLocated(this.cookieAcceptBtn), 2000
    );
 
    // Scroll into view
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", cookieBtn);
 
    // Try normal click
    try {
await cookieBtn.click();
      console.log("Clicked cookie banner normally.");
    } catch (clickError) {
      // Fallback: click using JavaScript
      await this.driver.executeScript("arguments[0].click();", cookieBtn);
      console.warn("Clicked cookie banner via JS fallback.");
    }
 
    // Wait until banner disappears
    await this.driver.wait(
until.stalenessOf(await this.driver.findElement(By.id("cookiescript_injected"))),
      2000
    );
 
    console.log("Cookie banner removed.");
  } catch (err) {
    console.warn("No cookie banner found or failed to dismiss.");
  }
}


 
 /*async clickCategory() {
    await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight / 2);");
    console.log("Scrolled halfway down the page.");
 
    try {
        const category = await this.driver.wait(
            until.elementLocated(this.categorySelector),
            10000
        );
        await this.driver.wait(until.elementIsVisible(category), 5000);
        console.log("Category element is visible.");
 
        try {
            await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", category);
await category.click();
            console.log("Clicked the test category normally.");
        } catch (scrollClickErr) {
            console.warn("Normal click failed, trying JS click as fallback.");
            await this.driver.executeScript("arguments[0].click();", category);
            console.log("Clicked the test category using JS fallback.");
        }
 
    } catch (err) {
        console.error("clickCategory failed:", err);
        throw err;
    }
}*/
     async clickCategoryByName(categoryName: string) {
  const categoryLink = By.xpath(`//div[contains(@class, 'Card_c-card__9PvF2') and h3[normalize-space(text())='${categoryName}']]`);
  try {
    const category = await this.driver.wait(until.elementLocated(categoryLink), 15000);
    await this.driver.wait(until.elementIsVisible(category), 5000);
    await this.driver.executeScript("arguments[0].scrollIntoView({behacvior: 'smooth', block: 'center'});", category);
    try {
await category.click();
      console.log(`Clicked category '${categoryName}' normally.`);
    } catch {
      await this.driver.executeScript("arguments[0].click();", category);
      console.log(`Clicked category '${categoryName}' via JS fallback.`);
    }
  } catch (err) {
    console.error(`clickCategoryByName('${categoryName}') failed:`, err);
    throw err;
  }
}
 
  /*async clickDocument() {
    try {
        // Scroll to bottom to ensure the documents are in view
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await this.driver.sleep(2000); // Allow time for any lazy loading
 
        const doc = await this.driver.wait(until.elementLocated(this.documentSelector), 10000);
        await this.driver.wait(until.elementIsVisible(doc), 5000);
  await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", doc);
        await this.driver.sleep(500); // Allow scroll
        try {
await doc.click();
            console.log("Clicked document normally.");
        } catch (clickErr) {
            console.warn("Normal click failed, using JS click fallback.");
            await this.driver.executeScript("arguments[0].click();", doc);
        }
 
    } catch (err) {
        console.error("clickDocument failed:", err);
        throw err;
    }
}*/
async clickDocumentByName(docName: string) {
  // Locate span with exact text = docName inside documents list
  const docLocator = By.xpath(`//a[h2/span[normalize-space(text())='${docName}']]`);
 
  
  try {
    await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    await this.driver.sleep(2000); // Allow any lazy loading
    const doc = await this.driver.wait(until.elementLocated(docLocator), 10000);
    await this.driver.wait(until.elementIsVisible(doc), 5000);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", doc);
    await this.driver.sleep(500);
    try {
await doc.click();
      console.log(`Clicked document '${docName}' normally.`);
    } catch {
      await this.driver.executeScript("arguments[0].click();", doc);
      console.log(`Clicked document '${docName}' via JS fallback.`);
    }
  } catch (err) {
    console.error(`clickDocumentByName('${docName}') failed:`, err);
    throw err;
  }
}
  /*async selectDocumentSearchRadio() {
    const radio = await this.driver.wait(until.elementLocated(this.documentSearchRadio), 10000);
await radio.click();
  }*/
 
  async isDocumentRadioSelected(): Promise<boolean> {
    const radio = await this.driver.findElement(this.documentSearchRadio);
    return await radio.isSelected();
  }
 
  async getSearchInputPlaceholder(): Promise<string> {
    const input = await this.driver.findElement(this.documentSearchInput);
    return await input.getAttribute("placeholder");
  }
 
  async isSearchButtonEnabled(): Promise<boolean> {
    const btn = await this.driver.findElement(this.documentSearchButton);
    return await btn.isEnabled();
  }
 
  async typeInSearchInput(text: string) {
    const input = await this.driver.findElement(this.documentSearchInput);
    await input.clear();
    await input.sendKeys(text);
  }
  async isRightPanelDisplayed(): Promise<boolean> {
    return await this.driver.findElement(this.rightPanel).isDisplayed();
  }
 async isRelatedDocumentsVisible(): Promise<boolean> {
    try {
        const elem = await this.driver.wait(until.elementLocated(this.relatedDocuments), 5000);
        return await elem.isDisplayed();
    } catch (err) {
        console.warn("Related Documents button not visible or not found.");
        return false;
    }
}
  
  async clickRelatedDocuments(): Promise<void> {
    const button = await this.driver.wait(until.elementLocated(this.relatedDocuments), 10000);
    await this.driver.wait(until.elementIsVisible(button), 5000);
 
    try {
await button.click();
        console.log("Clicked Related Documents button normally.");
    } catch (err) {
        console.warn("Normal click failed, using JS click.");
        await this.driver.executeScript("arguments[0].click();", button);
    }
}
async getRelatedDocumentsButtonBackground(): Promise<string> {
    const button = await this.driver.findElement(this.relatedDocuments);
 
    // Scroll into view in case it's off-screen
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", button);
    await this.driver.sleep(500); // Small delay to let style apply
 
    const bgColor = await this.driver.executeScript(
        "return window.getComputedStyle(arguments[0]).backgroundColor;",
        button
    ) as string;
    return bgColor;
}
async getCategoryTileCount(): Promise<number> {
  const tiles = await this.driver.findElements(this.categoryTiles);
  return tiles.length;
}
getCategoryTileElements() {
  return this.driver.findElements(this.categoryTiles);
}
 
async getTileText(tileElement: WebElement): Promise<string> {
  const titleElement = await tileElement.findElement(this.tileHeading);
 
  // Scroll the heading into view before getting text
  await this.driver.executeScript("arguments[0].scrollIntoView({ block: 'center', behavior: 'smooth' });", titleElement);
  await this.driver.sleep(300); // optional wait
 
  return await titleElement.getText();
}
 
async clickTile(tileElement: WebElement): Promise<void> {
  try {
    await this.driver.executeScript("arguments[0].scrollIntoView({ block: 'center', behavior: 'smooth' });", tileElement);
    await this.driver.sleep(300); // optional
await tileElement.click();
  } catch (err: any) {
    console.warn("Fallback to JS click due to error:", err.message);
    await this.driver.executeScript("arguments[0].click();", tileElement);
  }
}
 
async getLandingPageHeaderText(): Promise<string> {
  const header = await this.driver.wait(
  until.elementLocated(this.landingPageTitle),5000
);

await this.driver.wait(until.elementIsVisible(header), 2000);
const text = await header .getText();
console.log("Extracted H2 Title Text:", text);
  return text;
}
 
async goBackToHomePage(): Promise<void> {
  await this.driver.navigate().back();
}
 }
