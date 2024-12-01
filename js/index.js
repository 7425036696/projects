let result = document.querySelector('span')  
 let minus = document.querySelector('.minus')
 let add  = document.querySelector('.plus')
 let p = document.querySelector('p')
 let input = document.querySelector('.input')
 let reset = document.querySelector('.reset')
 result.innerText = 0;

 minus.addEventListener('click', ()=>result.innerText = Number(result.innerText) - Number(input.value))
 add.addEventListener('click', ()=> {
    result.innerText = Number(result.innerText) + Number(input.value);
})
reset.addEventListener('click', ()=> result.innerText = 0)