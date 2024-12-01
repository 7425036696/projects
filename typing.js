const typingTexts = [
    `In the heart of every city, there lies a story waiting to be told. From the bustling streets to the quiet corners, every inch of urban life is filled with moments that define our existence. People rush by, each with their own dreams and aspirations, weaving a tapestry of experiences that is both vibrant and complex.`,
    `The sun sets over the horizon, casting a warm golden glow across the landscape. As the day transitions into night, the sky transforms into a canvas painted with hues of orange, pink, and purple. This daily spectacle reminds us of the beauty of nature and the passage of time, urging us to pause and appreciate the world around us.`,
    `Technology has revolutionized the way we communicate and connect with one another. In an age where information travels at lightning speed, we find ourselves constantly engaged in a digital dialogue. Yet, amidst this connectivity, it is essential to remember the value of face-to-face interactions and genuine human connection.`,
    `The ocean waves crash against the shore, creating a rhythmic melody that soothes the soul. Each wave carries with it a story from distant lands, reminding us of the vastness of our planet and the mysteries it holds. As we stand on the beach, we are reminded of our place in this world and our connection to nature.`,
    `Books have always been a source of knowledge and inspiration. They transport us to different worlds, introduce us to new ideas, and challenge our perspectives. In a society increasingly driven by technology, the simple act of reading can provide an escape and a deeper understanding of ourselves and others.`,
    `Friendship is one of life’s greatest treasures. It offers support during tough times and joy during moments of celebration. True friends understand each other deeply and share experiences that create lasting memories.`,
    `The changing seasons bring a sense of renewal and transformation. Spring blossoms with vibrant colors, summer radiates warmth, autumn paints the world in rich hues, and winter blankets everything in serene white. Each season has its own unique charm and beauty.`,
    `Traveling opens our eyes to diverse cultures and traditions. Every destination has its own story to tell through its food, art, and people. Exploring new places enriches our lives and broadens our understanding of the world.`,
    `Life is a journey filled with ups and downs. It teaches us resilience and adaptability as we navigate through challenges. Embracing change can lead to personal growth and new opportunities.`,
    `Music has an incredible power to evoke emotions and memories. Whether it’s a soothing melody or an upbeat rhythm, music can transport us to different times and places. It connects people across cultures and generations.`,
    `Nature is a source of inspiration for many artists and writers. The beauty of landscapes, flora, and fauna can ignite creativity and imagination. Spending time outdoors can also provide clarity and peace in our busy lives.`,
    `The importance of kindness cannot be overstated. Small acts of kindness can create ripples that affect many lives. In a world that sometimes feels divided, compassion can bridge gaps and foster understanding.`,
    `History is filled with lessons that shape our present and future. By studying past events, we gain insights into human behavior and societal changes. Understanding history helps us make informed decisions today.`,
    `The pursuit of knowledge is a lifelong journey. Education empowers individuals to think critically and solve problems creatively. Lifelong learning fosters innovation and adaptability in an ever-changing world.`,
    `Art is a reflection of society’s values, struggles, and triumphs. Through various forms such as painting, sculpture, or performance, artists express their thoughts and emotions. Art invites dialogue and encourages us to see the world from different perspectives.`,
    `Health is wealth; it is often said that without good health, all riches mean little. Taking care of our bodies through proper nutrition, exercise, and mental wellness should be a priority for everyone. A healthy lifestyle fosters happiness and longevity.`,
    `The universe is vast and mysterious, filled with galaxies yet to be explored. Astronomy allows us to ponder our existence in relation to the cosmos. Each star we see at night tells a story from billions of years ago.`,
    `Dreams are powerful motivators that drive us towards our goals. They inspire creativity and innovation while challenging us to step outside our comfort zones. Pursuing dreams requires courage but can lead to incredible achievements.`,
    `Community plays an essential role in our lives; it provides support systems for individuals and families alike. Engaging with local initiatives fosters connections among people who share common interests or goals. A strong community enhances overall well-being.`,
    `Sustainability is crucial for preserving our planet for future generations. Making conscious choices about consumption can lead to positive environmental impacts. Every small action contributes toward creating a healthier Earth for all living beings.`
];
let para = document.querySelector('p')
let div = document.querySelector('div')
let i = document.querySelector('.fas')
let input = document.querySelector('input')
let spans= document.querySelectorAll('span')
// setText()
let setText = () =>{
    let random  = Math.floor(Math.random() * 20)
    for(let i = 0; i <= typingTexts[random].length; i++){
     let span = document.createElement('span')
     div.append(span)
     span.innerText = typingTexts[random][i]
     if(!span.innerText){
        span.style.width = '5px'
     }
    }
}
setText()
i.addEventListener('click' , () =>{
    console.log('object');
    div.innerHTML = ''
    setText()

})
input.addEventListener('input', (e) =>{
    let value = input.value
    // for(let i = 0; i >= spans.length; i++){

    //     if(value == spans[i]){
    //     spans[i].classList.add('correct')
    //     }
    }
})