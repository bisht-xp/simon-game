const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    const randomNumber =  Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text(`Level ${level}`);

}

$(".btn").click((e) => {
    const userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}


$(document).on("keydown", (e)=> {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
  