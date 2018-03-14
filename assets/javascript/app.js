var trivia = [
    {question: "what is my name?", A: "Susie", B: "Mary", C: "Harold", D: "Gorp", correctAnswer: "Mary"},
    {question: "what is my favorite color?", A: "Blue", B: "Green", C: "Peach", D: "Yellow", correctAnswer: "Blue"},
    {question: "What is my cat's name?", A: "Tipper", B: "Mr Magic Pants", C: "Pooky", D: "Gracie", correctAnswer: "Gracie"}
]
var index = -1;
var correct = 0;
var incorrect = 0;
var time = 60;
var guess = "";
$(".time-display").text(time)

$(".advance-button").hide()

function countDown(){
    if (time > 0){
        time --;
    } else if (time === 0 && index < trivia.length){
        incorrect++
        alert("Out of time!")
        showNext()
    }
    $(".time-display").text(time)
}

function showNext(){
    index++
    clearInterval(countDown)
    $(".answerOption").css("background-color", "white")
    
    if (index > 2){
        $("main").hide()
        $(".results").text(`You answered ${correct} questions correctly and ${incorrect} questions incorrectly`) 
    } else {
        time = 10
        // clearInterval(countDown)
        $(".time-display").text(time)
        $(".question").text(trivia[index].question)
        $(".choiceA").text(trivia[index].A)
        $(".choiceB").text(trivia[index].B)
        $(".choiceC").text(trivia[index].C)
        $(".choiceD").text(trivia[index].D)
        setInterval(countDown, 1000) 
    }
}   

// function checkAnswer(){
//     if (guess === trivia[index].correctAnswer){
//         correct++
//         alert('You got it!')
//         time = 0;
//         showNext()
//     } else {
//         incorrect++
//         alert("Whoops, that's not it!")
//         time = 0;
//         showNext()
//     }
// }

// showNext()

$(".answerOption").click(function() {
    $(".answerOption").css("background-color", "white")
    $(this).css("background-color", "gray")
    guess = $(this).text()
    console.log(guess)
    
});


$(".start").click(function(){
    // $(this).removeClass("start")
    $(this).hide()
    showNext()
    $(".advance-button").show()
});


$(".advance-button").click(function(){
    if (guess === trivia[index].correctAnswer && time > 0 && index < trivia.length){
        correct++
        alert('You got it!')
        // clearInterval(countDown)
        showNext()
    } else if (index > trivia.length){
        $("main").hide()
        $(".results").text(`You answered ${correct} questions correctly and ${incorrect} questions incorrectly`) 
    } else {
        incorrect++
        alert("Whoops, that's not it!")
        // clearInterval(countDown)
        showNext()
    }
    console.log(correct, incorrect)
});
