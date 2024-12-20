const gameCont = document.createElement("div");
document.getElementById("container").appendChild(gameCont);
gameCont.classList.add("gameCont");

//Start button
const start = document.createElement("button");
document.getElementById("container").appendChild(start);
start.classList.add("startButton");
start.innerHTML = "Start";
start.addEventListener("click", gameStart);

//Score & Live
let score = 0;
let lives = 4;
let highestScore = 0;
const pointer = document.createElement("div");
const livesCont = document.createElement("div");
livesCont.classList.add("liveCont");
livesCont.id = "liveCont";
const liveIcon1 = document.createElement("div");
const liveIcon2 = document.createElement("div");
const liveIcon3 = document.createElement("div");
liveIcon1.classList.add("liveIcon");
liveIcon2.classList.add("liveIcon");
liveIcon3.classList.add("liveIcon");
pointer.classList.add("pointer");
pointer.id = "pointer";
document.getElementById("container").appendChild(pointer);
document.getElementById("container").appendChild(livesCont);
document.getElementById("liveCont").appendChild(liveIcon1);
document.getElementById("liveCont").appendChild(liveIcon2);
document.getElementById("liveCont").appendChild(liveIcon3);
document.getElementById("pointer").innerHTML = "score:" + score;

//Start
function gameStart() {
  start.style.display = "none";

  //Fruits
  const apple = document.createElement("div");
  gameCont.appendChild(apple);
  apple.classList.add("fruit");
  apple.classList.add("apple");
  apple.classList.add("hidden");

  const strawberry = document.createElement("div");
  gameCont.appendChild(strawberry);
  strawberry.classList.add("fruit");
  strawberry.classList.add("strawberry");
  strawberry.classList.add("hidden");

  const banana = document.createElement("div");
  gameCont.appendChild(banana);
  banana.classList.add("fruit");
  banana.classList.add("banana");
  banana.classList.add("hidden");

  const cherry = document.createElement("div");
  gameCont.appendChild(cherry);
  cherry.classList.add("fruit");
  cherry.classList.add("cherry");
  cherry.classList.add("hidden");
  const fruit = document.getElementsByClassName("fruit");

  const poo = document.createElement("div");
  gameCont.appendChild(poo);
  poo.classList.add("fruit");
  poo.classList.add("pooImage");
  poo.classList.add("hidden");
  const bombPoo = document.getElementsByClassName("fruit");
  //   let random = Math.floor(Math.random() * 950);
  //   let oldRan = random, i = 0;
  //   fruit[0].style.left = random + "px";
  let i = 0,
    oldRan = -100;
  const fruitInt = setInterval(fruitFall, 3000);

  const bombsInt = setInterval(bombs, 6000);

  function fruitFall() {
    fruit[i].classList.remove("animate");
    fruit[i].classList.add("hidden");
    i = Math.floor(Math.random() * 4);
    let random = Math.floor(Math.random() * 950);
    fruit[i].classList.add("animate");
    fruit[i].classList.remove("hidden");
    fruit[i].style.left = random + "px";
    setTimeout(score_check(oldRan), 3000);
    oldRan = random;
  }

  function bombs() {
    setTimeout(() => {
      poo.classList.remove("animate");
      poo.classList.add("hidden");
      let randomPoo = Math.floor(Math.random() * 950);
      poo.classList.add("animate");
      poo.classList.remove("hidden");
      poo.style.left = randomPoo + "px";
      setTimeout((remover) => {
        poo.classList.remove("animate"), poo.classList.add("hidden");
        pooCheck(randomPoo);
      }, 2900);
    }, 1500);
  }
  function pooCheck(randomPoo) {
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 150;
    if (leftEdge <= randomPoo && rightEdge >= randomPoo) {
      lives = live_u(lives);
    }
  }

  //Basket
  let modifier = 80;

  let position = { left: 450 };

  const basket = document.createElement("div");
  basket.innerHTML = `<img src="basket.png" alt="Basket">`;
  gameCont.appendChild(basket);
  basket.classList.add("basket");

  basket.style.left = position.left + "px";

  const containerWidth = gameCont.offsetWidth;

  function moveBasket(event) {
    const basketWidth = basket.offsetWidth;
    switch (event.key) {
      case "ArrowLeft":
        position.left = Math.max(0, position.left - modifier);
        break;
      case "ArrowRight":
        position.left = Math.min(
          containerWidth - basketWidth,
          position.left + modifier
        );
        break;
    }
    basket.style.left = position.left + "px";
    return position.left;
  }

  document.addEventListener("keydown", moveBasket);
  let lives = 4;
  let score = 0;
  let t = 0;
  function score_check(oldRan) {
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 150;
    if (leftEdge <= oldRan && rightEdge >= oldRan) {
      score += 1;

      document.getElementById("pointer").innerHTML = "score:" + score;
    } else {
      lives = live_u(lives);
    }
  }
  function live_u(lives) {
    lives -= 1;
    console.log(lives);
    if (lives == 2) {
      document.getElementById("liveCont").removeChild(liveIcon2);
    } else if (lives == 1) {
      document.getElementById("liveCont").removeChild(liveIcon3);
    } else if (lives == 0) {
      document.getElementById("liveCont").removeChild(liveIcon1);
      gameOver();
    }
    return lives;
    //   function lives_u() {}
  }

  function gameOver() {
    const over = document.createElement("div");
    over.classList.add("over");
    document.getElementById("container").appendChild(over);
    over.innerHTML = "You suck";
    let fruit = document.getElementsByClassName("fruit");
    start.style.display = "none";
    //   for(let i=0;i<fruit.length;i++){
    //    fruit[i].style.display = "none";
    // }
    for (let i = 0; i < fruit.length; i++) {
      gameCont.removeChild(fruit[i]);
    }
    clearInterval(fruitInt);
    over.addEventListener("click", gameStart);
  }
}
