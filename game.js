let gamePattern = [];
var userClickedPattern = [];
let started = false;
let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        started = true;
        newSequence();
    }

})

function newSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    let sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makesound(randomChosenColour);
}

$(".btn").click(function handle() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makesound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            console.log("success")
            setTimeout(function () {
                newSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong")

        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function makesound(key) {
    let sound = new Audio("sounds/" + key + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}




