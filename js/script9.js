let circle = document.querySelectorAll('.circle');
let x = 1;
let boolean = false;
let value = document.querySelector('.value');
let inner = document.querySelector('.inner');
let error = document.querySelector('.hidden');
let input = document.querySelectorAll('input');
let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    // first : {
    //     name : '',
    //     completed : 'false'
    // },
    // second : {
    //     name : '',
    //     completed : 'false'
    // },
    // third : {
    //     name : '',
    //     completed : 'false'
    // }
}
length = Object.values(allGoals).filter((goal) => goal.completed).length
let label = document.querySelector('.para')
const quotes = [
     'Raise the bar by completing your goals!',
     'Well begun is half done!',
     'Just a step away, keep going!',
     'whoa! you just completed all the goals'
]
label.innerText  = quotes[length]
circle.forEach(inp => {
    inp.addEventListener('click', () => {
        boolean = [...input].every((values) => {
            return values.value;
        });

        if (boolean) {
            inp.parentElement.classList.toggle('done');
            const inputId = inp.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            length = Object.values(allGoals).filter((goal) => goal.completed).length
            inner.style.width = `${length  / 3 *100}%`
            value.innerText = `${length}/3completed`
            if(length !==0){
                value.style.visibility = 'visible'; 
                inner.style.visibility = 'visible'; 
                }
                label.innerText  = quotes[length]

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            error.style.visibility = 'visible';
        }
    });
});

input.forEach((inputs) => {
    if(length !==0){
    inner.style.visibility = 'visible'; 
    value.style.visibility = 'visible';
    }
    if(allGoals[inputs.id]){
        inputs.value = allGoals[inputs.id].name

        if (allGoals[inputs.id].completed) {
            inputs.parentElement.classList.add('done')
        }
    }
    value.innerText = `${length}/3completed`
inner.style.width = `${length  / 3 *100}%`

    inputs.addEventListener('focus', () => {
        error.style.visibility = 'hidden';
    });
    inputs.addEventListener('input', (e) => {
        if(allGoals[input.id] && allGoals[inputs.id].completed){
            inputs.value = allGoals[inputs.id].name 
            return
        }
        if(allGoals[inputs.id]){
            allGoals[inputs.id].name = inputs.value
        }else{
            allGoals[inputs.id] = {
             name : inputs.value,
 completed : false
            } 
        }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))

    });
});


