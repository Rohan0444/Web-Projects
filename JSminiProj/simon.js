let gameSeq = [];
let userSeq = [];
let level = 0;
let start = false;
let btns = ['red','yellow','blue','green'];
let score = 0;
let HighestScore = 0;

document.addEventListener("keypress", function(){
    if(start == false){
        start = true;
        levelup();
    }
});

function buttonFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function buttonFlashUser(btn){
    btn.classList.add("safe");
    setTimeout(() => {
        btn.classList.remove("safe");
    }, 300);
}

let head = document.querySelector("h3");
function levelup(){
    score = level;
    level++;
    head.innerText = `Level ${level}`;

    let randomColor = btns[Math.floor(Math.random()*4)];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomBtn);

    buttonFlash(randomBtn);
}

function btnPress(){
    buttonFlashUser(this);
    userSeq.push(this);
    if(userSeq[userSeq.length-1] == gameSeq[userSeq.length-1]){
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelup,500);
            userSeq = [];
        }
    }
    else{
        userSeq = [];
        gameSeq = [];
        start = false;
        if(score > HighestScore) HighestScore = score;
        level = 0;
        head.innerText = `Game Over. Your overall Score is ${score}, Highest Score ${HighestScore}. \n Press any key to play again`;
        let body = document.querySelector("body");
        body.classList.add("danger");
        score = 0;
        setTimeout(()=>{
            body.classList.remove("danger");
        },50);
    }
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}