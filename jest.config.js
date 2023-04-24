process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testResultsProcessor: "jest-sonar-reporter", // config for this must be in package.json
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/dist/**"
  ],
  coverageDirectory: "./target/jest-coverage-reports",
  coverageReporters: ["html", "text", "text-summary", "lcov"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "jest tests",
        outputDirectory: "./target/jest-reports",
        outputName: "TEST-jest-junit.xml",
        uniqueOutputName: "false",
        classNameTemplate: "{classname}-{title}",
        titleTemplate: "{classname}-{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: "true"
      }
    ]
  ]
};
