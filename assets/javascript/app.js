var trivia = [
    {question: "This word, literally translated as 'grief bacon', refers to the excess weight put on by emotional overeating.", A: "Traurigfett", B: "Kummerspeck", C: "Verlustschinken", correctAnswer: "Kummerspeck"},
    {question: "What is the definition of Torschlusspanik (closing-gate panic)?", A: "fear of being late", B: "a feeling of dread and anxiety around an impending deadline", C: "a feeling of urgency to settle down or have children before your biological clock runs out", correctAnswer: "a feeling of urgency to settle down or have children before your biological clock runs out"},
    {question: "This word, literally translated as 'slap face', describes someone who you feel needs a slap in the face.", A: "Backpfeifengesicht", B: "Nervensäge", C: "Schlagenausdruck", correctAnswer: "Backpfeifengesicht"},
    {question: "Those who possess a lot of Sitzfleisch, or 'sit meat'...", A: "... have trouble fitting into their pants.", B: "... are able to sit through something very hard or boring.", C: "... are very lazy.", correctAnswer: "... are able to sit through something very hard or boring."},
    {question: "Translating literally to something like 'abdominal brushing', this word means to flatter or fawn over someone. The term originally described the act of rubbing the bellies of cats and dogs", A: "Bauchpinseln", B: "Hinterseitereiben", C: "Magensprechen", correctAnswer: "Bauchpinseln"},
    {question: "What does the word 'Kuddelmuddel' mean?", A: "a person who is overly affectionate with aquaintences", B: "a run-on sentence", C: "a chaotic mess or hodgepodge", correctAnswer: "a chaotic mess or hodgepodge"},
    {question: "A joke or comeback that comes to you after it's too late.", A: "Beleidigung", B: "Treppenwitz", C: "Späterwiderung", correctAnswer: "Treppenwitz"},
    {question: "People experiencing Vergangenheitsbewaeltigung are...", A: "feeling a sensation of falling in a dream", B: "experiencing deja vu", C: "struggling to come to terms with the past", correctAnswer: "struggling to come to terms with the past"},
    {question: "Literally translated as 'a person who wears gloves to throw snowballs', what does Handschuhschneeballwerfer mean?", A: "someone fragile and lacking resilience", B: "a coward who only criticizes behind others' backs", C: "a conscientious worker", correctAnswer:"a coward who only criticizes behind others' backs"}
]
var index = -1;
var correct = 0;
var incorrect = 0;
var time;
var guess = "";
var timesUp = false;
var timerGo;

$(".play-again").hide()
$("main").hide()

// ______________________________________________ start game and change start button to next button
$(".start").click(function(){
    $(this).hide()
    showNext()
});

$(".play-again").click(function(){
    $(this).hide()
    index = -1
    showNext()
});

//______________________________________________  highlights chosen answer
$(".answerOption").mouseenter(function() {
    $(this).css("background-color", "gray")   
});
$(".answerOption").mouseleave(function() {
    $(this).css("background-color", "#e3e3e3")  
});

function countDown(){   
    if (time > 0){
        time --;
        $(".time-display").text(time)
    } if (time === 0 && index < trivia.length){
        clearInterval(timerGo);
        outofTime()
        setTimeout(showNext, 4000); 
    }
}

function showNext(){
    index++
    if (index === trivia.length){
        clearInterval(timerGo);
        $(".time-display").text("")
        $("main").hide()
        $(".results").show()
        $(".play-again").show()
        $(".results").text(`You got ${correct} out of 9 questions correct!`) 
    } else if (index < trivia.length) {
        time = 30
        timerGo = setInterval(countDown, 1000)
        $(".answerOption").css("background-color", "#e3e3e3")
        $("main").show()
        $(".results").hide()   
        $(".question").text(trivia[index].question)
        $(".choiceA").text(trivia[index].A)
        $(".choiceB").text(trivia[index].B)
        $(".choiceC").text(trivia[index].C)       
        $(".time-display").text(time) 
    }


}   
// ______________________________________________  submit and check answer, then go to next
$(".answerOption").click(function(){
    // clearInterval(countDown)
    guess = $(this).text()
    console.log(guess)
    if (time > 0 && guess === trivia[index].correctAnswer && index < trivia.length){
        // clearInterval(countDown);
        clearInterval(timerGo);
        rightAnswer();
        setTimeout(showNext, 2000);  
        // setInterval(countDown, 1000)
    } else if (time > 0 && guess != trivia[index].correctAnswer && index < trivia.length){
        // clearInterval(countDown);
        clearInterval(timerGo);
        wrongAnswer();
        setTimeout(showNext, 4000);  
        // setInterval(countDown, 1000)
    } 
});


function rightAnswer(){
    correct++
    time = 0
    $("main").hide()
    $(".results").show()
    $(".results").text('You got it!')
}

function wrongAnswer(){
    incorrect++
    time = 0
    $("main").hide()
    $(".results").show()
    $(".results").text(`Whoops, that's not it! The answer was ${trivia[index].correctAnswer}`) 
}

function outofTime(){
    incorrect++
    $("main").hide()
    $(".results").show()
    $(".results").text(`Out of time! The answer was ${trivia[index].correctAnswer}`)
}





 
// } else if (time === 0 && index === trivia.length) {
//     clearInterval(timerGo);
//     $("main").hide()
//     $(".results").show()
//     $(".play-again").show()
//     $(".results").text(`You got ${correct} out of 10 questions correct!`) 
// }