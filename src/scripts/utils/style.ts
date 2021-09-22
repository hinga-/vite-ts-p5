import { toArray } from '@/utils/dom'

export const getStyle = (
  element: HTMLElement,
  prop: keyof CSSStyleDeclaration
):
  | string
  | number
  | CSSRule
  | ((property: string) => string)
  | ((property: string) => string)
  | ((index: number) => string)
  | ((property: string) => string)
  | ((property: string, value: string | null, priority?: string | undefined) => void)
  | null => {
  return window.getComputedStyle(element)[prop]
}

// @see https://stackoverflow.com/questions/55904672/union-type-of-partialcssstyledeclaration-and-dictionary-causes-typing-issues-w
export type CssStyleObject = Partial<CSSStyleDeclaration> & Record<string, string | null>

export const setStyle = (
  elements: Element | Element[] | NodeListOf<Element> | HTMLCollectionOf<Element>,
  props: CssStyleObject = {}
): void => {
  if (Object.keys(props).length === 0) {
    return
  }
  const styles = Object.keys(props).reduce((a, key) => (a += `${key}:${props[key]}; `), '')
  toArray(elements).forEach((el) => {
    el.setAttribute('style', styles)
  })
}

// feature FIXED 3d matrixの値の場合の対応
export const getMatrix = (
  element: HTMLElement
): { x: number; y: number; scaleX: number; scaleY: number; skewX: number; skewY: number } => {
  const transform = getStyle(element, 'transform') as string
  const reMatrix = /^matrix\((.+)\)$/
  const matrixType = transform.includes('3d') ? '3d' : '2d'

  if (matrixType === '2d' && transform.match(reMatrix)) {
    const matches = transform.match(reMatrix)
    if (matches && matches[1]) {
      const arrMatrix = matches[1].split(',')
      const [scaleX, skewY, skewX, scaleY, x, y] = arrMatrix.map((prop) => parseFloat(prop))
      return {
        x,
        y,
        scaleX,
        scaleY,
        skewX,
        skewY
      }
    }
  }

  return {
    x: 0,
    y: 0,
    scaleX: 0,
    scaleY: 0,
    skewX: 0,
    skewY: 0
  }
}
