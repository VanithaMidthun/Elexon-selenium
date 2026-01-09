import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { frameworkConfig } from "../config/framework.config";
import { Logger } from "../utils/logger";
 
export class Collections {
  constructor(private driver: WebDriver) {}
 
  /* =========================
     SELECTORS
  ========================= */
 
  private collectionsHeading = By.xpath(
    "//h4[normalize-space()='Collections']"
  );
 
  private sidebarItems = By.xpath(
    "//h4[normalize-space()='Collections']/following::ul[1]//li/a"
  );
 
  /* =========================
     ACTIONS
  ========================= */
 
  async isCollectionsHeadingVisible(): Promise<boolean> {
    const heading = await this.driver.wait(
      until.elementLocated(this.collectionsHeading),
      frameworkConfig.timeouts.explicit
    );
    return await heading.isDisplayed();
  }
 
  async getSidebarCategories(): Promise<string[]> {
    const elements = (await this.driver.wait(
      async () => {
        const items = await this.driver.findElements(this.sidebarItems);
        return items.length > 0 ? items : false;
      },
      frameworkConfig.timeouts.pageLoad
    )) as WebElement[] | false;

    if (!elements || elements.length === 0) {
      throw new Error("No sidebar items found in Collections panel");
    }

    return Promise.all(elements.map(e => e.getText()));
  }
 
  async validateAllCategoriesDisplayed(): Promise<void> {
    const headingVisible = await this.isCollectionsHeadingVisible();
    if (!headingVisible) {
      throw new Error("Collections heading is not visible");
    }

    const categories = await this.getSidebarCategories();

    Logger.info(`Total categories found: ${categories.length}`);

    categories.forEach((text, i) => {
      if (!text || text.trim().length === 0) {
        throw new Error(`Category at index ${i} has empty text`);
      }
      Logger.info(`Category ${i + 1}: ${text}`);
    });
 
    Logger.info("All category names are displayed ✔");
  }
 

}