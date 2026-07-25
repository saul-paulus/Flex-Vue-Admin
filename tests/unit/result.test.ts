import { describe, expect, it } from 'vitest';
import { Result } from '~/domain/core/Result';

describe('Result', () => {
  describe('Result.ok', () => {
    it('should create a successful result', () => {
      const result = Result.ok(42);
      expect(result.isOk()).toBe(true);
      expect(result.isFail()).toBe(false);
      expect(result.value).toBe(42);
    });

    it('should work with complex types', () => {
      const user = { id: 1, name: 'John' };
      const result = Result.ok(user);
      expect(result.isOk()).toBe(true);
      expect(result.value).toEqual({ id: 1, name: 'John' });
    });
  });

  describe('Result.fail', () => {
    it('should create a failed result', () => {
      const result = Result.fail('Something went wrong');
      expect(result.isOk()).toBe(false);
      expect(result.isFail()).toBe(true);
      expect(result.error).toBe('Something went wrong');
    });

    it('should throw when accessing value on a failed result', () => {
      const result = Result.fail('error');
      expect(() => result.value).toThrow('Cannot access value of a failed Result');
    });
  });

  describe('Result.ok - error access', () => {
    it('should throw when accessing error on a successful result', () => {
      const result = Result.ok('success');
      expect(() => result.error).toThrow('Cannot access error of a successful Result');
    });
  });

  describe('map', () => {
    it('should transform the value on success', () => {
      const result = Result.ok(5).map((v) => v * 2);
      expect(result.isOk()).toBe(true);
      expect(result.value).toBe(10);
    });

    it('should propagate error on failure', () => {
      const result = Result.fail<number, string>('error').map((v) => v * 2);
      expect(result.isFail()).toBe(true);
      expect(result.error).toBe('error');
    });
  });

  describe('flatMap', () => {
    it('should chain successful results', () => {
      const result = Result.ok(5).flatMap((v) => Result.ok(v * 2));
      expect(result.isOk()).toBe(true);
      expect(result.value).toBe(10);
    });

    it('should short-circuit on failure', () => {
      const result = Result.fail<number, string>('error').flatMap((v) => Result.ok(v * 2));
      expect(result.isFail()).toBe(true);
      expect(result.error).toBe('error');
    });

    it('should propagate failure from the chain', () => {
      const result = Result.ok(5).flatMap(() => Result.fail<number, string>('chained error'));
      expect(result.isFail()).toBe(true);
      expect(result.error).toBe('chained error');
    });
  });

  describe('getOrElse', () => {
    it('should return value on success', () => {
      expect(Result.ok(42).getOrElse(0)).toBe(42);
    });

    it('should return default on failure', () => {
      expect(Result.fail<number, string>('error').getOrElse(0)).toBe(0);
    });
  });
});
