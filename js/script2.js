let div = document.querySelector('.div')
let position = 0
let up = 0 
window.addEventListener('keydown', (e)=>{
    console.log(e.key);
    if(e.key.includes('Up')){
        up += 10
        div.style.bottom =  up+'px'
    }
    else if(e.key.includes('Right')){
        position += 10
        div.style.left =  position+'px'
    }
    else if(e.key.includes('Down')){
        up -= 10
        div.style.bottom =  up+'px'
    }
    else if(e.key.includes('Left')){
  position -= 10
        div.style.left =  position+'px'
    }
})