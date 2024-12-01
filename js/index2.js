let rock = document.querySelector('.rock-btn')
let scissor = document.querySelector('.scissors-btn')
let paper = document.querySelector('.paper-btn')
let user = document.querySelector('.user')
let computer = document.querySelector('.computer')
let rockIcon = '🤜'
let scissorIcon = '✌️'
let paperIcon = '✋'
let array = [rockIcon, scissorIcon, paperIcon]
let result = document.querySelector('.result')
let us = document.querySelector('.user-score')
let usc  = Number(us.innerText)
let cs = document.querySelector('.computer-score')
let csc = Number(cs.innerText) 
let main = (emoji) => {
    user.innerText = '🤜'
    computer.innerText = '🤛'
    user.classList.add('shakeUserHands')
    computer.classList.add('shakeComputerHands')
    let random = Math.floor(Math.random() * 3)
    setTimeout(() => {
        user.classList.remove('shakeUserHands')
        computer.classList.remove('shakeComputerHands')
        computer.innerText = array[random]
        user.innerText = emoji
        let ui = user.innerText
        let ci = computer.innerText
        if (ui == ci) {
            result.innerText = 'Draw'
        }
        else if (((ui == rockIcon) && (ci == scissorIcon)) || ((ui == paperIcon) && (ci == rockIcon)) || ((ui == scissorIcon) && (ci == paperIcon))) {
            result.innerText = 'You win!'
            usc++
            us.innerText = usc
        }
        else{
            result.innerText = 'computer win!'
            csc++
            cs.innerText = csc
        }
    }, 1000);
}

rock.addEventListener('click', () => main(rockIcon))
scissor.addEventListener('click', () => main(scissorIcon))
paper.addEventListener('click', () => main(paperIcon))

