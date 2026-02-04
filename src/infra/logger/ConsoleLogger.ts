import { injectable } from "inversify";
import { Logger } from "../../domain/Logger/Logger.js";

@injectable()
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}