console.log("Cargando juegos");

/*
 *
 * game_state, definirá los estados del juego siendo:
 *   - [0] estado inicial, juego parado
 *   - [1] estado principal, juego en ejecución
 *   - [2] estado de pausa, esperando a presionar s para iniciar o reanudar
 *   - [3] estado final, juego parado
 *
 */
var config = {
	game_canvas : undefined,
	game_ctx : undefined,
	game_background : undefined,

	game_state : 0
}

var user = {
	rightPressed : false,
	leftPressed : false,

	lives : 5,
	score : 0
}

var ball = {
	radious : 10,

	currentX : 20,
	currentY : 40,

	moveX : 10,
	moveY : -10
}

var paddle = {
	height : 10,
	width : 75,
	
	currentX : 0
}

var brick = {
	RowCount : 3,
	ColumnCount : 5,

	Width : 75,
	Height : 20,
	Padding : 10,
	OffsetTop : 30,
	OffsetLeft : 30,

	bricks : []
}

function draw_startMsg () {
	config.game_ctx.beginPath();

	config.game_ctx.rect((config.game_canvas.width / 2) - 100, 
						 (config.game_canvas.height / 2) - 50, 
						 200, 115);

	config.game_ctx.fillStyle = "black";
	config.game_ctx.fill();
	config.game_ctx.closePath();

	config.game_ctx.font = "16px Arial";
	config.game_ctx.fillStyle = "white";
	config.game_ctx.fillText("Presione 's' para empezar", 
							 (config.game_canvas.width / 2) - 94, 
							 (config.game_canvas.height / 2) - 20);

	config.game_ctx.fillText("Usar las flechas drch. e", 
							 (config.game_canvas.width / 2) - 94, 
							 (config.game_canvas.height / 2) + 20);

	config.game_ctx.fillText("izq. para el movimiento", 
							 (config.game_canvas.width / 2) - 94, 
							 (config.game_canvas.height / 2) + 40);
}

function draw_pauseMsg () {
	config.game_ctx.beginPath();

	config.game_ctx.rect((config.game_canvas.width / 2) - 100, 
						 (config.game_canvas.height / 2) - 50, 
						 200, 100);

	config.game_ctx.fillStyle = "black";
	config.game_ctx.fill();
	config.game_ctx.closePath();

	config.game_ctx.font = "16px Arial";
	config.game_ctx.fillStyle = "white";
	config.game_ctx.fillText("Presione 's' para continuar", 
							 (config.game_canvas.width / 2) - 94, 
							 (config.game_canvas.height / 2));
}

function draw_ball () {
	config.game_ctx.beginPath();
	config.game_ctx.arc(ball.currentX, ball.currentY, ball.radious, 0, Math.PI*2);
	config.game_ctx.fillStyle = "red";
	config.game_ctx.fill();
	config.game_ctx.closePath();
}

function draw_paddle () {
	config.game_ctx.beginPath();

	config.game_ctx.rect(paddle.currentX, (config.game_canvas.height - paddle.height), paddle.width, paddle.height);

	config.game_ctx.fillStyle = "#0095DD";
	config.game_ctx.fill();
	config.game_ctx.closePath();
}

function draw_bricks() {
	for(var c = 0; c < brick.ColumnCount; c++) {
		for(var r = 0; r < brick.RowCount; r++) {
			if(brick.bricks[c][r].status == 1) {
				var brickX = (c * (brick.Width + brick.Padding)) + brick.OffsetLeft;
				var brickY = (r * (brick.Height + brick.Padding)) + brick.OffsetTop;

				brick.bricks[c][r].x = brickX;
				brick.bricks[c][r].y = brickY;

				config.game_ctx.beginPath();
				config.game_ctx.rect(brickX, brickY, brick.Width, brick.Height);
				config.game_ctx.fillStyle = "#0095DD";
				config.game_ctx.fill();
				config.game_ctx.closePath();
			}
		}
	}
}

function draw_score() {
	config.game_ctx.font = "16px Arial";
	config.game_ctx.fillStyle = "#0095DD";
	config.game_ctx.fillText("Puntuación: " + user.score, 8, 20);
}

function draw_lives() {
	config.game_ctx.font = "16px Arial";
	config.game_ctx.fillStyle = "#0095DD";
	config.game_ctx.fillText("Vidas: " + user.lives, (config.game_canvas.width - 65), 20);
}

//------------------------------------------------------

function check_bricks_collisions () {
	for(var c = 0; c < brick.ColumnCount; c++) {
		for(var r = 0; r < brick.RowCount; r++) {
			var b = brick.bricks[c][r];

			if(b.status == 1) {
				if((ball.currentX > b.x) && 
					(ball.currentX < (b.x + brick.Width)) && 
					(ball.currentY > b.y) && 
					(ball.currentY < (b.y + brick.Height))) {

					ball.moveY = -ball.moveY;
					b.status = 0;
					user.score++;
					if(user.score == (brick.RowCount * brick.ColumnCount)) {
						config.game_state = 3;
						alert("¡Felicidades! Ha ganado");
						reload ();
						//document.location.reload();
					}
				}
			}
		}
	}
}

