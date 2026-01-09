export class Logger {
  static info(message: string) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }
 
  static warn(message: string) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }
 
  static error(message: string, err?: unknown) {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      err
    );
  }
}