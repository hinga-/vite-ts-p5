export const isArray = (val: unknown): val is Array<unknown> => {
  return Array.isArray(val)
}
export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}
export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number'
}
export const isFunction = (val: unknown): val is () => void => {
  return typeof val === 'function'
}
export const isNull = (val: unknown): val is null => {
  return val === null
}
export const isNodeList = (val: unknown): val is NodeList => {
  return val instanceof NodeList
}
export const isHTMLCollection = (val: unknown): val is HTMLCollection => {
  return val instanceof HTMLCollection
}
