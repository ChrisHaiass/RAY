/*
 * Game state list:
 *  - [0]: Splash screen state
 *  - [1]: Menu screen state
 *  - [2]: Game play state
 *  - [3]: Game in pause state
 *
 *
 * https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D
 */

var game_engine = {
    canvas : null,
    context : null,
    loaded : false,
    currentState : 0
}



var game_config = {
    // Internal strings
    title : "Jumping",
    
    // Colors
    backColorDef : "black",
    fontColorDef : "white",
    
    headerBackColor : "blue",
    headerFontColor : "white",
    FooterBackColor : "magenta",
    FooterFontColor : "black",
    
    // Fonts
    fontDef : "16px Arial",
    
    // Input keys
    startContinueKey : 83, // Key S
    actionKey : 32, // Space
    
    arrowUpKey : 38, 
    arrowDownKey : 40,   
    arrowLeftKey : 37,
    arrowRightKey : 39,
    
}


function loadGameEngine () {
    if (game_engine.canvas == null) {
        game_engine.canvas = document.getElementById("gameCanvas");
    }
    
    if ((game_engine.canvas != null) && (game_engine.context == null)) {
        game_engine.context = game_engine.canvas.getContext("2d");
    }
    
    if (!game_engine.loaded) {
        
        document.addEventListener('keydown', function(event) {
            captureGameIputs (event);
        });
        
        setInterval(updateGame, 10);
        game_engine.loaded = true;
    }
    
    //game_engine.currentState = 1;
    
    console.log("juego cargado");
}

function captureGameIputs (event) {
    switch(game_engine.currentState) {
            case 0:
            splashScreenInputs (event)
            break;
        case 1:
            //console.log("sin definir");
            break;
        default:
            //console.log("sin definir");
            break;
    }
}

function drawGameScene () {
    game_engine.context.clearRect(0, 
                                  0, 
                                  game_engine.canvas.width,
                                  game_engine.canvas.height);
    
    switch(game_engine.currentState) {
        case 0:
            splashScreen ();
            break;
        case 1:
            initScreen ();
            break;
        case 2:
            pauseScreen ();
            break;
        default:
            //console.log("sin definir");
            break;
    }
}

function calculateNextGameState () {
    switch(game_engine.currentState) {
            case 0:
            //console.log("sin definir");
            break;
        case 1:
            //console.log("sin definir");
            break;
        default:
            //console.log("sin definir");
            break;
    }
}

//----------------------------------------
//========================================
//----------------------------------------

function initGame () {
    loadGameEngine (); 
}

function updateGame () {
    //captureGameIputs ();
    drawGameScene ();
    calculateNextGameState();
}

// Splash Screen state functions

function splashScreen () {
    drawHeaderComponent ();
    drawDescriptionComponent ("César Manrique Dev presenta...");
    drawFooterComponent ();
}

function initScreen () {
    drawHeaderComponent ();
    drawDescriptionComponent ("Recorre el camino hasta que no puedas más...");
    drawFooterComponent ();
}

function pauseScreen () {
    drawHeaderComponent ();
    drawDescriptionComponent ("juego en estado de pausa");
    drawFooterComponent ();
}

function splashScreenInputs (event) {
    if(event.keyCode == 83) { //key S: 83
        //alert('S key was pressed');
        game_engine.currentState = 1;
        
    }
}

// Common draw functions

function drawHeaderComponent () {
    drawPanel(25, 10, 420, 20, game_config.headerBackColor);
    drawText(205, 25, game_config.title);
}

function drawDescriptionComponent (description) {
    drawPanel(25, 40, 420, 230);
    drawText(30, 60, description);
}

function drawFooterComponent () {
    drawPanel(25, 
              282, 
              420, 
              26, 
              game_config.FooterBackColor);
    
    drawText(30, 
             300, 
             "Presiona 's' para continuar",
             game_config.FooterFontColor);
}

function drawPanel(posx, posy, 
                   width, height, 
                   colorIN=(game_config.backColorDef)) {
    
    game_engine.context.fillStyle = colorIN;
	game_engine.context.fillRect(posx, posy, width, height);
}

function drawText (posx, posy, 
                   text, 
                   colorIN=(game_config.fontColorDef)) {
    
    game_engine.context.fillStyle = colorIN;
	game_engine.context.font = game_config.fontDef;
    game_engine.context.fillText(text, posx, posy);
}