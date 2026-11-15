export class ErrorRdo {
  public error: string;

  constructor(errorName: string, public message: string) {
    this.error = errorName;
  }
}