function check_wall_collisions () {
	// colisión con la pared izquierda o derecha
	if(((ball.currentX + ball.moveX) > (config.game_canvas.width - ball.radious)) || 
		((ball.currentX + ball.moveX) < ball.radious)) {

		ball.moveX = -ball.moveX;
	}

	// colisión con la pared superior
	if((ball.currentY + ball.moveY) < ball.radious) {
		ball.moveY = -ball.moveY;
	// colisión con la pared inferior
	} else if ((ball.currentY + ball.moveY) > (config.game_canvas.height - ball.radious)) {

		// colisión con la paleta de juego
		if((ball.currentX > paddle.currentX) && (ball.currentX < (paddle.currentX + paddle.width))) {
			ball.moveY = -ball.moveY;
		} else {
			user.lives--;
			if(!(user.lives)) {
				alert("Ha perdido la partida");
				reload ();
				//document.location.reload();
			} else {
				config.game_state = 2;

				config.game_ctx.clearRect(0, 0, config.game_canvas.width, config.game_canvas.height);

				ball.currentX = config.game_canvas.width / 2;
				ball.currentY = config.game_canvas.height - 30;
				ball.moveX = 2;
				ball.moveY = -2;
				paddle.currentX = (config.game_canvas.width - paddle.width) / 2;

				draw_bricks();
				draw_ball ();
				draw_paddle ();
				draw_score();
				draw_lives();
				draw_pauseMsg ();
				
				alert("Pierde una vida");
			}
		}
	}
}


//------------------------------------------------------

function keyDownHandler(e) {
	console.log("tecla: " + e.keyCode);

	if (config.game_state == 1) {
		if(e.keyCode == 39) {
			user.rightPressed = true;
		} else if(e.keyCode == 37) {
			user.leftPressed = true;
		}
	} else if (config.game_state == 2) { 
		if(e.keyCode == 83) {
			config.game_state = 1;
		}
	}
}

function keyUpHandler(e) {
	if (config.game_state == 1) {
		if(e.keyCode == 39) {
			user.rightPressed = false;
		} else if(e.keyCode == 37) {
			user.leftPressed = false;
		}
	}
}

function mouseMoveHandler(e) {
	if (config.game_state == 1) {
		var relativeX = e.clientX - config.game_canvas.offsetLeft;
		if(relativeX > 0 && relativeX < config.game_canvas.width) {
			paddle.currentX = relativeX - (paddle.width / 2);
		}
	}
}

//------------------------------------------------------

function update_tick() {
	if (config.game_state == 1) {
		//borrar el lienzo antes de dibujar cada fotograma
		config.game_ctx.clearRect(0, 0, config.game_canvas.width, config.game_canvas.height);

		draw_bricks();
		draw_ball ();
		draw_paddle ();
		draw_score();
		draw_lives();
		
		check_bricks_collisions ();
		check_wall_collisions ();
		
		//Calcular la siguiente posición de la barra
		if(user.rightPressed && (paddle.currentX < (config.game_canvas.width - paddle.width))) {
			paddle.currentX += 7;
		} else if(user.leftPressed && (paddle.currentX > 0)) {
			paddle.currentX -= 7;
		}

		//Calcular la siguiente posicion de la bola
		ball.currentX += ball.moveX;
		ball.currentY += ball.moveY;
	} else if (config.game_state == 0) {
		config.game_ctx.clearRect(0, 0, config.game_canvas.width, config.game_canvas.height);

		draw_bricks();
		draw_ball ();
		draw_paddle ();
		draw_score();
		draw_lives();
		draw_startMsg ();

		config.game_state = 2;
	}

	//TODO mejorar la tasa de refresco, eliminando la llamanda a setinterval de init()
	//requestAnimationFrame(update_tick);
}

function reload () {
	config.game_state = 0;
	user.lives = 5;
	user.score = 0;

	// Inicializar la posición de la bola
	ball.currentX = config.game_canvas.width / 2;
	ball.currentY = config.game_canvas.height - 30;

	// Inicializar la posicion de la paleta
	paddle.currentX = (config.game_canvas.width - paddle.width) / 2;

	// Inicializar la pared de ladrillos
	for(var c = 0; c < brick.ColumnCount; c++) {
		brick.bricks[c] = [];
		for(var r = 0; r < brick.RowCount; r++) {
			brick.bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}
}

function init () {
	// Acceder al objeto canvas html
	config.game_canvas = document.getElementById("gameCanvas");
	config.game_ctx = config.game_canvas.getContext("2d");

	reload ();

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	//document.addEventListener("mousemove", mouseMoveHandler, false);

	setInterval(update_tick, 50);

}


init();