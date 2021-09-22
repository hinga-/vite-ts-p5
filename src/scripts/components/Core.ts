import { isString, isArray } from '@/utils/is'

interface Props {
  target?: HTMLElement
  name?: string
}

export class Core {
  protected element: HTMLElement | null
  protected refs: Map<string, HTMLElement[]>
  protected ref?: string
  protected selector?: string

  constructor(element: HTMLElement | string, { target, name }: Props = {}) {
    this.element = isString(element) ? document.querySelector(element as string) : element
    this.refs = new Map()

    if (name) {
      this.ref = `${name}-ref`
      this.selector = `[data-${this.ref}]`
      this.refs = target || this.element ? this.getRefs((target as HTMLElement) || this.element) : this.getRefs()
    }
  }

  private getRefs(target: Document | HTMLElement = document): Map<string, HTMLElement[]> {
    return [...target.querySelectorAll(this.selector as string)].reduce((acc, el) => {
      const name = el.getAttribute(`data-${this.ref}`)
      if (name) {
        if (!acc.has(name)) {
          acc.set(name, [el])
        } else {
          const elems = acc.get(name)
          if (isArray(elems)) {
            acc.get(name).push(el)
          } else {
            acc.delete(name)
            acc.set(name, [elems, el])
          }
        }
      }
      return acc
    }, new Map())
  }
}
