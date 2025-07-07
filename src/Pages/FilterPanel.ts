import { By, WebDriver, until, WebElement } from "selenium-webdriver";
 
export class FilterPanel {
  constructor(private driver: WebDriver) {}
 
  leftPanel = By.css("div[data-testid='sidebar']"); 
  //roleHeading = By.xpath("//h3[contains(text(),'ROLE')]");
  roleHeading = By.xpath("//h3[normalize-space()='ROLE']");
  implementationHeading = By.xpath("//h3[contains(text(),'IMPLEMENTATION')]");
  implementationCheckboxes = By.xpath("//h3[contains(text(),'IMPLEMENTATION')]/following::input[@type='checkbox' and @aria-label]");
  applyFilterButton = By.xpath("//button[contains(text(),'Apply filters')]");
  clearFilterButton = By.xpath("//button[contains(text(),'Clear filters')]");
  collapseButton = By.xpath("//span[contains(@class, 'icon-chevron--down')]");
   expandButton =  By.xpath("//span[contains(@class, 'icon-chevron--up')]");
 
 
  async isLeftPanelVisible(): Promise<boolean> {
    const panel = await this.driver.findElement(this.leftPanel);
    return await panel.isDisplayed();
  }
 
  async waitForLeftPanel(): Promise<void>{
    const panel = await this.driver.wait(until.elementLocated(this.leftPanel), 10000);
    await this.driver.wait(until.elementIsVisible(panel), 5000);
  }
  async getLeftPanelBgColor(): Promise<string> {
    const panel = await this.driver.findElement(this.leftPanel);
    return await panel.getCssValue("background-color");
  }
 
  async headingsAreVisible(): Promise<boolean> {
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
    return await this.driver.findElements(this.implementationCheckboxes);
  }
  
 
  async filterButtonsAreVisible(): Promise<boolean> {
    const apply = await this.driver.findElement(this.applyFilterButton);
    const clear = await this.driver.findElement(this.clearFilterButton);
    return await apply.isDisplayed() && await clear.isDisplayed();
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
}
 