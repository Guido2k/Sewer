// VARS SETUP //

const score = document.querySelector(".score");
// const level = document.querySelector(".level");
const startScreen = document.querySelector(".startScreen");
const bod = document.querySelector(".bod");



const gameArea = document.querySelector(".gameArea");
let player = {
    speed:5,
    score:0,
    level:1
    };
    gameArea.classList.add("hide");             /////
let keys = {ArrowUp:false, ArrowDown:false, ArrowRight:false, ArrowLeft:false};

startScreen.addEventListener("click", start);
  
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);


// MOVE WAVES //

function moveWaves() {
    let waves = document.querySelectorAll(".wave");
    waves.forEach(function(item){
        if(item.y > 1500){
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
        
    })
}

// COLLISION DETECTION //

function isCollide(a, b) {
let aRect = a.getBoundingClientRect();
let bRect = b.getBoundingClientRect();

return !(
    (aRect.bottom < bRect.top) ||
    (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) ||
    (aRect.left > bRect.right)
)

}

//MOVE ENEMY//

function moveEnemy(car) {
    let enemys = document.querySelectorAll(".enemy");
    
    enemys.forEach(function(item){
        if(isCollide(car, item)){
            console.log("HIT");

            endGame();
        }

        if(item.y > 1500){
            item.y = -1000;
            item.style.left = Math.floor(Math.random()*345) + "px"; 
        }

        if(player.score > 1500) {
            item.classList.add("enemy2");
                                  
        }

        if(player.score > 3000) {
            item.classList.remove("enemy2");
            item.classList.add("enemy3");
            
        }    

        if(player.score > 5000) {
            item.classList.remove("enemy3");
            item.classList.add("enemy4");
            
        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

// ALTERNATE ENEMY 

function moveEnemy2(car) {
    let enemys2 = document.querySelectorAll(".enemy2");
            
    enemys2.forEach(function(item){
        if(isCollide(car, item)){
            console.log("HIT");
            endGame();
        }

        if(item.y > 1500){
            item.y = -1000;
            item.style.left = Math.floor(Math.random()*330) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

        
    })
}




// MAIN GAMEPLAY //

function playGame() {
    
    console.log("inplay");
    
    let car = document.querySelector(".car");
    //car.classList.add("rotate");        *works for continuously rotating player
    moveWaves();
    moveEnemy(car);
   
    let road = gameArea.getBoundingClientRect();

        if(player.start) {
            
            if(keys.ArrowUp && player.y > road.top){ player.y -= player.speed;}
            if(keys.ArrowDown && player.y < road.bottom){ player.y += player.speed;}
            if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed;}
            if(keys.ArrowRight && player.x < (road.width -100)){ player.x += player.speed;}// change x to "width"
            
            // -40 for 15inch laptop
            // -120 for 17inch laptop
            // -200 for large screen QHD 
            
            car.style.left = player.x + "px";
            car.style.top = player.y + "px";

            if (player.score > 1500) {
                player.level = 2;
                //sound2 = new sound("./sound/levelup.mp3");   level up sound, stalls game
                //sound2.play();
                //sound2.pause();

            }

            if (player.score >3000) {
                player.level = 3;
            }

            if (player.score >5000) {
                player.level = 4;
            }

            
            window.requestAnimationFrame(playGame);
            player.score++;
            
            

            score.innerHTML = player.score +  "</br> LvL = " + player.level;
            // score.innerText = player.level;   // add level ? works??? 

        }

}


function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
}

// END GAME //

function endGame(){
    mySound = new sound("./sound/gameover.mp3");   // gameover sound
    mySound.play();                                                         
    
    player.start = false;
    
    score.innerHTML = "GaME OvER <br> Score: " + player.score;
    startScreen.classList.remove("hide");
    startScreen.classList.add("startText");
    bod.classList.add("bgchange");
    score.classList.add("startText");
    gameArea.classList.add("hide");            //
    
    
    
    
    
    
    
}

// START GAME //

function start() {
    gameArea.classList.remove("hide");         ////
    startScreen.classList.add("hide");
    score.classList.remove("startText");
            
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.level = 1;



    for(let x=0; x<10; x++) {
        let div = document.createElement("div");
        div.classList.add("wave");
        div.y = x*150;
        div.style.top= (x*150) + "px";
        gameArea.appendChild(div);
    
    }
    
    bod.classList.remove("bgchange");
    window.requestAnimationFrame(playGame);
    score.classList.remove("titleText");
    let car = document.createElement("div");
    
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
        
        initEnemy();
    
}

function initEnemy() {
    for(let x=0; x<3; x++) {

         let enemy = document.createElement("div");
        
         enemy.classList.add("enemy");
         enemy.classList.add("rotate");   
         enemy.y = ((x+1)*600)*-1;
         enemy.style.top= enemy.y + "px";
         enemy.style.left = Math.floor(Math.random()*355) + "px";
         gameArea.appendChild(enemy);
         
        }  
    }

    function changeEnemy() {
        for(let x = 0; x<= 3; x++) {
            let enemy2 = document.createElement("div");
            enemy2.classList.add("enemy2");

            enemy2.y = ((x+1)*600)*-1;
            enemy2.style.top= enemy2.y + "px";
            enemy2.style.left = Math.floor(Math.random()*315) + "px";

            gameArea.appendChild(enemy2);

        }
    }

    function sound(src) {
this.sound = document.createElement("audio");
this.sound.src = src;
this.sound.setAttribute("preload", "auto");
this.sound.setAttribute("controls", "none");
this.sound.style.display = "none";
document.body.appendChild(this.sound);
this.play = function(){
    this.sound.play();
}
this.stop = function(){
    this.sound.pause();
}    
}


