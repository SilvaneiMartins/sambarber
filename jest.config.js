const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
   // All imported modules in your tests should be mocked automatically
   // automock: false,

   // Stop running tests after `n` failures
   // bail: 0,

   // The directory where Jest should store its cached dependency information
   // cacheDirectory: "C:\\Users\\silva\\AppData\\Local\\Temp\\jest",

   // Limpar automaticamente chamadas e instâncias simuladas entre todos os testes
   clearMocks: true,

   // Indica se as informações de cobertura devem ser coletadas durante a execução do teste
   collectCoverage: true,

   // Uma matriz de padrões glob indicando um conjunto de arquivos para os
   // quais as informações de cobertura devem ser coletadas
   collectCoverageFrom: [
      '<rootDir>/src/modules/**/services/*.ts'
   ],

   // O diretório em que o Jest deve produzir seus arquivos de cobertura
   coverageDirectory: 'coverage',

   // An array of regexp pattern strings used to skip coverage collection
   // coveragePathIgnorePatterns: [
   //   "\\\\node_modules\\\\"
   // ],

   // Uma lista de nomes de repórter que Jest usa ao escrever relatórios de cobertura
   coverageReporters: [
     "text-summary",
     "lcov"
   ],

   // An object that configures minimum threshold enforcement for coverage results
   // coverageThreshold: undefined,

   // A path to a custom dependency extractor
   // dependencyExtractor: undefined,

   // Make calling deprecated APIs throw helpful error messages
   // errorOnDeprecated: false,

   // Force coverage collection from ignored files using an array of glob patterns
   // forceCoverageMatch: [],

   // A path to a module which exports an async function that is triggered once before all test suites
   // globalSetup: undefined,

   // A path to a module which exports an async function that is triggered once after all test suites
   // globalTeardown: undefined,

   // A set of global variables that need to be available in all test environments
   // globals: {},

   // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
   // maxWorkers: "50%",

   // An array of directory names to be searched recursively up from the requiring module's location
   // moduleDirectories: [
   //   "node_modules"
   // ],

   // An array of file extensions your modules use
   // moduleFileExtensions: [
   //   "js",
   //   "json",
   //   "jsx",
   //   "ts",
   //   "tsx",
   //   "node"
   // ],

   // Um mapa de expressões regulares para nomes de módulos ou matrizes de nomes de módulos que,
   // permitem stub out de recursos com um único módulo
   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),

   // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
   // modulePathIgnorePatterns: [],

   // Activates notifications for test results
   // notify: false,

   // An enum that specifies notification mode. Requires { notify: true }
   // notifyMode: "failure-change",

   // Uma predefinição usada como base para a configuração do Jest
   preset: 'ts-jest',

   // Run tests from one or more projects
   // projects: undefined,

   // Use this configuration option to add custom reporters to Jest
   // reporters: undefined,

   // Automatically reset mock state between every test
   // resetMocks: false,

   // Reset the module registry before running each individual test
   // resetModules: false,

   // A path to a custom resolver
   // resolver: undefined,

   // Automatically restore mock state between every test
   // restoreMocks: false,

   // The root directory that Jest should scan for tests and modules within
   // rootDir: undefined,

   // A list of paths to directories that Jest should use to search for files in
   // roots: [
   //   "<rootDir>"
   // ],

   // Allows you to use a custom runner instead of Jest's default test runner
   // runner: "jest-runner",

   // The paths to modules that run some code to configure or set up the testing environment before each test
   // setupFiles: [],

   // A list of paths to modules that run some code to configure or set up the testing framework before each test
   // setupFilesAfterEnv: [],

   // A list of paths to snapshot serializer modules Jest should use for snapshot testing
   // snapshotSerializers: [],

   // O ambiente de teste que será usado para o teste
   testEnvironment: "node",

   // Options that will be passed to the testEnvironment
   // testEnvironmentOptions: {},

   // Adds a location field to test results
   // testLocationInResults: false,

   // Os padrões glob que Jest usa para detectar arquivos de teste
   testMatch: [
      "**/*.spec.ts"
   ],

   // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
   // testPathIgnorePatterns: [
   //   "\\\\node_modules\\\\"
   // ],

   // The regexp pattern or array of patterns that Jest uses to detect test files
   // testRegex: [],

   // This option allows the use of a custom results processor
   // testResultsProcessor: undefined,

   // This option allows use of a custom test runner
   // testRunner: "jasmine2",

   // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
   // testURL: "http://localhost",

   // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
   // timers: "real",

   // A map from regular expressions to paths to transformers
   // transform: undefined,

   // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
   // transformIgnorePatterns: [
   //   "\\\\node_modules\\\\"
   // ],

   // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
   // unmockedModulePathPatterns: undefined,

   // Indicates whether each individual test should be reported during the run
   // verbose: undefined,

   // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
   // watchPathIgnorePatterns: [],

   // Whether to use watchman for file crawling
   // watchman: true,
};
