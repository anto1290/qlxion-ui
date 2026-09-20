import prompts from "prompts";
import chalk from "chalk";

export async function confirm(message: string, initial = true): Promise<boolean> {
  const response = await prompts({
    type: "confirm",
    name: "value",
    message: chalk.cyan(message),
    initial,
  });
  return response.value ?? false;
}

export async function select(message: string, choices: { title: string; value: any }[], initial?: number): Promise<any> {
  const response = await prompts({
    type: "select",
    name: "value",
    message: chalk.cyan(message),
    choices,
    initial,
  });
  return response.value;
}

export async function text(message: string, initial?: string): Promise<string> {
  const response = await prompts({
    type: "text",
    name: "value",
    message: chalk.cyan(message),
    initial,
  });
  return response.value ?? "";
}

export async function multiselect(message: string, choices: { title: string; value: any }[]): Promise<any[]> {
  const response = await prompts({
    type: "multiselect",
    name: "value",
    message: chalk.cyan(message),
    choices,
    hint: "Space to select, Enter to confirm",
  });
  return response.value ?? [];
}

export function logInfo(message: string): void {
  console.log(chalk.blue("ℹ"), message);
}

export function logSuccess(message: string): void {
  console.log(chalk.green("✓"), message);
}

export function logWarn(message: string): void {
  console.log(chalk.yellow("⚠"), message);
}

export function logError(message: string): void {
  console.log(chalk.red("✗"), message);
}

export function logStep(message: string): void {
  console.log(chalk.gray("→"), message);
}