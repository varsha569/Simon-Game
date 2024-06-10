
var UserClickedPattern=[];
var gamePattern =[];
var buttonColours=["red","blue","green","yellow"];

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
    UserClickedPattern.push(userChosenColour);
    console.log(UserClickedPattern);
    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(UserClickedPattern.lastIndexOf(userChosenColour));
});         

function nextSequence()
{
UserClickedPattern=[];
$("#level-title").text("Level " + level);
level = level + 1;
var randomNumber = Math.random();
randomNumber=randomNumber*4;
randomNumber=Math.floor(randomNumber);


var randomChosenColor = buttonColours[randomNumber];
gamePattern.push(randomChosenColor);

$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

PlaySound(randomChosenColor);

}


function PlaySound(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
var started = false;
$(document).keydown(function()
{
   level = 0;
   if(!started){
    started = true;
     nextSequence();
   }
}); 
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === UserClickedPattern[currentLevel]){
        var  count = 0;
        for(var i=0;i<gamePattern.length;i++){
        if(gamePattern[i] === UserClickedPattern[i]){
            count++;
        }}
        if(count === gamePattern.length){
                console.log("success");
                setTimeout(function(){
                nextSequence();
                },1000);
                }
    }
    else{
        console.log("wrong");
        var  wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            },200);
        $("h1").text("GameOver,Press Any Key to Restart"); 
        startOver();   
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    UserClickedPattern = [];
    started = false;
}

