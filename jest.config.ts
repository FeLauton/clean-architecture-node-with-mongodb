module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/tests/**",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/**/*protocols.ts",
    "!<rootDir>/src/presentation/protocols/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1",
  },
};
