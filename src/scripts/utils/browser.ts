const outer = document.createElement('div')
const inner = document.createElement('div')

export const getScrollBarSize = (): number => {
  outer.style.cssText = ['visibility: hidden', 'width: 100px'].join(';')

  document.body.appendChild(outer)

  const outerWidth = outer.offsetWidth
  outer.style.overflow = 'scroll'
  inner.style.width = '100%'
  outer.appendChild(inner)

  const innerWidth = inner.offsetWidth
  outer.parentNode?.removeChild(outer)

  return outerWidth - innerWidth
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

// @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export const isiOS = (): boolean => {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >=
      0 ||
    (navigator.userAgent.indexOf('Mac') >= 0 && 'ontouchend' in document)
  )
}
