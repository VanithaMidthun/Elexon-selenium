import { envConfig } from "./env.config";
import { browserConfig } from "./browser.config";
 
export const frameworkConfig = {
  env: process.env.ENV || "qa",
  baseUrl: envConfig.baseUrl,
  browser: browserConfig.name,
  headless: browserConfig.headless,
 
  timeouts: {
    implicit: 0,
    explicit: 10000,
    // Increased pageLoad timeout to allow long-running searches to finish
    pageLoad: 60000,
    script: 30000,
    short: 3000,
    medium: 10000,
    // Increased 'long' timeout to better support slow pages
    long: 30000
  },
 
  retries: 0
};