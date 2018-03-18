var trivia = [
    {question: "what is my name?", A: "Susie", B: "Mary", C: "Harold", D: "Gorp", correctAnswer: "Mary"},
    {question: "what is my favorite color?", A: "Blue", B: "Green", C: "Peach", D: "Yellow", correctAnswer: "Blue"},
    {question: "What is my cat's name?", A: "Tipper", B: "Mr Magic Pants", C: "Pooky", D: "Gracie", correctAnswer: "Gracie"}
]
var index = -1;
var correct = 0;
var incorrect = 0;
var time;
var guess = "";
var timesUp = false;
var timerGo;

$(".play-again").hide()


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
    $(this).css("background-color", "white")  
});

function countDown(){   
    if (time > 0){
        time --;
        $(".time-display").text(time)
    } if (time === 0 && index < trivia.length){
        clearInterval(timerGo);
        outofTime()
        setTimeout(showNext, 2000); 
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
        $(".results").text(`You got ${correct} out of 10 questions correct!`) 
    } else if (index < trivia.length) {
        time = 20
        timerGo = setInterval(countDown, 1000)
        $(".answerOption").css("background-color", "white")
        $("main").show()
        $(".results").hide()   
        $(".question").text(trivia[index].question)
        $(".choiceA").text(trivia[index].A)
        $(".choiceB").text(trivia[index].B)
        $(".choiceC").text(trivia[index].C)
        $(".choiceD").text(trivia[index].D)       
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
        setTimeout(showNext, 2000);  
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