let tip = document.querySelectorAll('.tip')
let bill = document.querySelector('#bill-amount')
let container = document.querySelector('.tip-container')
let custom = document.querySelector('.custom-tip')
let no = document.querySelector('.number-of-people')
let generate = document.querySelector('.generate-bill-btn')
let amount = document.querySelector("body > main > div.bill-output > p.tip-amount > span")
let total = document.querySelector("body > main > div.bill-output > p.total > span")
let each = document.querySelector("body > main > div.bill-output > p.each-person-bill > span")
no.value = 1
let reset = document.querySelector('.reset-btn')

bill.addEventListener('change', ()=>{
    container.classList.remove('disabled')
    custom.removeAttribute('disabled')
    no.removeAttribute('disabled')
    generate.removeAttribute('disabled')
})
container.addEventListener('click', (e) =>{
    generate.addEventListener('click', ()=>{
        amount.innerText = Math.round((parseInt(e.target.innerText) / 100) * parseInt(bill.value))
        total.innerText  = Math.round(parseInt(bill.value) - parseInt(amount.innerText))
        each.innerText = Math.round(parseInt(total.innerText) / parseInt(no.value))
        reset.removeAttribute('disabled')
    })    
    if(e.target !== container){
    Array.from(container.children).forEach((child) => child.classList.remove('selected'));
e.target.classList.add('selected')
custom.value = ''
    }
})
custom.addEventListener('input', ()=>{
    generate.addEventListener('click', ()=>{
    Array.from(container.children).forEach((child) => child.classList.remove('selected'));
    amount.innerText = Math.round((parseInt(custom.value) / 100) * bill.value)
    total.innerText  = Math.round(bill.value - amount.innerText)
    each.innerText = Math.round(parseInt(total.innerText) / parseInt(no.value))
    reset.removeAttribute('disabled')
    })
})
reset.addEventListener('click', ()=>{
    amount.innerText = ''
    each.innerText = ''
    total.innerText = ''
    bill.value = ''
    Array.from(container.children).forEach((child) => child.classList.remove('selected'));
    custom.value =  ''
})



