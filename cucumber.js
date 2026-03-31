module.exports = {
  default: {
    parallel: 1,
    requireModule: ["ts-node/register"],
    require: ["src/support/**/*.ts", "src/test/steps/**/*.ts"],
    paths: ["src/test/features/**/*.feature"],
    format: ["progress", "summary", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
      snippetInterface: "async-await"
    }
  }
};