import { isArray, isNodeList, isHTMLCollection } from '@/utils/is'

/**
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L81
 */
export const getSelectorFromElement = (element: HTMLElement): HTMLElement | null => {
  let selector = element.getAttribute('data-href')

  if (!selector || selector === '#') {
    const hrefAttr = element.getAttribute('href')
    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : ''
  }

  try {
    return document.querySelector(selector)
  } catch (err) {
    return null
  }
}

export const getOffset = (element: HTMLElement): { top: number; left: number } => {
  let left = 0
  let top = 0

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    const { tagName, offsetLeft, offsetTop, scrollLeft, scrollTop } = element
    left += offsetLeft - (tagName !== 'BODY' ? scrollLeft : 0)
    top += offsetTop - (tagName !== 'BODY' ? scrollTop : 0)
    element = element.offsetParent as HTMLElement
  }

  return { top, left }
}

export const toArray = (val: Element | Element[] | NodeListOf<Element> | HTMLCollectionOf<Element>): Element[] => {
  if (isNodeList(val) || isHTMLCollection(val)) {
    return [].slice.call(val)
  }
  return isArray(val) ? val : [val]
}

export const parseHTML = (htmlString: string): HTMLCollection => {
  const div = document.createElement('div')
  div.innerHTML = htmlString
  return div.children
}
