import { Resizer } from './Resizer'
import { Scroller } from './Scroller'
import { Recorder } from './Recorder'
import { EventEmitter } from './EventEmitter'

// mediator
export const resizer = new Resizer()
export const scroller = new Scroller()
export const recorder = new Recorder()
export const emitter = new EventEmitter()
