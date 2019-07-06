//access to every square containing the back and front of every card
const cards = document.querySelectorAll(".square");
//indicating if card is flipped or not
let hasFlipped = false;
//pause flag boolean to indicate when to lock the board from flipping
let pause = false;
//indicating which cards are selected in order to test matching
let firstCard, secondCard;
//selecting the buttons
let newGame = document.querySelector("#newGame");
let solve = document.querySelector("#solve");
//indicating the first move for timer to start
let gameStart = false;
//number of flipped cards to indicate the end of the game and timer stopper
var cardsFlipped = 0;
//indicating the header to change it to welldone after game ends
let congs = document.querySelector("#done");
//timer settings
var second = minute = hour = 0;
var timer = document.querySelector("#timer");
timer.innerHTML = "0" + hour + ":" + "0" + minute + ":" + "0" + second;
let interval;

//event listener to indicates if a card is clicked to be flipped if valid
cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard(){
	//board is locked unvalid to flip a card
	if (pause) {
		return;
	}
	//board is locked unvalid to flip the same card twice
	if (this === firstCard){
		return;
	}
	//start timer after first click
	if (!gameStart){
		startTimer();
		gameStart = true;
	}
	//adding flip class to flip the card and indicate it is flipped
	this.classList.add('flip');
	//indicated it is first or second card to check for matching
	if (!hasFlipped){
		hasFlipped = true;
		firstCard = this;
	}
	else {
		secondCard = this;
		matching();
	}
}

function matching(){
	//valid matching
	if (firstCard.dataset.name === secondCard.dataset.name){
			firstCard.removeEventListener("click", flipCard);
			secondCard.removeEventListener("click", flipCard);
			hasFlipped = false;
			pause = false;
			firstCard = null;
			secondCard = null;
			cardsFlipped++;
	}
	//unmatch
	else {
		pause = true;
		// 600 ms timeout between viewing and flipping back the card
		setTimeout (() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		hasFlipped = false;
		pause = false;
		firstCard = null;
		secondCard = null;
		}, 600);
	}
	//to indicate if game ended
	if (cardsFlipped == 18){
		//stop the timer
		clearInterval(interval);
		congs.textContent = "Well Done!";
		congs.style.background = "rgb(230, 0, 20)";
		timer.style.color = "rgb(230, 0, 20)";
	}
}

function startTimer(){
	//interval every 1 second to update the timer
	interval = setInterval (function (){
		second++;
		if (second == 60){
			minute++;
			second = 0;
		}
		if (minute == 60){
			hour++;
			minute = 0;
		}
		//proper looking timer view
		if (hour < 10 && minute < 10 && second < 10){
			timer.innerHTML = "0" + hour + ":" + "0" + minute + ":" + "0" + second;
		}
		else if (hour < 10 && minute < 10){
			timer.innerHTML = "0" + hour + ":" + "0" + minute + ":" + second;
		}
		else if (second < 10 && minute < 10){
			timer.innerHTML = hour + ":" + "0" + minute + ":" + "0" + second;
		}
		else if (hour < 10 && second < 10){
			timer.innerHTML = "0" + hour + ":" + minute + ":" + "0" + second;
		}
		else if (hour < 10){
			timer.innerHTML = "0" + hour + ":" + minute + ":" + second;
		}
		else if (minute < 10){
			timer.innerHTML = hour + ":" + "0" + minute + ":" + second;
		}
		else if (second < 10){
			timer.innerHTML = hour + ":" + minute + ":" + "0" + second;
		}
		else {
			timer.innerHTML = hour + ":" + minute + ":" + second;

		}
	},1000);
}

//shuffling the card and also first function to take place immediatly when the page opens
//shuffling by assigning every card a random number from 0 to 35 then arranging them in ascending order	
(function shuffle(){
	cards.forEach(card => {
		let random = Math.floor(Math.random() * 36);
		card.style.order = random;
	});
})();

function shuffle(){
	cards.forEach(card => {
		let random = Math.floor(Math.random() * 36);
		card.style.order = random;
	});
}

//listener to the click on new game button
newGame.addEventListener("click", reset);

//reset the board if new game is clicked
function reset(){
	//card is toggled unflipped 
	cards.forEach(card => card.classList.remove('flip'));
	//start again from the beginning
	cards.forEach(card => card.addEventListener("click", flipCard));
	//reset timer
	second = minute = hour = 0;
	timer.innerHTML = "0" + hour + ":" + "0" + minute + ":" + "0" + second;
	clearInterval(interval);
	congs.textContent = "MEMORY GAME";
	congs.style.background = "steelblue";
	timer.style.color = "black";
	gameStart = false;
	hasFlipped = false;
	pause = false;
	firstCard = null;
	secondCard = null;
	cardsFlipped = 0;
	//shuffle after 0.5s so it waits for cards to be unflipped first
	setTimeout (() => {
		shuffle();
	}, 500);
}

//solve button
solve.addEventListener("click", finish);

//flip all cards
function finish(){
	cards.forEach(card => card.classList.add('flip'));
	clearInterval(interval);
	hasFlipped = true;
	pause = true;
	firstCard = null;
	secondCard = null;
	cardsFlipped = 18;
	congs.style.background = "rgb(230, 0, 20)";
	timer.style.color = "rgb(230, 0, 20)";
}