var gamepattern=[];
var userclickedpattern=[];
var buttoncolors=["red","blue","green","yellow"];
var level=0;
var started=false;
 
 $(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level - " + level);
    nextsequence();
    started=true;
  }
 });

$(".btn").click(function (){
    var userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
     console.log(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userclickedpattern.length-1);
  });

  function playsound(name){
    var audio=new Audio("sounds/"+ name + ".mp3");
    audio.play();
  }

function nextsequence() {
  userclickedpattern=[];
  level=level+1;
  $("#level-title").text("Level - " + level);

  var randomnumber= Math.floor(Math.random()*4);
  var randomChosenColor=buttoncolors[randomnumber];
  gamepattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  

 };
 
 function animatepress(currentcolor){

  $("#" + currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentcolor).removeClass("pressed");
  },100);
 }

 function checkanswer(currentlevel) {
  if(gamepattern[currentlevel]==userclickedpattern[currentlevel]){
    console.log("success");
    if(userclickedpattern.length==gamepattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }
  }
  else{
    // var cs =new Audio("sounds/wrong.mp3");
    // cs.play();
    playsound("wrong");
    console.log("failed");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any key to restart");
   
      startover();
   
  }
 }
 function startover(){
  started=false;
  level=0;
  gamepattern=[];
 }
 
