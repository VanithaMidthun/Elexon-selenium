import { By, WebDriver, until, WebElement } from "selenium-webdriver";
 
export class BscSearchResultsPage {
  constructor(private driver: WebDriver) {}
 
  searchInput = By.xpath("//input[@id='search']");
  searchButton = By.xpath("//button[normalize-space()='Search']"); 
  filterByButton = By.xpath("//button[normalize-space()='Filter by']");
  roleFilterHeading = By.xpath("//h3[normalize-space()='Role']");
  roleFilterOptions = By.css("label[data-testid^='search-filter-role-label']"); 
  docTypeHeading = By.xpath("//button[contains(@class,'SearchFilter_headerButton__5gohN') and .//text()[contains(.,'Document Type')]]");
  docTypeCheckboxes = By.xpath("//h3[contains(text(), 'Document Type')]/ancestor::button/following-sibling::div//div[contains(@class, 'p-checkbox-box')]");
  //docTypeCheckboxes = By.xpath("//h3[contains(text(), 'Document Type')]/ancestor::button/following-sibling::div//input[@type='checkbox']");
  collapseChevron = By.xpath("//span[contains(@class, 'icon-chevron--up')]");
  expandChevron = By.xpath("//span[contains(@class, 'icon-chevron--down')]");
  

   async waitForSearchBox(timeout = 10000): Promise<void> {
    const input = await this.driver.wait(until.elementLocated(this.searchInput), timeout);
    await this.driver.wait(until.elementIsVisible(input), timeout);
  }
 
  async searchKeyword(keyword: string) {
  await this.driver.wait(until.elementLocated(this.searchInput), 10000); // Wait for input to be present
  const input = await this.driver.findElement(this.searchInput);
  await this.driver.wait(until.elementIsVisible(input), 5000);           // Wait for input to be visible
 
  await input.clear();
  await input.sendKeys(keyword);
 
  const button = await this.driver.findElement(this.searchButton);
await button.click();
await this.driver.sleep(3000);
 
  
}
 
  async clickFilterBy() {
    const btn = await this.driver.wait(until.elementLocated(this.filterByButton), 10000);
await btn.click();
  }
 
  async isRoleFilterVisible(): Promise<boolean> {
    try {
      const heading = await this.driver.wait(until.elementLocated(this.roleFilterHeading), 10000);
      return await heading.isDisplayed();
    } catch {
      return false;
    }
  }
 
 async getRoleFilterOptions(): Promise<string[]> {
  const elements = await this.driver.findElements(this.roleFilterOptions);
  const texts = [];
  for (const el of elements) {
    const text = await el.getText();
    texts.push(text.trim());
  }
  return texts;
}
 async isDocTypeVisible(): Promise<boolean> {
    const heading = await this.driver.findElement(this.docTypeHeading);
    return heading.isDisplayed();
  }
 
  async getCheckboxes(): Promise<WebElement[]> {
    return await this.driver.findElements(this.docTypeCheckboxes);
  }
 
 async clickCheckboxByIndex(index: number): Promise<void> {
  const checkboxes = await this.getCheckboxes();
  if (checkboxes.length > index) {
    await checkboxes[index].click();
  } else {
    throw new Error(`Checkbox at index ${index} not found`);
  }
}
 
async isCheckboxSelected(index: number): Promise<boolean> {
  const inputs = await this.getCheckboxes(); // true selection state
  if (inputs.length > index) {
    return await inputs[index].isSelected();
  } else {
    throw new Error(`Checkbox input at index ${index} not found`);
  }
}
  async collapseFilter() {
    const btn = await this.driver.findElement(this.collapseChevron);
await btn.click();
  }
 
  async expandFilter() {
    const btn = await this.driver.findElement(this.expandChevron);
await btn.click();
  }
 
  async isFilterCollapsed(): Promise<boolean> {
    const chevrons = await this.driver.findElements(this.collapseChevron);
    return chevrons.length > 0;
  }
  async isExpandButtonVisible(): Promise<boolean> {
  const btns = await this.driver.findElements(this.expandChevron);
  return btns.length > 0 && await btns[0].isDisplayed().catch(() => false);
}

}
 
