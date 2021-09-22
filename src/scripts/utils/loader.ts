import { on } from '@/utils/event'

export const imageLoader = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    on(img, 'load', () => resolve(img))
    img.src = src
  })
}

export const videoLoader = (video: HTMLVideoElement): Promise<HTMLVideoElement> => {
  return new Promise((resolve) => {
    on(video, 'canplaythrough', () => resolve(video))
  })
}
