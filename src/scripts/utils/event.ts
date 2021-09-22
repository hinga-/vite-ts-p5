interface Listener {
  (
    element: EventTarget,
    eventType: string,
    fn: (e: Event, el?: HTMLElement) => void,
    options?: boolean | EventListenerOptions,
    selector?: string
  ): ((e: Event, target?: HTMLElement) => void) | void
}

interface KeyCodes {
  [keycode: number]: number
}

const keyCodes: KeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1 }

const preventDefault = (e: Event): void => {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
  const key = Number(e.key) || e.keyCode
  if (keyCodes[key]) {
    preventDefault(e)
    return false
  }
}

export const disableScroll = (): void => {
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

export const enableScroll = (): void => {
  window.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}

export const on: Listener = (element, eventType, fn, options = false, selector) => {
  const handler = (e: Event) => {
    let el = e.target as HTMLElement
    while (el && el !== element) {
      if (selector && el.matches && el.matches(selector)) {
        fn(e, el)
        break
      }
      el = el.parentNode as HTMLElement
    }
  }

  element.addEventListener(eventType, selector ? handler : fn, options)

  if (selector) return handler
}

export const off: Listener = (element, eventType, fn, options = false): void => {
  element.removeEventListener(eventType, fn, options)
}

export const trigger = (element: EventTarget, eventType: string): void => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(eventType, false, true)
  element.dispatchEvent(e)
}
