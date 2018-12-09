export const pipe2 = <A, B, C>(a: (x: A) => B, b: (x: B) => C) => (x: A) => b(a(x))

export const pipe3 = <A, B, C, D>(a: (x: A) => B, b: (x: B) => C, c: (x: C) => D) => (x: A) => c(b(a(x)))

export interface TypedArrayUpdate {
  [index: number]: number
}

export const updateUint8Array = (typedArray: Uint8Array, ...updates: TypedArrayUpdate[]): Uint8Array =>
  Object.assign(Uint8Array.from({ length: typedArray.length }), typedArray, ...updates)
