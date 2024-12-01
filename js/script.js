let toast = document.querySelector('.show-toast')
let message = document.querySelector('#toast-message')   
let duration = document.querySelector('#duration')
let type = document.querySelector('#toast-type')
let container = document.querySelector('.toasts-container')
let horizontal  = document.querySelector("#horizontal-position")
let vertical  = document.querySelector("#vertical-position")
toast.addEventListener('click', ()=>{
    if (horizontal.value === 'right') {
        container.classList.add('right')
      } else {
        container.classList.remove('right')
      }
      if (vertical.value === 'bottom') {
        container.classList.add('bottom')
      } else {
        container.classList.remove('bottom')
      }    let h = horizontal.value
    let v= vertical.value
    let newElement = document.createElement('div')
    newElement.classList.add('toast', type.value)
newElement.textContent = message.value
console.log(v,h);
    container.classList.add(v , h)
    container.append(newElement)
    setTimeout(() => {
        newElement.remove()
    }, parseInt(duration.value) * 1000);
})