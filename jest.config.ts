import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__tests__/mocks/styleMock.ts",

    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$":
      "<rootDir>/__tests__/mocks/fileMock.ts",

    "^@fluentui/react-components$":
      "<rootDir>/src/__tests__/mocks/@fluentui/react-components.tsx",

    // Handle path aliases
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.app.json",
      },
    ],
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "!**/src/__tests__/**/*.[jt]s?(x)",
    "!setupTests.ts",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!**/__tests__/mocks/*.[jt]s?(x)",
    "!**/__tests__/helpers/*.[jt]s?(x)",
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};

export default config;
