const wordlist = [
    'Student',
    'Coder',
    'Developer',
    'Singer'
];
let color = [ 
    'yellow',
    'green',
    'blue',
]
let div = document.querySelector('div')
let bodyColor = [ 'dodgerblue', 'pink' , 'hotpink']
let span = document.querySelector('span');
let index = 0;
let type = false; 
let wordIndex = 0;     
let cindex = 1;
const id = setInterval(() => {
    if (!type) {
        span.innerText = span.innerText + wordlist[wordIndex][index];
        index++;
    } else {
        span.innerText = span.innerText.slice(0, span.innerText.length - 1);
    }

    if (span.innerText.length == 0 && type) {
        // If the word is fully deleted, start typing the next word
        type = false;
        index = 0; // Reset index when moving to the next word
        wordIndex++;
if(cindex == 3){
    cindex = 0
}
        // span.style.color = color[cindex]
        // document.querySelector('body').style.backgroundColor = bodyColor[cindex]
        // div.style.backgroundColor = color[cindex]
        // cindex++
        if (wordIndex == wordlist.length) {
            wordIndex = 0; // Wrap around to the first word
        }
    }

    if (index == wordlist[wordIndex].length) {
        // Once the full word is typed, start deleting
        type = true;
    }
}, 150);
