import { styleText } from "node:util";

export class CliError extends Error {}

export const log = {
  info: (message) => console.log(message),
  step: (message) => console.log(`${styleText("cyan", "›")} ${message}`),
  success: (message) => console.log(`${styleText("green", "✓")} ${message}`),
  warn: (message) => console.warn(`${styleText("yellow", "!")} ${message}`),
  error: (message) => console.error(`${styleText("red", "✗")} ${message}`),
};
