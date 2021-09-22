export const PI = Math.PI
export const TAU = PI * 2
export const HALF_PI = PI / 2

interface Point {
  x: number
  y: number
}

type MathMethod = 'round' | 'ceil' | 'floor'

export const toDecimal = (n: number, digit = 2, method: MathMethod = 'round'): number => {
  const multiplier = Math.pow(10, digit)
  return Math[method](n * multiplier) / multiplier
}

export const degreesToRads = (deg: number): number => {
  return (deg * PI) / 180
}

export const radsToDegrees = (rad: number): number => {
  return (rad * 180.0) / PI
}

export const normalizeIndex = (index: number, length: number): number => {
  return (length + (index % length)) % length
}

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(min, val), max)
}

export const norm = (val: number, min: number, max: number): number => {
  return (val - min) / (max - min)
}

export const lerp = (start: number, end: number, amount: number): number => {
  return start * (1 - amount) + end * amount
}

export const map = (
  val: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  withinBounds = true
): number => {
  const v = lerp(toMin, toMax, norm(val, fromMin, fromMax))
  if (!withinBounds) {
    return v
  }
  if (toMin < toMax) {
    return clamp(v, toMin, toMax)
  } else {
    return clamp(v, toMax, toMin)
  }
}

export const random = (min?: number, max?: number): number => {
  if (!min) {
    return Math.random()
  }
  if (!max) {
    return Math.random() * min
  }
  return Math.random() * (max - min) + min
}

// Calculates the distance between two points.
export const distance = (p1: Point, p2: Point): number => {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y)
}
