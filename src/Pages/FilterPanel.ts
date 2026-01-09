import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import { Logger } from "../utils/logger";

// Helper method to handle alerts before any operation
async function handleAlerts(driver: WebDriver): Promise<void> {
  try {
    const alert = await driver.switchTo().alert();
    await alert.dismiss();
    Logger.info("Dismissed alert before operation");
  } catch {
    // No alert present, continue
  }
}
 
export class FilterPanel {
  constructor(private driver: WebDriver) {}
 
  leftPanel = By.css("div[class*='DocumentFilter_filter-box']"); 
  roleHeading = By.xpath("//h3[normalize-space()='Role']");
  implementationHeading = By.xpath("//h3[normalize-space()='Implementation']");
  implementationCheckboxes = By.xpath("//h3[normalize-space()='Implementation']/following::ul//input[@type='checkbox']");
  // applyFilterButton = By.xpath("//button[contains(text(),'Apply filters')]"); // No longer exists in new UI
  clearFilterButton = By.xpath("//button[contains(text(),'Clear filters')]");
  collapseButton = By.css("span.icon-chevron--down");
  expandButton = By.css("span.icon-chevron--up");
 
  async waitForLeftPanel(): Promise<void>{
    await handleAlerts(this.driver);
    
    // Debug: Check what filter elements are available
    try {
      const filterElements = await this.driver.findElements(By.css("div[class*='DocumentFilter']"));
      Logger.info(`Found ${filterElements.length} DocumentFilter elements`);
      
      const allDivs = await this.driver.findElements(By.css("div"));
      Logger.info(`Total divs on page: ${allDivs.length}`);
      
      // Check for any elements with "filter" in class name
      const filterDivs = await this.driver.findElements(By.css("div[class*='filter']"));
      Logger.info(`Found ${filterDivs.length} divs with 'filter' in class`);
      
      if (filterDivs.length > 0) {
        for (let i = 0; i < Math.min(filterDivs.length, 3); i++) {
          const className = await filterDivs[i].getAttribute("class");
          Logger.info(`Filter div ${i}: ${className}`);
        }
      }
    } catch (debugErr) {
      Logger.error(`Debug failed: ${debugErr}`);
    }
    
    const panel = await this.driver.wait(until.elementLocated(this.leftPanel), 10000);
    await this.driver.wait(until.elementIsVisible(panel), 5000);
  }

   async isLeftPanelVisible(): Promise<boolean> {
    const panel = await this.driver.findElement(this.leftPanel);
    return await panel.isDisplayed();
  }
 

  async getLeftPanelBgColor(): Promise<string> {
    const panel = await this.driver.findElement(this.leftPanel);
    return await panel.getCssValue("background-color");
  }
 
  async headingsAreVisible(): Promise<boolean> {
    await handleAlerts(this.driver);
    const role = await this.driver.findElement(this.roleHeading);
    const impl = await this.driver.findElement(this.implementationHeading);
    return await role.isDisplayed() && await impl.isDisplayed();
  }
  
  async expandImplementationSection(): Promise<void> {
    const checkboxes = await this.driver.findElements(this.implementationCheckboxes);
    if (checkboxes.length === 0){
  const heading = await this.driver.findElement(this.implementationHeading);
  await heading.click();
  await this.driver.sleep(500); 
}
  }
 
  async getImplementationCheckboxes(): Promise<WebElement[]> {
    await handleAlerts(this.driver);
    return await this.driver.findElements(this.implementationCheckboxes);
  }

  async clickCheckboxAndWaitForResults(checkbox: WebElement): Promise<void> {
    await handleAlerts(this.driver);
    await checkbox.click();
    Logger.info("Clicked checkbox - waiting for results to update automatically");
    // Wait a moment for the automatic search results update
    await this.driver.sleep(2000);
  }
  
 
  async filterButtonsAreVisible(): Promise<boolean> {
    // Only check for clear filter button since apply button no longer exists
    const clear = await this.driver.findElement(this.clearFilterButton);
    return await clear.isDisplayed();
  }

  async clickExpandButton(): Promise<void> {
  const btn = await this.driver.findElement(this.expandButton);
await btn.click();
}
 
async clickCollapseButton(): Promise<void> {
  const btn = await this.driver.findElement(this.collapseButton);
await btn.click();
}
 
 
async isCollapseButtonVisible(): Promise<boolean> {
  const btns = await this.driver.findElements(this.collapseButton);
  return btns.length > 0 && await btns[0].isDisplayed().catch(() => false);
}
 async isExpandButtonVisible(): Promise<boolean> {
  const btns = await this.driver.findElements(this.expandButton);
  return btns.length > 0 && await btns[0].isDisplayed().catch(() => false);
}
 /*async waitForFullPanelLoad(): Promise<void> {
    await this.waitForLeftPanel();
    await this.headingsAreVisible();
    await this.expandImplementationSection();
    await this.getImplementationCheckboxes();
    await this.filterButtonsAreVisible();
  }*/
 
  async validateToggleBehavior(): Promise<void> {
    if (await this.isCollapseButtonVisible()) {
      Logger.info("Collapse button is visible");
      await this.clickCollapseButton();
      Logger.info("Clicked collapsed button");
      await this.driver.sleep(1000); 
      if (!(await this.isExpandButtonVisible())) {
        throw new Error("Expand button not visible after collapsing.");
      }
 
      await this.clickExpandButton();
      Logger.info("Clicked expand button");
      await this.driver.sleep(1000);
      if (!(await this.isCollapseButtonVisible())) {
        throw new Error("Collapse button not visible after expanding.");
      }
      Logger.info("collapse button visible again");
    } else {
      throw new Error("Collapse button not initially visible.");
    }
}
}
 