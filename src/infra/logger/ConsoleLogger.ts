import type { Logger } from "../../domain/Logger/Logger.js";

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(`Informartivo! ${message}`);
  }

  warn(message: string): void {
    console.warn(`Alerta:  ${message}`);
  }

  error(message: string): void {
    console.error(`ERROR ${message}`);
  }
}
