/**
 * decorator
 */

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export function noSideEffects<T>(fn: () => T): T {
  return { toString: fn }.toString() as unknown as T;
}
