function irAPantalla(pantalla) {
    window.location.href = pantalla; 
}


let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let cells = {};  

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
        cells[i] = { mole: false, plant: false };  
    }
    setInterval(setMole, 600); 
    setInterval(setPlant, 600); 
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);  
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
        cells[currMoleTile.id].mole = false;  
    }
    
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return; 
    
    currMoleTile = document.getElementById(num);
    let mole = document.createElement("img");
    mole.src = "./img/bmo.gif";
    currMoleTile.appendChild(mole);
    cells[num].mole = true;  
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
        cells[currPlantTile.id].plant = false;  
    }

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return; 
    
    currPlantTile = document.getElementById(num);
    let plant = document.createElement("img");
    plant.src = "./img/glitch.webp";
    currPlantTile.appendChild(plant);
    cells[num].plant = true;  
}

function selectTile() {
    if (gameOver) return;

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); 
        cells[this.id].mole = false;  
    } else if (this === currPlantTile) {
        gameOver = true;
        showGameOver();
    }
}

function showGameOver() {
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("final-score").innerText = `Puntuación final: ${score}`;
}

document.getElementById("restart-btn").addEventListener("click", restartGame);

function restartGame() {
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = score.toString();

    document.getElementById("game-over-screen").style.display = "none";

    for (let i = 0; i < 9; i++) {
        let tile = document.getElementById(i.toString());
        tile.innerHTML = "";
        cells[i].mole = false;
        cells[i].plant = false;
    }

    currMoleTile = null;
    currPlantTile = null;
}

