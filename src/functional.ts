export const pipe = <A, B, C>(a: (x: A) => B, b: (x: B) => C) => (x: A) => b(a(x))
