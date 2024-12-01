
let svg = document.querySelector('svg');
let nav  = document.querySelector('.nav')
svg.addEventListener('click', (event) => {
    event.preventDefault(); 
    
    setTimeout(() => {
        svg.classList.toggle('hover');
        
    }, 400);
    nav.classList.toggle('visible')
     
});