var buttonColors=["red","blue","yellow","green"];

var userClickedPattern=[];
var gamePattern= [];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
    $("h1").text("Level 1");
    nextSequence();
    started=true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChoosen= buttonColors[randomNumber];
    gamePattern.push(randomColorChoosen);


    $("#" + randomColorChoosen).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);    

    playSound(randomColorChoosen);

    $("h1").text("Level " + level);
    level+=1;

}



$(".squares").click(function(){
    var userChosenColor =$(this).attr("id");

    // this will give which color is clicked and attr will give its id

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);

    animatePressed(userChosenColor);

    checkAnswer((userClickedPattern.length -1));

});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}







function playSound(name){
    var audio=new Audio(name + ".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}