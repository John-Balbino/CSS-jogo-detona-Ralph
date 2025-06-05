
const state ={ 
    view: {
        squares: document.querySelectorAll(".square"),
        enemy:  document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")   
    },
    values: {
        timerId:null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
        
    },
    actions: {
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000),
    }
};


function playSound(){
    let audio = new Audio("./src/songs/src_audios_hit.m4a")
    audio.volume = 0.4;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
        alert("Tempo acabou ! seu resultado foi: "+state.values.result);
    }
}
 
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
//function moveEnemy(){
    //state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)

//}

function addListenerHitBox() {
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",() => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
              
            }
            else{
                state.values.currentLives--;
                state.view.lives.textContent = state.values.currentLives;
                checkgameOver();
            }
        }); 

    }); 
}
function checkgameOver(){
    if (state.values.currentLives <=0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over! Sua pontuação foi : '+state.values.result);
    }
}

function init() {
    //moveEnemy();
    randomSquare();
    addListenerHitBox();
    state.view.lives.textContent = state.values.currentLives;
}

init();