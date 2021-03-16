var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
const title = $("h1");

$(".btn").click(function(){
    var userChosenColour = this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(e){
    if(!gameStarted){
        gameStarted = true;
        title.text("Level 0");
        nextSequence();
    }
});

function nextSequence(){
    level++;
    title.text("Level "+level);
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    var button = $("."+currentColour);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern[currentLevel], gamePattern[currentLevel]);
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == level-1){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        gameOver();        
    }
}

function gameOver(){
    playSound("wrong");
    userClickedPattern = [];
        
    var body = $("body");
    body.addClass("game-over");
    setTimeout(function(){
        body.removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}