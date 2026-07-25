/**
 * Result<T, E> — Represents the outcome of an operation that can succeed or fail.
 *
 * This pattern replaces throwing exceptions for expected domain failures,
 * making error handling explicit and type-safe.
 *
 * @example
 * ```ts
 * function divide(a: number, b: number): Result<number, string> {
 *   if (b === 0) return Result.fail('Division by zero');
 *   return Result.ok(a / b);
 * }
 *
 * const result = divide(10, 2);
 * if (result.isOk()) {
 *   console.log(result.value); // 5
 * } else {
 *   console.error(result.error); // never reached
 * }
 * ```
 */
export class Result<T, E = string> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  /** Whether the operation succeeded */
  isOk(): this is Result<T, never> {
    return this._isSuccess;
  }

  /** Whether the operation failed */
  isFail(): this is Result<never, E> {
    return !this._isSuccess;
  }

  /** Get the success value. Throws if result is a failure. */
  get value(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot access value of a failed Result. Check isOk() first.');
    }
    return this._value as T;
  }

  /** Get the error. Throws if result is a success. */
  get error(): E {
    if (this._isSuccess) {
      throw new Error('Cannot access error of a successful Result. Check isFail() first.');
    }
    return this._error as E;
  }

  /** Create a successful result */
  static ok<T, E = string>(value: T): Result<T, E> {
    return new Result<T, E>(true, value, undefined);
  }

  /** Create a failed result */
  static fail<T, E = string>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  /**
   * Map the success value to a new value.
   * If the result is a failure, the error is propagated.
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this._isSuccess) {
      return Result.ok(fn(this._value as T));
    }
    return Result.fail(this._error as E);
  }

  /**
   * FlatMap (chain) the success value to a new Result.
   * If the result is a failure, the error is propagated.
   */
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isSuccess) {
      return fn(this._value as T);
    }
    return Result.fail(this._error as E);
  }

  /** Get the value or a default if failed */
  getOrElse(defaultValue: T): T {
    if (this._isSuccess) {
      return this._value as T;
    }
    return defaultValue;
  }
}
