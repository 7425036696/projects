let humidity = document.querySelector('.humidity')
let temp = document.querySelector('.temp')
let city = document.querySelector('.city')
let wind = document.querySelector('.wind')
let button = document.querySelector("body > div > form > button")
let error = document.querySelector('.error')
let input = document.querySelector('input')
let div = document.querySelector('.weather')
button.addEventListener('click', (e) =>{
    e.preventDefault()
weather()
})
async function weather() {
    let returnOutput = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input.value}&appid=46d47581a51a79782741111953e700af`).catch(() =>{
        console.log('there is a errro');
    })
    if (!returnOutput.ok) {
        error.classList.add('visible')
        div.classList.remove('visible')
    }
    else{
        error.classList.remove('visible')
        div.classList.add('visible')
        let data = await returnOutput.json()
        city.innerText = data.name
        temp.innerText = data.main.temp
        humidity.innerText = data.main.humidity
        wind.innerText = data.wind.speed
            console.log(data);
    }

}