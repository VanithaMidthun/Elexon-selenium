🧪 Selenium TypeScript Automation Framework
A scalable, maintainable UI automation framework built using Selenium WebDriver, TypeScript, Mocha, and Chai, designed with real-project best practices such as Page Object Model (POM), parallel execution, cross-browser testing, centralized configuration, test tagging, retries, logging, and rich reporting.
🚀 Tech Stack
Language: TypeScript
Test Runner: Mocha
Assertion Library: Chai
Automation Tool: Selenium WebDriver
Design Pattern: Page Object Model (POM)
Reporting: Mochawesome
Logging: Custom Logger (extendable)
Video Recording: Custom Video Recorder
Environment Handling: cross-env
📁 Project Structure
.
├── src
│   ├── Pages
│   │   ├── BscPage.ts
│   │   ├── BscSearchResultsPage.page.ts
│   │   ├── FilterPanel.ts
│   │   └── Collections.ts
│   ├── config
│   │   ├── env.config.ts
│   │   ├── browser.config.ts
│   │   └── framework.config.ts
│   └── utils
│       ├── logger.ts
│       └── videoRecorder.ts
│
├── test
│   ├── rootHooks.ts
│   ├── global.d.ts
│   └── *.spec.ts
│
├── screenshots
├── videos
├── mochawesome-report
├── package.json
├── tsconfig.json
└── README.md

⚙️ Centralized Configuration

🌍 Environment Config (env.config.ts)
Controls which environment tests run against.
ENV=qa | uat | prod

🌐 Browser Config (browser.config.ts)
Controls browser execution.
BROWSER=chrome | firefox | edge

⏱ Framework Config (framework.config.ts)
Centralized timeouts & retries.
short, medium, long waits
pageLoad, script timeouts
Retry support for flaky tests

▶️ Running Tests
🔹 Run all tests
npm test

🔹 Run tests in parallel
npm run test:parallel

🔹 Run on a specific browser
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:all

🔹 Run on a specific environment
npx cross-env ENV=uat npm test

🏷️ Test Tagging
Tests are tagged using keywords like @smoke, @regression.
Example
describe("@smoke Validate search functionality", () => {
  it("should search document successfully", async () => {
    ...
  });
});

Run tagged tests
npm run test:smoke
npm run test:regression

🔁 Retry Support
Retries are enabled globally for flaky UI tests.
Configured in framework.config.ts
Applied automatically via rootHooks.ts
retries: 1

🧾 Logging
Centralized logger (logger.ts)
Supports INFO, WARN, ERROR
Timestamped logs
Easy to upgrade to Winston or Log4js
Logger.info("Opening homepage");
Logger.error("Failed to click element", error);

📸 Reporting
Mochawesome HTML reports
Screenshots on failure
Videos per test
Cleaned automatically for passed tests
Generate report
npm run test
Open:
mochawesome-report/index.html

🧩 Design Principles Used
Page Object Model (POM)
Dependency Injection (driver & baseUrl)
Centralized waits & config
Parallel-safe execution
Clean separation of concerns

