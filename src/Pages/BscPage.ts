import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { expect } from "chai";
import { frameworkConfig } from "../config/framework.config";
import { Logger } from "../utils/logger";
 
export class BscPage {
  constructor(
    private driver: WebDriver,
    private baseUrl: string
  ) {}
 
  /* =========================
     SELECTORS
  ========================= */
 
  cookieAcceptBtn = By.xpath("//div[@id='cookiescript_accept']");
  rightPanel = By.css("aside[data-testid='aside-component']");
  relatedDocuments = By.xpath("//div[@role='button' and .//h4[normalize-space()='Related documents']]");
  categoryTiles = By.css("div.panel-wrapper-grid.grid.small > div.grid-xs-12.grid-m-4");
  tileHeading = By.css("h3");
  landingPageTitle = By.css("h1.DocumentContent_panel-header--title__4BJO0");
  loadingOverlay = By.css("div.Loading_c-loading__kQhvE");
  loginDialog = By.css("div[role='dialog'], .modal, .MuiDialog-root, [class*='dialog']");
  loginDialogOk = By.xpath("//button[normalize-space()='OK' or normalize-space()='Ok' or normalize-space()='Close']");
  documentSearchInput = By.xpath("//input[@id='search']");
  documentSearchButton = By.css("form[data-testid='searchBox--form'] button[type='submit']");
 
  /* =========================
     ACTIONS
  ========================= */
 
  async openHomePage(): Promise<void> {
    await this.driver.get(this.baseUrl);
    Logger.info(`Opened homepage: ${this.baseUrl}`);
 
    await this.waitForLoadingToFinish(frameworkConfig.timeouts.long);
    await this.acceptCookiesIfPresent();
  }
 
