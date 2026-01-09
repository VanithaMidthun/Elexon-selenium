export type BrowserConfig = {
  browserName: string;
  headless: boolean;
};
 
export const browserConfig = {
  name: (process.env.BROWSER || "chrome").toLowerCase(),
  headless: process.env.HEADLESS === "true"
};