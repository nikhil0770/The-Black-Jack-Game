document.querySelector("#hit").addEventListener("click", hit);
document.querySelector("#stand").addEventListener("click", stand);
document.querySelector("#deal").addEventListener("click", deal);

var myres = 0;
var isStand = false;
var turnover = false;
function hit() {
  if (isStand == false) {
    hitsound.play();
    var r = randomnum();
    var num = cardgen(r);
    var divf = division(0);
    showcard(r, divf);
    updatemyscore(num);
  }
}
const hitsound = new Audio("./sounds/swish.m4a");

function updatemyscore(num) {
  myres = myres + num;
  if (myres <= 21) {
    document.getElementById("myresult").innerHTML = myres;
    document.getElementById("resultdisp").innerHTML = "Playing Well";
    document.getElementById("resultdisp").style.color = "green";
  } else {
    document.getElementById("myresult").innerHTML = myres;
    document.getElementById("myresult").style.color = "red";
    document.getElementById("resultdisp").innerHTML = "Busted!!";
    document.getElementById("resultdisp").style.color = "red";
  }
}

var cards = {
  div: ["#mybox", "#botbox"],
  card: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  cardval: {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
  },
};

function randomnum() {
  var randInd = Math.floor(Math.random() * 13);
  return cards["card"][randInd];
}
function cardgen(r) {
  return cards["cardval"][r];
}
function division(n) {
  return cards["div"][n];
}
var botres = 0;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function stand() {
  isStand = true;
  while (botres <= 15 && isStand == true) {
    var divf = division(1);
    var r = randomnum();
    var num = cardgen(r);
    showcard(r, divf);
    updatebotscore(num);
    hitsound.play();
    await sleep(1000);
  }
  turnover = true;
}
function showcard(r, divf) {
  var cardimage = document.createElement("img");
  cardimage.src = `./images/${r}.png`;
  cardimage.style.width = "80px";
  cardimage.style.margin = "10px";
  document.querySelector(divf).appendChild(cardimage);
}

function updatebotscore(num) {
  botres = botres + num;
  if (botres <= 21) {
    document.getElementById("botresult").innerHTML = botres;
    document.getElementById("resultdisp").innerHTML = "Playing Well";
    document.getElementById("resultdisp").style.color = "green";
  } else {
    document.getElementById("botresult").innerHTML = botres;
    document.getElementById("botresult").style.color = "red";
    document.getElementById("resultdisp").innerHTML = "Busted!!";
    document.getElementById("resultdisp").style.color = "red";
  }
}
var wt = 0;
var lt = 0;
var dt = 0;
var losesound = new Audio("./sounds/aww.mp3");
var winsound = new Audio("./sounds/cash.mp3");
var round = 0;
function deal() {
  if (turnover == true) {
    round++;
    if (round <= 4) {
      var ress = roundres();
      if (ress == "Winner") {
        wt++;
        document.getElementById("winsc").innerHTML = wt;
        winsound.play();
      }
      if (ress == "Loss") {
        lt++;
        document.getElementById("losesc").innerHTML = lt;
        losesound.play();
      }
      if (ress == "draw") {
        dt++;
        document.getElementById("drawsc").innerHTML = dt;
      }
      setTimeout(function () {
        clearbox();
        myres = 0;
        botres = 0;
        document.getElementById("myresult").innerHTML = "0";
        document.getElementById("botresult").innerHTML = "0";
        document.getElementById("resultdisp").innerHTML = "Lets Play";
        document.getElementById("resultdisp").style.color = "black";
        document.getElementById("myresult").style.color = "white";
        document.getElementById("botresult").style.color = "white";
      }, 500);
    } else {
      setTimeout(function () {
        var di = document.querySelector("#subcont1").querySelectorAll("div");
        for (var j = 0; j < di.length; j++) {
          di[j].remove();
        }
        document.getElementById("subcont1").style.background = "black";
        document.getElementById("subcont1").style.height = "350px";
        if (wt > lt) {
          document.getElementById("subcont1").innerHTML = "You Won !!";
          document.getElementById("subcont1").style.color = "lightgreen";
          document.getElementById("subcont1").style.alignItems = "center";
          document.getElementById("subcont1").style.fontSize = "3em";
        } else if (wt < lt) {
          document.getElementById("subcont1").innerHTML = "You Lost !!";
          document.getElementById("subcont1").style.color = "red";
          document.getElementById("subcont1").style.alignItems = "center";
          document.getElementById("subcont1").style.fontSize = "3em";
        } else {
          document.getElementById("subcont1").innerHTML = "You Drew !!";
          document.getElementById("subcont1").style.color = "blue";
          document.getElementById("subcont1").style.alignItems = "center";
          document.getElementById("subcont1").style.fontSize = "3em";
        }
      }, 350);
      setTimeout(function () {
        window.location.reload();
      }, 777);
    }
    isStand = false;
  }
  turnover = false;
}

function clearbox() {
  var ele = document.querySelector("#mybox").querySelectorAll("img");
  for (var i = 0; i < ele.length; i++) {
    ele[i].remove();
  }
  var elem = document.querySelector("#botbox").querySelectorAll("img");
  for (var i = 0; i < elem.length; i++) {
    elem[i].remove();
  }
}

function roundres() {
  if (myres <= 21) {
    if ((myres > botres && botres <= 21) || botres > 21) {
      document.getElementById("resultdisp").innerHTML = "Winner";
      document.getElementById("resultdisp").style.color = "darkgreen";
      return "Winner";
    } else if (myres < botres && botres <= 21) {
      document.getElementById("resultdisp").innerHTML = "You Lost";
      document.getElementById("resultdisp").style.color = "red";
      return "Loss";
    } else if (myres == botres && botres <= 21) {
      document.getElementById("resultdisp").innerHTML = "You Drew";
      document.getElementById("resultdisp").style.color = "blue";
      return "draw";
    }
  } else if (myres > 21 && botres > 21) {
    document.getElementById("resultdisp").innerHTML = "You Drew";
    document.getElementById("resultdisp").style.color = "blue";
    return "draw";
  } else if (myres > 21 && botres <= 21) {
    document.getElementById("resultdisp").innerHTML = "You Lost";
    document.getElementById("resultdisp").style.color = "red";
    return "Loss";
  }
}
