var game_canvas;
var game_context;
var game_loaded = false;
var title = "Flappy Bird";
var title2 ="Recorre el camino hasta que no puedas más...";
var title3 ="Presiona 's' para continuar";
var backgroundColor = "black";
var currentPanel = 0;
var fontcolor = "white";
var myGamePiece;
var myObstacles = [];
var myScore;

function initGame () {
    
    game_canvas = document.getElementById("gameCanvas");
    game_context = game_canvas.getContext("2d");
  
     
    if (!game_loaded) {
        
    document.addEventListener('keydown', function (event) {
        captureGameInputs (event);
    });
        
        setInterval(updateGame, 10);
        game_loaded = true;
    }
   
    console.log("juego cargado");
    
}

function restart () {

}
function captureGameInputs(event){
    
switch( currentPanel)    
   {
    case 0 :
           splashScreenInputs(event); 
       break;  
    case 1 : 
           initScreenInputs(event);
        break;   
    case 2 :
           pauseScreenInputs(event);
        break; 
     case 3:
           gameScreenInputs (event);
         break;
     case 4 : 
           helpScreenInputs (event);
        break;
    case 5 :   
           creditsScreenInputs (event);
   }

}                   

function updateGame () {
    
  game_context.clearRect(0, 0, game_canvas.width, game_canvas.height); 

    switch (currentPanel) {
        case 0:
            splashScreen ();
            break;
        case 1:
            Inicio ();
            break;
        case 2 :
            Pausa ();
            break;
        case 3 :
            gameScreen ();
            break;
        case 4 : 
            helpScreen ();
            break;
        case 5 :
            creditsScreen ();
           
    }
}

function drawHeaderComponent () { //Dibujar componente de cabecera
       
   drawPanel (10, 10, 1000, 20);
   drawText (205, 25, title);    
}

function drawDescriptionComponent (description) {             
        
drawPanel (10,35,1000,250);
drawText (15, 50, description);    
    
}

function drawFooterComponent ( ) {
    
 drawPanel (10,300,500,20);
 drawText (15,315,title3);
    
}

function drawPanel ( posx, posy, width, height, color) { //Dentro de esta función pintar un panel
 
 	game_context.fillStyle = backgroundColor;

 	game_context.fillRect( posx, posy, width, height); 
  
}

function drawText (posx, posy, text ) {
    
    game_context.fillStyle = fontcolor;
    
    game_context.font = "16px Arial";
    
    game_context.fillText(text, posx, posy);
    
}


//Dos funciones splashScreen uno de inicio y otro de pausa

function splashScreen ( ) { //Mostramos panel 

   drawHeaderComponent ();
   drawDescriptionComponent ("Recorre el camino hasta que no puedas más...");
   drawFooterComponent ("Presiona 's' para continuar");
}

function Inicio ( ) {
  
    drawHeaderComponent ();
    //drawDescriptionComponent ("1-Empezar 2-Ayuda 3-Créditos");
    drawPanel (25,40, 420, 230);
    drawText (30, 60,"1 - Empezar");
    drawText (30,80,"2 - Ayuda");
    drawText (30 ,100,"3 - Créditos")
}
function Pausa ( ) {   
    drawHeaderComponent ();
    drawDescriptionComponent ("Juego pausado. No seas un AFK");
    drawFooterComponent ("Presiona 's' para continuar");
}


function helpScreen ( ) {
   drawHeaderComponent ();
   drawDescriptionComponent ("No hay ayuda para ti");
   drawFooterComponent (""); 
}

function creditsScreen ( ) {
    
    
   drawHeaderComponent ();
   drawDescriptionComponent ("Autor: Christian Macias CGI");
   drawFooterComponent ("");
}

function gameScreen ( ) {
    
    
   drawHeaderComponent ();
   drawDescriptionComponent ("");


 } 



function splashScreenInputs (event) {
    
   if(event.keyCode == 83) {  
       
         currentPanel = 1;   
      }
       
   }
   
    function initScreenInputs (event) {
    
    if(event.keyCode == 83)  {
        
        currentPanel = 2;
    }  
        
        
        
   if(event.keyCode == 49) {  
      
         currentPanel = 3;
         
   
}
    if (event.keyCode == 50) {
        
        currentPanel =4;


    }
        
     if (event.keyCode == 51) {
        
        currentPanel =5;    
     }
 }
      
function pauseScreenInputs (event) {
    
   if(event.keyCode == 83) {  
     
         currentPanel = 4;  
      }
          if(event.keyCode == 27) {
          currentPanel = 3;
        } 
   }

  
 
 function gameScreenInputs (event) {

  if(event.keyCode == 83) {  
     
         currentPanel = 2;  
      
      }
      if(event.keyCode == 27) {  
     
         currentPanel = 2;
 } 
  
}
 function helpScreenInputs (event) {

  //if(event.keyCode == 83) {  
      
         //currentPanel = 5;  
      
      //}
}
 function creditsScreenInputs (event) {

  if(event.keyCode == 83) {  
        
         currentPanel = 0;  
       
      }
         
   }

