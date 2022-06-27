//Geschwindigkeit Slider
var slider = document.getElementById("slider");
var label = document.getElementById("label");
var geschwindigkeit;
slider.oninput = function status() {
   label.innerHTML = slider.value;
};
if (slider.value == 1) geschwindigkeit = 170;
if (slider.value == 2) geschwindigkeit = 140;
if (slider.value == 3) geschwindigkeit = 120;
if (slider.value == 4) geschwindigkeit = 100;
if (slider.value == 5) geschwindigkeit = 90;

// Musik Lautstärke
var slider_v = document.getElementById("slider_v");
var label_v = document.getElementById("label_v");
slider_v.oninput = function status_v() {
   label_v.innerHTML = slider_v.value * 100;
   lautstärke = slider_v.value;
};

//Ausgabe des Spielfeldes
for (var i = 0; i < 22; i++) {
   document.write('<img src="images/end3.png">');
}
document.write("<br>");
for (var j = 0; j < 20; j++) {
   document.write('<img src="images/end3.png">');
   for (var u = 0; u < 20; u++) {
      document.write('<img src="images/blank3.png">');
   }
   document.write('<img src="images/end3.png">');
   document.write("<br>");
}
for (var i = 0; i < 22; i++) {
   document.write('<img src="images/end3.png">');
}

//Snake Ausgangsposition bestimmem
var first = 0;
var blank = document.images[23].src;
do {
   first = Math.floor(Math.random() * 483);
} while (document.images[first - 1].src != blank || first % 22 > 11);
document.images[first].src = "images/schlange_glied.png";
var snake = new Array();
snake[0] = first;
snake[1] = first - 1;

//Food Startposition finden
while (document.images[first].src != blank) {
   first = Math.floor(Math.random() * 483);
}
document.images[first].src = "images/apfel.png";
var food = document.images[first].src;

var counter = 0;
var rotten_counter = 0;
var rotation = new Array();
var verboten_rotten = new Array();
verboten_rotten = [24, 41, 45, 64, 419, 438, 442, 459];

//Counter mit Highscore init
document.getElementById("score").innerHTML = "Score: 0 | Highscore: " + cookie(counter);

function move() {
   if (
      direction[0] + 2 == direction[1] ||
      direction[0] - 2 == direction[1] ||
      direction[0] + 44 == direction[1] ||
      direction[0] - 44 == direction[1]
   ) {
      direction[0] = direction[1];
   }
   var index = snake[0] + direction[0];
   if (document.images[index].src == blank) {
      // Endeintrag wegnehmen
      var ende = snake.pop();

      //im Spielfeld einfügen
      document.images[index].src = "images/schlange_glied.png";
      document.images[ende].src = "images/blank3.png";

      //Neue Position vorne dran
      snake.unshift(index);
      var spiel = setTimeout("move()", geschwindigkeit);
   } else if (document.images[index].src == food) {
      snake.unshift(index);
      document.images[index].src = "images/schlange_glied.png";

      do {
         first = Math.floor(Math.random() * 483);
      } while (document.images[first].src != blank);
      document.images[first].src = "images/apfel.png";

      var spiel = setTimeout("move()", geschwindigkeit);

      var audio = new Audio("audio/food.mp3");
      audio.volume = lautstärke;
      audio.play();

      counter++;
      document.getElementById("score").innerHTML = "Score: " + counter + " | Highscore: " + cookie(counter);

      //Chad
      if (counter == 100) {
         var audio = new Audio("audio/chad.mp3");
         audio.volume = lautstärke;
         audio.play();
         document.getElementById("score").innerHTML = "ABSOLUTE CHAD";
      }

      //Verrottete Äpfel
      var zufallszahl = Math.random();
      if (counter > 10 && zufallszahl > 0.7 && rotten_counter < 6) {
         do {
            first_rotten = Math.floor(Math.random() * 483);
         } while (document.images[first_rotten].src != blank || verboten_rotten.includes(first_rotten));
         rotten_counter++;
         document.images[first_rotten].src = "images/rotten_apple2.png";
         document.images[first_rotten].style.transform = "rotate(0deg)";
      }
   } /*else if (index == snake[1]) {
      index = snake[0] + direction[1];
      // Endeintrag wegnehmen
      var ende = snake.pop();

      //im Spielfeld einfügen
      document.images[index].src = "images/schlange_glied.png";
      document.images[ende].src = "images/blank3.png";

      //Neue Position vorne dran
      snake.unshift(index);
      var spiel = setTimeout("move()", geschwindigkeit);
   }*/ else {
      var audio = new Audio("audio/game_over.mp3");
      audio.volume = lautstärke;
      audio.play();
      clearTimeout(spiel);
      alert("Game Over | Score: " + counter + " | Highscore: " + cookie(counter));
   }

   //Kopf, Glieder und Schwanz ändern
   //Glieder
   var c = 1;
   while (c < snake.length - 1) {
      document.images[snake[c]].src = "images/schlange_glied.png";
      c++;
   }
   //Schwanz
   document.images[snake[snake.length - 1]].src = "images/schlange_schwanz.png";
   //Kopf
   document.images[snake[0]].src = "images/schlange_kopf.png";

   //Richtung
   if (direction[0] == 1) rotation.unshift("0deg");
   else if (direction[0] == 22) rotation.unshift("90deg");
   else if (direction[0] == -1) rotation.unshift("180deg");
   else if (direction[0] == -22) rotation.unshift("270deg");

   document.images[snake[0]].style.transform = "rotate(" + rotation[0] + ")";
   document.images[snake[snake.length - 1]].style.transform = "rotate(" + rotation[rotation.length] + ")";
   document.images[first].style.transform = "rotate(0deg)";
}
move();

function cookie(score) {
   //checken if counter > cookie highscore
   //falls ja, dann cookie highscore neu setzen
   var cookie1 = document.cookie.split("=");
   var highscore = parseInt(cookie1[1]);
   if (isNaN(highscore)) {
      highscore = 0;
   }
   if (score > highscore) {
      document.cookie = "highscore=" + score + "; SameSite=None; Secure; expires=So, 01 Apr 2023 00:00:00 UTC";
      return score;
   }
   return highscore;
}
