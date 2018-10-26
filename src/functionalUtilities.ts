import { Func1 } from 'redux'

// Because of a known issue in Typescript where you cannot use a ReadonlyArray
// with a rest parameter, I am disabling the tslint-immutable readonly-array rule
// here once.
/* tslint:disable-next-line readonly-array */
export const pipe = <T>(...fns: Array<Func1<T, T>>): Func1<T, T> => (x: T): T =>
  fns.reduce((v, f) => f(v), x)
