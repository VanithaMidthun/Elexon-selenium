import { By, WebDriver, WebElement, until } from "selenium-webdriver";

export class Collections {
  constructor(private driver: WebDriver) {}
 
  private collectionsHeading = By.xpath("//h2[normalize-space()='Collections']"); 
  private sidebarItems = By.xpath("//div[contains(@class, 'b-text') and contains(@class, 'u-box-shadow-12')]");
 
  async isCollectionsHeadingVisible(): Promise<boolean> {
    const heading = await this.driver.wait(
      until.elementLocated(this.collectionsHeading),5000);
    return heading.isDisplayed();
  }
 
  async getSidebarCategories(): Promise<string[]> {
    const elements = await this.driver.findElements(this.sidebarItems);
    return await Promise.all(elements.map((el) => el.getText()));
  }
}