let input = document.querySelector('input')
let lower = document.querySelector('#lowercase')
let upper = document.querySelector('#uppercase')
let camel = document.querySelector('#camelcase')
let pascal = document.querySelector('#pascalcase')
let snake = document.querySelector('#snakecase')
let kebab = document.querySelector('#kebabcase')
let trim = document.querySelector('#trim')
let array = []
let update = () => {
    // array.push(input.value)
    lower.innerText = input.value.toLowerCase()
    upper.innerText = input.value.toUpperCase()
    trim.innerText = input.value.replace(/\s/g, "")
    snake.innerText = input.value.split(' ').join('_')
    kebab.innerText = input.value.split(' ').join('-')
    pascal.innerText = input.value.split(' ').map((word) => {
        return word.replace(word[0] , word[0].toUpperCase())
      }).join('')

      camel.innerText = input.value.split(' ').map((word, i) => {
        if (i === 0) return word
        return word.replace(word[0] , word[0].toUpperCase())
      }).join('')
}


    update()
input.addEventListener('input', () => {
    update()
})