  private async acceptCookiesIfPresent(): Promise<void> {
    try {
      const cookieBtn = await this.driver.wait(
        until.elementLocated(this.cookieAcceptBtn),
        frameworkConfig.timeouts.short
      );
 
      await this.driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        cookieBtn
      );
 
      try {
        await this.clickSafely(cookieBtn);
      } catch {
        await this.driver.executeScript(
          "arguments[0].click();",
          cookieBtn
        );
      }
 
      await this.driver.wait(
        until.stalenessOf(cookieBtn),
        frameworkConfig.timeouts.short
      );
    } catch {
      Logger.info("Cookie banner not present.");
    }
  }
 
  async clickCategoryByName(categoryName: string): Promise<void> {
    const categoryLink = By.xpath(
      `//a[contains(@class,'item-panel')][.//h3[normalize-space()='${categoryName}']]`
    );
 
    await this.waitForLoadingToFinish(frameworkConfig.timeouts.long);
 
    const category = await this.driver.wait(
      until.elementLocated(categoryLink),
      frameworkConfig.timeouts.long
    );
 
    await this.driver.wait(
      until.elementIsVisible(category),
      frameworkConfig.timeouts.medium
    );
 
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({ block: 'center' });",
      category
    );
 
    try {
      await this.clickSafely(category);
    } catch {
      await this.driver.executeScript(
        "arguments[0].click();",
        category
      );
    }
  }
 async clickDocumentByName(docPartialName: string): Promise<void> {
  await this.waitForLoadingToFinish();
 
  const docLocator = By.xpath(
     `//span[contains(@class,'DocumentCard_document-title')
      and contains(normalize-space(.),'${docPartialName}')]/ancestor::div[contains(@class,'DocumentCard_document-link-area')]`
  );
 
  await this.driver.wait(
    until.elementsLocated(docLocator),
    frameworkConfig.timeouts.long
  );
 
  const docs = await this.driver.findElements(docLocator);
  if (docs.length === 0) {
    throw new Error(`Document '${docPartialName}' not found in results`);
  }
 
  const doc = docs[0];
 
  await this.driver.wait(
    until.elementIsVisible(doc),
    frameworkConfig.timeouts.explicit
  );
 
  await this.driver.executeScript(
    "arguments[0].scrollIntoView({block:'center'});",
    doc
  );
 
  try {
    await this.clickSafely(doc);
  } catch {
    await this.driver.executeScript("arguments[0].click();", doc);
  }
}
 
  async getSearchInputPlaceholder(expected: string): Promise<void> {
    const input = await this.driver.wait(
      until.elementLocated(this.documentSearchInput),
      frameworkConfig.timeouts.medium
    );
 
    const placeholder = await input.getAttribute("placeholder");
    expect(placeholder).to.equal(expected);
  }
 
  async isSearchButtonEnabled(
    expected: boolean,
    context: string
  ): Promise<void> {
    const btn = await this.driver.wait(
      until.elementLocated(this.documentSearchButton),
      frameworkConfig.timeouts.medium
    );
 
    const enabled = await btn.isEnabled();
    Logger.info(`Search button enabled (${context}): ${enabled}`);
    expect(enabled).to.equal(expected);
  }
 
  async typeInSearchInput(text: string): Promise<void> {
    const input = await this.driver.wait(
      until.elementLocated(this.documentSearchInput),
      frameworkConfig.timeouts.medium
    );
 
    await input.clear();
    await input.sendKeys(text);
  }
    async isRightPanelDisplayed(): Promise<boolean> {
    return await this.driver.findElement(this.rightPanel).isDisplayed();
  }
 
  async isRelatedDocumentsVisible(): Promise<boolean> {
    try {
      const elem = await this.driver.wait(
        until.elementLocated(this.relatedDocuments),
        frameworkConfig.timeouts.medium
      );
      return await elem.isDisplayed();
    } catch {
      return false;
    }
  }
 
  async clickRelatedDocuments(): Promise<void> {
    const button = await this.driver.wait(
      until.elementLocated(this.relatedDocuments),
      frameworkConfig.timeouts.long
    );
 
    await this.driver.wait(
      until.elementIsVisible(button),
      frameworkConfig.timeouts.medium
    );
 
    try {
      await button.click();
    } catch {
      await this.driver.executeScript(
        "arguments[0].click();",
        button
      );
    }
  }
  
 
  async getCategoryTileCount(): Promise<number> {
    await this.waitForLoadingToFinish(frameworkConfig.timeouts.long);
    const tiles = await this.driver.findElements(this.categoryTiles);
    return tiles.length;
  }
 
  getCategoryTileElements(): Promise<WebElement[]> {
    return this.driver.findElements(this.categoryTiles);
  }
 
  async getTileText(tile: WebElement): Promise<string> {
    try {
      const title = await tile.findElement(this.tileHeading);
      await this.driver.executeScript(
        "arguments[0].scrollIntoView({ block: 'center' });",
        title
      );
      return await title.getText();
    } catch {
      return (await tile.getText()).trim();
    }
  }
 
  async clickTile(tile: WebElement): Promise<void> {
    let target = tile;
 
    try {
      target = await tile.findElement(By.css("a"));
    } catch {}
 
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({ block: 'center' });",
      target
    );
 
    try {
      await target.click();
    } catch {
      await this.driver.executeScript(
        "arguments[0].click();",
        target
      );
    }
 
    await this.dismissLoginPopupIfPresent();
  }
 
  async getLandingPageHeaderText(): Promise<string> {
    await this.waitForLoadingToFinish(frameworkConfig.timeouts.long);
 
    const header = await this.driver.wait(
      until.elementLocated(this.landingPageTitle),
      frameworkConfig.timeouts.medium
    );
 
    await this.driver.wait(
      until.elementIsVisible(header),
      frameworkConfig.timeouts.short
    );
 
    return await header.getText();
  }
 
  async goBackToHomePage(): Promise<void> {
    await this.driver.navigate().back();
  }
 
  /* =========================
     HELPERS
  ========================= */
 
  private async waitForLoadingToFinish(timeout = frameworkConfig.timeouts.pageLoad): Promise<void> {
  try {
    await this.driver.wait(async () => {
      const overlays = await this.driver.findElements(this.loadingOverlay);
 
      if (overlays.length === 0) return true;
 
      for (const overlay of overlays) {
        try {
          if (await overlay.isDisplayed()) {
            return false; // still loading
          }
        } catch {
          // overlay detached → treat as gone
          return true;
        }
      }
      return true;
    }, timeout);
  } catch {
    console.warn("⚠️ Loading overlay wait timed out – continuing");
  }
}
 
  private async dismissLoginPopupIfPresent(): Promise<void> {
    try {
      const dialogs = await this.driver.findElements(this.loginDialog);
      if (dialogs.length === 0) return;
 
      const okButtons = await this.driver.findElements(this.loginDialogOk);
      if (okButtons.length > 0) {
        try {
          await okButtons[0].click();
        } catch {
          await this.driver.executeScript(
            "arguments[0].click();",
            okButtons[0]
          );
        }
      } else {
        await this.driver
          .actions({ bridge: true })
          .sendKeys("\u001B")
          .perform();
      }
    } catch {
      // ignore
    }
  }
  protected async clickSafely(element: WebElement): Promise<void> {
  await this.waitForLoadingToFinish();
 
  await this.driver.wait(until.elementIsVisible(element), frameworkConfig.timeouts.explicit);
  await this.driver.wait(until.elementIsEnabled(element), frameworkConfig.timeouts.explicit);
 
  try {
    await element.click();
  } catch {
    // fallback for React animations / overlays
    await this.driver.executeScript("arguments[0].click();", element);
  }
 
  await this.waitForLoadingToFinish();
}
}