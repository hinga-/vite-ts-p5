import { gsap } from 'gsap'
import { isNumber } from '@/utils/is'
import { getOffset } from '@/utils/dom'

interface Props {
  offset?: number
  duration?: number
  delay?: number
  ease?: string
}

export const scrollTo = (
  element: HTMLElement | number,
  { offset = 0, duration = 0.6, delay = 0, ease = 'power2.out' }: Props = {}
): gsap.core.Tween => {
  const scrollTop = isNumber(element) ? element - offset : getOffset(element).top - offset
  return gsap.to('html, body', {
    duration,
    scrollTop,
    delay,
    ease
  })
}
