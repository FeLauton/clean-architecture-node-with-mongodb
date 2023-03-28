module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/config/env.ts",
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
    "tests/(.*)": "<rootDir>/tests/$1",
    "data/(.*)": "<rootDir>/src/data/$1",
    "domain/(.*)": "<rootDir>/src/domain/$1",
    "infra/(.*)": "<rootDir>/src/infra/$1",
    "main/(.*)": "<rootDir>/src/main/$1",
    "presentation/(.*)": "<rootDir>/src/presentation/$1",
    "validation/(.*)": "<rootDir>/src/validation/$1",
  },
};
