# kfc

# Framework Overview

This is a KFC end to end tests playwright automation framework. It is written in typescript language. It is also a cucumber BDD framework. It supports page object model pattern.It can capture logs, takes screenshot on failure and generate allure test execution report. It is data driven framework as well.It can run in different environements like SIT, UAT using dotenv feature. Currectly it runs for chrome,firefox and safari

# Here is the framework structure


|── .github/workflows       <-- CI/CD Integration. Note: It is not implemented. Given the extra time it can be done
│   └── playwright.yaml 
├── .env.uat                <-- UAT URLs & Credentials
├── cucumber.js             <-- Cucumber runner configuration
├── package.json            <-- contains all dev dependencies
├── tsconfig.json           <-- TypeScript compiler settings
├── allure-results/         <-- Generated after test run (Git Ignore)
|── test-results/           <-- Generated after test run (Git Ignore). It generates screenshots on failure
    └── screenshots         
├── logs/                   <-- Winston execution logs (Git Ignore)
│   └── execution.log
│
└── src/
    ├── pages/              <-- PAGE OBJECT MODEL (POM)
    │   ├── BasePage.ts     <-- Shared common methods/constructor
    │   └── CheckoutPage.ts <-- KFC specific locators/actions
    │   └── HomePage.ts
    │   └── MenuPage.ts
    │   └── MyCartPage.ts
    │   └── OrderPage.ts
    │   └── OrderSummaryPage.ts      
    │
    └── test/
        ├── features/       <-- GHERKIN FILES
        │   └── kfc.feature
        │
        │── data/           <-- User test data and card details data are stored here
        │   └── userData.ts
        │
        │
        ├── steps/          <-- STEP DEFINITIONS & HOOKS
        │   ├── hooks.ts    <-- Setup/Teardown, Browser & Env logic
        │   └── kfcSteps.ts <-- Maps Gherkin to POM methods
        │
        ├── support/        <-- UTILITIES
        │   ├── logger.ts   <-- Winston logger config
        │   └── env.ts      <-- Dotenv logic to read .env files
        │   └── CustomWorld.ts <-- Instantiates page objects
        │
        │   
        │
        └── report/         <-- (Optional) Custom reporter config


# Steps to execute

* Login to github
* Here is the repo location in github https://github.com/sshankaregowda/kfc (Note: repo is public)
* Open the terminal
* run the command : git clone https://github.com/sshankaregowda/kfc.git
* run the command : cd kfc
* run the command : npm install
* run the command : ENV=uat BROWSER=chrome npm test
* It runs in uat env for specified browser
* Once the test execution is completed generate the allure reports using below command
    npm run allure:generate  
    npm run allure:open
* View the allure reports to know the test execution results