import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import { frameworkConfig } from "../config/framework.config";
 
export class DocDetailPage {
  constructor(private driver: WebDriver) {}
 
definedTermsToggleTop = By.xpath("//h4[normalize-space()='Defined Terms']");
crossReferencesToggleTop = By.xpath("//h4[normalize-space()='Cross-references']");

async isDefinedTermsToggleVisibleInTop(): Promise<boolean> {
  try {
    const el = await this.driver.wait(
      until.elementLocated(this.definedTermsToggleTop),
      frameworkConfig.timeouts.medium
    );
    return await el.isDisplayed();
  } catch {
    return false;
  }
}
 
async isCrossReferencesToggleVisibleInTop(): Promise<boolean> {
  try {
    const el = await this.driver.wait(
      until.elementLocated(this.crossReferencesToggleTop),
      frameworkConfig.timeouts.medium
    );
    return await el.isDisplayed();
  } catch {
    return false;
  }
}
}