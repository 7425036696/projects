let guess = document.querySelector('.guess')
let input = document.querySelector('input')
let sumbit = document.querySelector('.submit')
let start  = document.querySelector('.start')
let hidden = document.querySelector('.hidden')
let span = document.querySelector('span') 
let random = Math.floor(Math.random() * 100) + 1
let allg = []
sumbit.addEventListener('click', (e) =>{
    e.preventDefault()
    hidden.classList.remove('hidden') 
console.log(random);
if(parseInt(input.value)   < random){
span.innerText = 'Too low!'
}
else if (parseInt(input.value)  > random){
span.innerText = 'Too High!'
}
else{
span.innerText = 'Congrats! You win'
start.removeAttribute('disabled')
sumbit.setAttribute('disabled', false)
}
allg.push(input.value)
guess.innerText = allg.join(',')
})
start.addEventListener('click', () => {
span.innerText  = ''
guess.innerText = ''
input.value = ''
random = Math.floor(Math.random() * 100) + 1
sumbit.removeAttribute('disabled')
start.setAttribute('disabled', false)
})