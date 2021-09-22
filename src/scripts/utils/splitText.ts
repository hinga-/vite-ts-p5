import { parseHTML, toArray } from '@/utils/dom'

type SplitMode = 'line' | 'word' | 'char'
type HTMLTags = 'div' | 'p' | 'a' | 'span'

interface Props {
  type?: SplitMode
  tagName?: HTMLTags
  lineClass?: string
  wordClass?: string
  charClass?: string
}

export const splitText = (
  element: HTMLElement,
  { type = 'char', tagName = 'span', lineClass = 'line', wordClass = 'word', charClass = 'char' }: Props = {}
): void => {
  if (!element) return
  const fragment = document.createDocumentFragment()
  const text = element.innerHTML
  const { regex, className } = {
    char: {
      regex: /(?=[^>]*(?:<|$))/,
      className: charClass
    },
    word: {
      regex: / (?=[^>]*(?:<|$))/,
      className: wordClass
    },
    line: {
      regex: /<br\s*\/?>/,
      className: lineClass
    }
  }[type]
  const split = text.split(regex)
  element.innerHTML = ''
  const strHtml = split
    .map((str) => {
      if (str.match(/^\s/)) {
        str = str.replace(/ /g, '\u00a0')
      }
      return str.match(/[&<>'"]/) ? str : `<${tagName} class="${className}">${str}</${tagName}>`
    })
    .join('')

  toArray(parseHTML(strHtml)).forEach((el) => {
    fragment.appendChild(el)
  })

  element.appendChild(fragment)
}
