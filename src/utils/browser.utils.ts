import { Builder, WebDriver } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";
 
export async function buildFirefoxDriver(): Promise<WebDriver> {
  const driver = await new Builder().forBrowser("firefox").build();
  await driver.manage().window().maximize(); // Add this line
  return driver;
}