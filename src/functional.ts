export const pipe2 = <A, B, C>(a: (x: A) => B, b: (x: B) => C) => (x: A) => b(a(x))

export const pipe3 = <A, B, C, D>(a: (x: A) => B, b: (x: B) => C, c: (x: C) => D) => (x: A) => c(b(a(x)))
