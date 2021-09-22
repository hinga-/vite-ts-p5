import 'styles/style.scss'
import p5 from 'p5'

const sketch = (p5: p5) => {
  p5.setup = (): void => {
    p5.createCanvas(400, 400)
  }

  p5.draw = (): void => {
    p5.background(500)
    p5.ellipse(50, 50, 80, 80)
  }
}

new p5(sketch, document.getElementById('app')!)
