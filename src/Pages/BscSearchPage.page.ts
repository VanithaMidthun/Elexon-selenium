import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import { frameworkConfig } from "../config/framework.config";
 
export class BscSearchResultsPage {
  constructor(private driver: WebDriver) {}
 
  searchInput = By.xpath("//input[@id='search']");
  searchButton = By.css("form[data-testid='searchBox--form'] button[type='submit']"); 
  filterByButton = By.xpath("//button[normalize-space()='Filter by']");
  loadingOverlay = By.css("div.Loading_c-loading__kQhvE");
  roleFilterHeading = By.xpath("//h3[normalize-space()='Role']");
  roleFilterOptions = By.css("label[data-testid^='search-filter-role-label']"); 
  docTypeHeading = By.xpath("//button[contains(@class,'SearchFilter_headerButton__5gohN') and .//text()[contains(.,'Document Type')]]");
  //docTypeCheckboxes = By.xpath("//h3[contains(text(), 'Document Type')]/ancestor::button/following-sibling::div//div[contains(@class, 'p-checkbox-box')]");
  docTypeCheckboxes = By.xpath("//input[@type='checkbox' and contains(@data-testid, 'search-filter')]");
  collapseChevron = By.xpath("//span[contains(@class, 'icon-chevron--up')]");
  expandChevron = By.xpath("//span[contains(@class, 'icon-chevron--down')]");

  private async waitForLoadingToFinish(timeout?: number): Promise<void> {
    const t = timeout ?? frameworkConfig.timeouts.pageLoad;
    await this.driver.wait(async () => {
      const overlays = await this.driver.findElements(this.loadingOverlay);

      if (overlays.length === 0) return true;

      for (const overlay of overlays) {
        try {
          if (await overlay.isDisplayed()) {
            return false;
          }
        } catch {
          // overlay disappeared
        }
      }
      return true;
    }, t, "Loading overlay still visible");
  }

  /* =========================
     SEARCH ACTIONS
  ========================== */

  async waitForSearchBox(): Promise<void> {
    await this.waitForLoadingToFinish();
    const input = await this.driver.wait(
      until.elementLocated(this.searchInput),
      frameworkConfig.timeouts.explicit
    );
    await this.driver.wait(until.elementIsVisible(input), frameworkConfig.timeouts.explicit);
  }

  async search(keyword: string): Promise<void> {
    await this.waitForSearchBox();
    const input = await this.driver.findElement(this.searchInput);
    await input.clear();
    await input.sendKeys(keyword);
    await this.driver.findElement(this.searchButton).click();
    await this.waitForLoadingToFinish(frameworkConfig.timeouts.pageLoad);
  }

  /* =========================
     FILTER ACTIONS
  ========================== */

  async openFilterBy(): Promise<void> {
    await this.waitForLoadingToFinish();
    const btn = await this.driver.wait(
      until.elementLocated(this.filterByButton),
      frameworkConfig.timeouts.explicit
    );
    await this.driver.wait(until.elementIsVisible(btn), frameworkConfig.timeouts.explicit);
    await btn.click();
    await this.waitForLoadingToFinish();
  }

  /* =========================
     DOCUMENT TYPE ACTIONS
  ========================== */

  async isDocTypeHeaderVisible(): Promise<boolean> {
    await this.waitForLoadingToFinish();
    return await this.driver.findElement(this.docTypeHeading).isDisplayed();
  }

  async getDocTypeCheckboxes(): Promise<WebElement[]> {
    await this.waitForLoadingToFinish();
    return await this.driver.findElements(this.docTypeCheckboxes);
  }

  async isDocTypeExpandedByDefault(): Promise<boolean> {
    const checkboxes = await this.getDocTypeCheckboxes();
    return checkboxes.length > 0;
  }

  async selectDocTypeCheckbox(index: number): Promise<void> {
    await this.waitForLoadingToFinish();
    const checkboxes = await this.getDocTypeCheckboxes();

    if (checkboxes.length <= index) {
      throw new Error(`Document Type checkbox index ${index} not found`);
    }

    await this.driver.wait(
      until.elementIsVisible(checkboxes[index]),
      frameworkConfig.timeouts.explicit
    );
    await this.driver.wait(
      until.elementIsEnabled(checkboxes[index]),
      frameworkConfig.timeouts.explicit
    );

    await checkboxes[index].click();
    await this.waitForLoadingToFinish();
  }

  async isDocTypeCheckboxSelected(index: number): Promise<boolean> {
    const checkboxes = await this.getDocTypeCheckboxes();

    if (checkboxes.length <= index) {
      throw new Error(`Document Type checkbox index ${index} not found`);
    }

    return await checkboxes[index].isSelected();
  }

  async toggleDocTypeFilter(): Promise<void> {
    await this.waitForLoadingToFinish();
    const header = await this.driver.findElement(this.docTypeHeading);

    await this.driver.wait(until.elementIsVisible(header), frameworkConfig.timeouts.explicit);
    await this.driver.wait(until.elementIsEnabled(header), frameworkConfig.timeouts.explicit);

    await header.click();
    await this.waitForLoadingToFinish();
  }

  async isDocTypeCollapsed(): Promise<boolean> {
    const checkboxes = await this.driver.findElements(this.docTypeCheckboxes);
    return checkboxes.length === 0;
  }

  /* =========================
     FULL VALIDATION (OPTIONAL)
     Can be called directly
  ========================== */

  async validateDocumentTypeFilterBehavior(): Promise<void> {
    await this.search("ENERGY");
    await this.openFilterBy();

    if (!(await this.isDocTypeHeaderVisible())) {
      throw new Error("Document Type header is not visible");
    }

    if (!(await this.isDocTypeExpandedByDefault())) {
      throw new Error("Document Type filter is not expanded by default");
    }

    await this.selectDocTypeCheckbox(0);

    if (!(await this.isDocTypeCheckboxSelected(0))) {
      throw new Error("Document Type checkbox was not selected");
    }

    await this.toggleDocTypeFilter();

    if (!(await this.isDocTypeCollapsed())) {
      throw new Error("Document Type filter did not collapse");
    }

    await this.toggleDocTypeFilter();

    if (!(await this.isDocTypeCheckboxSelected(0))) {
      throw new Error("Checkbox selection did not persist after collapse");
    }
  }
}
  

 
