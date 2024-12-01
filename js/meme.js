let button = document.querySelector('button')
let img = document.querySelector('img')
let span = document.querySelector('span')
let h1 = document.querySelector('h1')
function get(){
    fetch('https://meme-api.com/gimme/wholesomememes')
    .then((res) => res.json())
    .then((data) => {
         const {author, title, url} = data
         img.src = url
         h1.innerText = title
         span.innerText  = author
         })
    .catch(err => console.log(err))
}
button.addEventListener('click', ()=>{
get()
})
get()
