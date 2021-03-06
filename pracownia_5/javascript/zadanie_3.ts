$( function() {

var locked: string = "rgb(76, 130, 153)";
var pickedUp: string = "rgb(204, 27, 43)";
var released: string = "rgb(25, 255, 200)";
var finish: string = "rgb(173,255,47)";
var start: string = "rgb(25,0,200)";

var time: number = 0;
var t: any;
var timerIsOn: boolean = false;

var newGame: boolean = true;
var count: number = 0;

var pickUps: any[] = [];
var count: number = 0;
var scores: number = 0;

$("#startSquare")
.mouseenter(function(){
	centerEnter();
})
.mouseout(function (){
	if (newGame){
		newGame = false;
		shuffle();
		releasePickUps();
	}
	startCount();
})

function timedCount(){
	$("#currentTime").html(time.toFixed(2));
	time = time + 0.01;
	t = setTimeout(function(){ timedCount()}, 10);
}
function startCount(){
	if(!timerIsOn){
		timerIsOn = true;
		timedCount();
	}
}
function stopCount(){
	clearTimeout(t);
	timerIsOn = false;
}

function randomize(min: number, max: number): string {
 	return String(Math.floor(Math.random() * (max - min)) + min) + "px";
}

function centerEnter(){
	stopCount();
	$("#startSquare").css("background-color", start);
	if (count == 3){
		stopCount();
		saveScore();
		resetGame();
		return;
	}
	releasePickUps();
}

function releasePickUps(){
	for (var i = 0; i < pickUps.length; i++){
		if (pickUps[i].css("background-color") != pickedUp){
			pickUps[i].css("background-color", released);
		}
	}
}

function shuffle(){
	newPickUp(0, 270, 0, 95);
	newPickUp(300, 570, 0, 95);
	newPickUp(0, 125, 125, 390);
	//newPickUp(125, 320, 125, 220);
	//newPickUp(350, 445, 125, 295);
	//newPickUp(475, 570, 125, 390);
	//newPickUp(0, 95, 413, 570);
	//newPickUp(125, 220, 250, 445);
	//newPickUp(250, 445, 350, 445);
	//newPickUp(125, 445, 475, 570);
	//newPickUp(475, 570, 413, 570);
}

function newPickUp(minLeft: number, maxLeft: number, minTop: number, maxTop: number) {
	var pickUp = $("<div>");
	pickUp.addClass("pickUpSquare");
	pickUp.css("left", randomize(minLeft, maxLeft));
	pickUp.css("top", randomize(minTop, maxTop));
	pickUp.mouseover(function(){
		getPickUp(pickUp);
	})
	$("#playGround").append(pickUp);
	pickUps.push(pickUp);
}

function getPickUp(pick: any){
	if (pick.css("background-color") == pickedUp){
		$("#currentTime").css("color", "red");
		time = time + 0.01;
		setTimeout(function(){
			$("#currentTime").css("color", "white");
		}, 500);
	}
	if (pick.css("background-color") == released){
		pick.css("background-color", pickedUp);
		lockPickups();
		$("#startSquare").css("background-color", finish);
		count++;
	}
}

function lockPickups(){
	for (var i = 0; i < pickUps.length; i++){
		if (pickUps[i].css("background-color") != pickedUp){
			pickUps[i].css("background-color", locked);
		}
	}
}

function saveScore(){
	var newScore: any = $("<li>");
	newScore.html((time - 0.01).toFixed(2));
	$("#scores").append(newScore);
}

function resetGame(){
	count = 0;
	time = 0;
	timerIsOn = false;
	newGame = true;
	deletePickUps();
}

function deletePickUps(){
	var length = pickUps.length;
	for (var i = 0; i < length; i++){
		pickUps[i].remove();
	}
}
});