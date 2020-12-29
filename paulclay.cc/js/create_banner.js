function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

function smoothDamp(current, target, currentVelocityRef, smoothTime, maxSpeed, deltaTime) { // currentVelocityRef = {currentVelocity}
  if (deltaTime == 0) return current

  smoothTime = Math.max(0.0001, smoothTime)
  const num = 2.0 / smoothTime
  const num2 = num * deltaTime
  const num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2)
  let num4 = current - target
  const num5 = target
  const num6 = maxSpeed * smoothTime
  num4 = clamp(num4, -num6, num6)
  target = current - num4
  const num7 = (currentVelocityRef.currentVelocity + num * num4) * deltaTime
  currentVelocityRef.currentVelocity = (currentVelocityRef.currentVelocity - num * num7) * num3
  let num8 = target + (num4 + num7) * num3
  if (num5 - current > 0 == num8 > num5) {
      num8 = num5
      currentVelocityRef.currentVelocity = (num8 - num5) / deltaTime
  }
  return num8
}

function AnimatedChar(char, color, opacity, x, y) {
  this.x = x
  this.y = y
  this.opacity = opacity
  this.char = char
  this.color = color
  this.targX = 0
  this.targY = 0
  this.targOpacity = 0
  this.velXRef = { currentVelocity: 0 }
  this.velYRef = { currentVelocity: 0 }
  this.opacityRef = { currentVelocity: 0 }
  this.smoothTime = Math.random() * 350.0 + 100
  this.maxSpeed = 1000.0
}
AnimatedChar.prototype.init = function(x, y) {
  this.x = x
  this.y = y
}

AnimatedChar.prototype.update = function(x, y) {
  this.x = smoothDamp(this.x, this.targX, this.velXRef, this.smoothTime, this.maxSpeed, 10.0)
  this.y = smoothDamp(this.y, this.targY, this.velYRef, this.smoothTime, this.maxSpeed, 10.0)
  this.opacity = smoothDamp(this.opacity, this.targOpacity, this.opacityRef, this.smoothTime, this.maxSpeed, 6.0)
}

AnimatedChar.prototype.setTargs = function(targX, targY) {
  this.targX = targX
  this.targY = targY
}

AnimatedChar.prototype.setTargOpacity = function(targOpacity) {
  this.targOpacity = targOpacity
}

AnimatedChar.prototype.draw = function(ctx) {
  ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`
  ctx.fillText(this.char, this.x, this.y)
}

const rawChars = `...OxxxxO:....oxx....xO..oxo.xx:........oxxO..:xx.......xxo...Oxx..:OO...........................
...Oxxxxxx:...xxxo..:xx:.Oxx.xxo.......Oxxxxx.oxx......oxxx...:xxo.xxx...........................
...Oxx::xxo..:xxxx..:xx:.OxO.xxo......:xxx:xx:oxx......xxxx:...oxxOxx............................
...OOO.:xxo..OxOxx:.:xx:.OxO.xxo......oxx...:.oxx.....:xxOxO....xxxx:............................
...Oxxxxxx...xx:OxO.:xx..oxO.xxo......oxx.....oxx.....Oxx:xx....:xxO.............................
...Oxxxxx:..oxxxxxx.:xx:.OxO.xxo......oxx...o.oxx.....xxxOxxo....xxo.............................
...Oxx......OxxxxOx:.xxxoxxO.xxxxx:....xxxOxxooxxOxO.:xxxxOxx....xOo.............................
...Oxx......xxO::xxx.oxxxxx..xxxxxO....oxxxOx.oxxxxx.Oxx::oxx:...xxo.............................
...:O:......OO....o...:OOo...OOooo:.....:oOo..:OOooo.:O:...oo....oO..............................
.................................................................................................
.................................................................................................
.................................................................................................`
const lines = rawChars.split('\n').map(line => line.split(''))

const canvas = document.getElementById('banner-canvas')
const ctx = canvas.getContext('2d')
const width = 810
const height = 125
const rowHeight = 125/lines.length
const charWidth = width/lines[0].length + .2
canvas.width = width * 2;
canvas.height = height * 2;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
canvas.getContext('2d').scale(2,2)

ctx.font = '10px "Courier New"'
const colors  = {
  'O': [0,242,255],
  ':': [51,18,18],
  'x': [170,255,184],
  '.': [0,0,0],
  'o': [0,242,255],
}
ctx.translate(40.5,10.5)
const animatedChars = []
lines.forEach((line, lineInd) => {
  line.forEach((char, charInd) => {
      // todo color
      const dir = charInd%2 === 0 ? -1 : 1
      const animatedChar = new AnimatedChar(char, colors[char], 0, charInd * 10, lineInd * rowHeight - Math.random() * 10 * dir)
      animatedChar.setTargs(charInd * 10, lineInd * rowHeight)
      animatedChar.setTargOpacity(1.0)
      animatedChars.push(animatedChar)
  })
})


function loop() {
  ctx.clearRect(-50,-50, 2000, 500)
  animatedChars.forEach(char => char.update())
  animatedChars.forEach(char => char.draw(ctx))
  window.requestAnimationFrame(loop)
}

let cancelId = null
setTimeout(() => {
  cancelId = window.requestAnimationFrame(loop)
}, 300)

setTimeout(() => {
  cancelId = window.cancelAnimationFrame(cancelId)
}, 5000)