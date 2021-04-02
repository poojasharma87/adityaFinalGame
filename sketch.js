var i = 400;
var points = 0;
var score = 0;

function preload(){
	//Preloading sounds and images
	title = loadImage("Title.JPG");
	tree = loadImage("tree.png");
	tree_big = loadImage("tree.png");
	play = loadImage("play.png");
	setting = loadImage("settings.png")
	credit = loadImage("credit.png");
	song = loadSound("Motivated.mp3");
	back = loadImage("back.png");
	reset = loadImage("reset.png");
	player_image = loadImage("player.png");
}

function setup() {
	//creating game space
	createCanvas(1000, 1000);

	ground = createSprite(width/2, 950, width, 30);
	ground.shapeColor = "white";

	//resizing images to liking
	tree.resize(75, 150);
	tree_big.resize(125, 250);
	play.resize(100, 100);
	setting.resize(80, 80);
	credit.resize(160, 80);
	back.resize(100, 100);
	reset.resize(100, 100);
	player_image.resize(40, 40);

	//creating sprites for button and adding images for the buttons
	credit_button = createSprite(60, 30, 160, 80);
	credit_button.addImage(credit);
	back_button = createSprite(930, 70, 200, 100);
	back_button.addImage(back);
	play_button = createSprite(500, 680, 299, 291);
	play_button.addImage(play);
	setting_button = createSprite(960, 45, 80, 80);
	setting_button.addImage(setting);
	
	//making button invisible as it is not required right now
	back_button.visible = false;

	//createing game states
	gameState = 'home';

	//playing background sound
	song.play();
}

function draw() {
	//checking wether the player is at home or any other page
	if(gameState === 'home'){	

	//assigning colour to text and background	
	background("yellow");
	fill("white");

	//title
	image(title, 90, 70);

	//trees on the ground
	image(tree, 800, 805);
	image(tree_big, 850, 710);
	image(tree, 130, 805);
	image(tree_big, 30, 710);

	//player 
	circle(500, 850, 50);

	//"moving" block
	rect(0, 550, 400, 40);
	rect(600, 550, 400, 40);
	rect(0, 300, 400, 40);
	rect(600, 300, 400, 40);

	}

	// checking wether the user clicked on the credit button
	if(mousePressedOver(credit_button)){
		gameState = 'credit';
		back_button.visible = true;
		credit_button.visible = false;
		play_button.visible = false;
		setting_button.visible = false;
		CreditsPage();
	}

	//checking wether the user clicked to go back to the home page
	if(mousePressedOver(back_button)){
		gameState = 'home';
		credit_button.visible = true;
		back_button.visible = false;
		play_button.visible = true
		setting_button.visible = true;
	}

	//checking wether the user clicked on the play button.
	if(mousePressedOver(play_button)){
		gameState = "playing"; 
		credit_button.visible = false;
		play_button.visible = false;
		setting_button.visible = false;
		player = createSprite(500, 600, 40, 40);
		player.addImage(player_image);
		reset_button = createSprite(500, 700);
		reset_button.addImage(reset);
		reset_button.visible = false;
	
		wallArray = [];
	
		for(var g = 0; g < 100; g++){		
		wallArray[g] = new WallPair(760, i, 235, i, player);
		i -= 250;
		}
	}

	if(gameState === "playing" || gameState==="gameover"){
		playing();

		//textSize(40);
		//text("Points: " + points, 800, player.y - 100);

	}

	drawSprites();
}

// creating custom function to display the page for credits if user wishes to see
function CreditsPage(){

		//assigning colours to text and background
		background(0, 255, 255);
		fill("white");

		//creating white borders to give good finish
		rect(0, 0, 1000, 20);
		rect(0, 0, 20, 1000);
		rect(0, 980, 1000, 20);
		rect(980, 0, 20, 1000);
		fill(255, 69, 0);

		//writing text for credits
		textSize(32);
		text("CREDITS:", 100, 100);
		textSize(28);
		text("Game Design", 100, 170);
		textSize(24);
		text("Aditya Bansal", 100, 220);
		text("Flicker Gaming", 100, 270);
		textSize(28);
		text("Music", 100, 340);
		textSize(24);
		text("Motivated", 100, 390);
		text("Dl Sounds", 100, 440);
		text("mixkit.co", 100, 490);
}

function keyPressed(){
	if(keyCode === 32 && gameState === "playing"){
		player.velocityY = -15;
		
	}
}

function playing(){

	rectMode(CENTER);
	background("blue");

	for(var g = 0; g < 100; g++){	
		//console.log(g);	
		if(wallArray[g].y > player.y){
			//console.log("hell0");
		}
	}
 
	player.velocityY += 1.1;
	player.collide(ground);
	score=Math.round(-(player.y/100));
	if (score>0) {
		textSize(30);
	text('Score:' + score, 800, player.y- 300);
	} 
	else{
		textSize(30);
		text('Score:' + 0, 800, player.y- 300);	
	}
	
	
	//console.log(player.y);
    
	  if(gameState === "playing"){
	  for(var y = 0; y < wallArray.length; y++){
		  rand = Math.round(random(1, 10));
		  wallArray[y].move(rand);
		  wallArray[y].Check();
		 // console.log(player.velocityY);
		  if(wallArray[y].Check() === true ||player.velocityY<-15 ){
			  //console.log("checked")
			  gameState = "gameover";
		  }
	  }
  }
  
	  if(gameState === "gameover"){
		  for(var y = 0; y < wallArray.length; y++){
			  wallArray[y].stop();
		  }
		  reset_button.visible = true;
		  if(mousePressedOver(reset_button)){
			gameState = 'playing';
			reset_button.visible = false;
		}
	  }
  
	  camera.position.y = player.y - 300;
	  drawSprites();
  
}


