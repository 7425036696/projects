let input = document.querySelector('input')
input.addEventListener('input', (e) => {
    if(input.value.length >= 4)
    input.value = `+(${e.target.value.substring(0, 3)}) -` + `${e.target.value}`.substring(3)
console.log(e.target.value.substring(4,100));
})
