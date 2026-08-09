export class Result<T, E> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E
  ) {}

  isOk(): this is Result<T, E> & { isSuccess: true; value: T } {
    return this.isSuccess;
  }

  isFail(): this is Result<T, E> & { isSuccess: false; error: E } {
    return !this.isSuccess;
  }

  static ok<T, E>(value?: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  static fail<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }
}
