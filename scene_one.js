/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


goog.provide('hockey.SceneOne');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.ScaleTo'); 
goog.require('lime.Label');
goog.require('lime.GlossyButton');
goog.require('lime.animation.FadeTo')

goog.require('hockey.PlayArea');
goog.require('hockey.Goalie');
goog.require('hockey.Striker');
goog.require('hockey.Ball');
goog.require('hockey.TriangleShape');
goog.require('hockey.NumberButtons');
goog.require('hockey.Notice');
goog.require('hockey.Timer');
goog.require('lime.scheduleManager');



var striker;
var score;

var p1 = 285;
var p2 = 200;
var p3 = 490;
var p4 = 276;
var p5 = 490;
var p6 = 550;

var number = 0;
var num = 0;
var point = 0;

var triangle;
var notice;
var isGoal;

hockey.SceneOne = function() 
{

    
    goog.base(this);
    
    
    
    this.groundLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    
    
    var playArea = new hockey.PlayArea();
    this.groundLayer.appendChild(playArea);
    
    var goalie = new hockey.Goalie();
    this.groundLayer.appendChild(goalie);
    
    striker = new hockey.Striker(485,495);
    this.groundLayer.appendChild(striker);
    
    var ball = new hockey.Ball();
    this.groundLayer.appendChild(ball);
    
   triangle = new hockey.TriangleShape(p1,p2,p3,p4,p5,p6);
   this.groundLayer.appendChild(triangle);

   var numbers = new hockey.NumberButtons();
   this.groundLayer.appendChild(numbers);   

    

    /*var resetBtn = new lime.GlossyButton('Reset').setSize(150, 38).setPosition(650,600).setRenderer(lime.Renderer.CANVAS);
    this.groundLayer.appendChild(resetBtn);*/

    notice = new hockey.Notice().setPosition(300, 400).setHidden(true);
    this.groundLayer.appendChild(notice);

    var angle_one = triangle.giveAngle(p3,p4,p5,p6);  
    var angle_two =     triangle.giveAngle(p1,p2,p5,p6);
    triangle.setAngleText_1(angle_one);

    triangle.setAngleText_2(angle_two);
    triangle.setAngleText_3("?");
    triangle.setAngleText_4("?");

    this.timer = new hockey.Timer();
    this.groundLayer.appendChild(this.timer);

    this.appendChild(this.groundLayer);
    
    //add Listener

    goog.events.listen(numbers.one,[ 'touchstart','mousedown' ] , onOneClick);
   goog.events.listen(numbers.two,[ 'touchstart','mousedown' ] , onTwoClick);
   goog.events.listen(numbers.three,[ 'touchstart','mousedown' ] , onThreeClick);
   goog.events.listen(numbers.four,[ 'touchstart','mousedown' ] , onFourClick);
   goog.events.listen(numbers.five,[ 'touchstart','mousedown' ] , onFiveClick);
   goog.events.listen(numbers.six,[ 'touchstart','mousedown' ] , onSixClick);
   goog.events.listen(numbers.seven,[ 'touchstart','mousedown' ] , onSevenClick);
   goog.events.listen(numbers.eight,[ 'touchstart','mousedown' ] , onEightClick);
   goog.events.listen(numbers.nine,[ 'touchstart','mousedown' ] , onNineClick);
   goog.events.listen(numbers.zero,[ 'touchstart','mousedown' ] , onZeroClick);
   goog.events.listen(numbers.undo,[ 'touchstart','mousedown' ] , resetText);
   goog.events.listen(numbers.enter,[ 'touchstart','mousedown' ] , moveToPosition);

   //goog.events.listen(resetBtn,[ 'touchstart','mousedown' ] , resetScene);
   //goog.events.listenOnce(this, ['touchstart', 'mousedown'], resetScene, false, this);

   addListener();

      
}
goog.inherits(hockey.SceneOne, lime.Scene) ;

function addListener()
{
       goog.events.listen(striker, [ 'touchstart','mousedown' ] , moveToPosition);
      // hockey.Timer.startTimer();
}



function removeListener()
{
    goog.events.unlisten(striker, [ 'touchstart','mousedown' ] , moveToPosition);
    notice.setOpacity(1); 
    notice.setHidden(false);      

      if(isGoal == false)
      {
        notice.title.setText("Wrong Answer ! Try Again")
      }
      else
      {
        notice.title.setText("That's a Goal!!! ")
      }

     notice.score.setText("Score : " + point)
      
   
    var show = new lime.animation.FadeTo(0).setDuration(2);
    goog.events.listen(show,lime.animation.Event.STOP,function(){
    addListener();
})
    notice.runAction(show);

    
     resetScene();
}

function moveToPosition()
{
    hockey.Timer.sethide();
    calculatePoints();
    runAnimation();
}

function calculatePoints()
{
   if(triangle.getAngleText_3() == 3&& triangle.getAngleText_4() == 0)
    {
        num = 285;
        isGoal = true;
        point++;
    }
    else
    {
        num = triangle.giveAngle(p5,p6,triangle.getAngleText_3(),triangle.getAngleText_4());  
        num  = 495;
        isGoal = false;
        
    }

}

function  runAnimation()
{

    var anim = new lime.animation.Spawn(
                                            new lime.animation.MoveTo(num,200).setDuration(1),
                                            new lime.animation.ScaleTo(0.5).setDuration(1),
                                            new lime.animation.RotateBy(1000).setDuration(1)
              
                                        )
    goog.events.listen(anim, lime.animation.Event.STOP, removeListener);

     
      ball.runAction(anim);

      


}

function updateText()
{
    if(bool)
    {
       triangle.updateAngleText_4(number);
        
    }
    else
    {
       triangle.updateAngleText_3(number);
    }
    bool = !bool
}

function onOneClick()
{
    number = 1;
   updateText();
}
function onTwoClick()
{
    number = 2;
    updateText();
}
function onThreeClick()
{
    number = 3;
    updateText();
}
function onFourClick()
{
    number = 4;
    updateText();
}
function onFiveClick()
{
    number = 5;
    updateText();
}
function onSixClick()
{
    number = 6;
    updateText();
}
function onSevenClick()
{
    number = 7;
    updateText();
}
function onEightClick()
{
    number = 8;
    updateText();
}
function onNineClick()
{
    number = 9;
    updateText();
}
function onZeroClick()
{
    number = 0;
    updateText();
}
var bool = false;


function resetText()
{
    bool = false;
    triangle.updateAngleText_4("?");
    triangle.updateAngleText_3("?");

}

function resetScene()
{
   // stopStrikeAudio();
    //stopClapAudio();
    ball.setPosition(508,550);
    ball.setScale(1);
    resetText();
   // addListener();
    isGoal = false;
}

hockey.SceneOne.showNotice = function()
{
  removeListener();
  notice.setOpacity(1); 
  notice.setHidden(false);       
  notice.title.setText("Timer Over ! Try Again!!");

  var show = new lime.animation.FadeTo(0).setDuration(2);
    goog.events.listen(show,lime.animation.Event.STOP,function(){
    addListener();
          
})

}


    


