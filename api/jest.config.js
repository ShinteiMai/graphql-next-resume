module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@db/(.*)": "<rootDir>/src/database/$1",
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@tools/(.*)": "<rootDir>/src/tools/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/utils/test/setup/setupTests.ts"],
  globalTeardown: "<rootDir>/src/utils/test/setup/globalTeardown.ts",
};
