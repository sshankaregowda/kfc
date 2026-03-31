module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["src/support/**/*.ts","src/test/steps/**/*.ts"],
    paths: ["src/test/features/**/*.feature"],
    format: ["progress", "summary", "allure-cucumberjs/reporter"],
    formatOptions: {
      snippetInterface: "async-await",
      resultsDir: "allure-results"
    }
  }
};