//Lautstärke
var lautstärke = 1;
//Direction
direction = new Array();
direction[0] = 1;
//Direction
document.onkeydown = function (event) {
   var taste = event.key.toLowerCase();
   //Rechts: 39; links: 37; Unten: 40; Oben: 38
   if (taste == "d" || event.key == "ArrowRight") {
      direction.unshift(1);
      var audio = new Audio("audio/rechts.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (taste == "w" || event.key == "ArrowUp") {
      direction.unshift(-22);
      var audio = new Audio("audio/oben.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (taste == "a" || event.key == "ArrowLeft") {
      direction.unshift(-1);
      var audio = new Audio("audio/links.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (taste == "s" || event.key == "ArrowDown") {
      direction.unshift(22);
      var audio = new Audio("audio/unten.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   }
   if (event.key == " ") {
      alert("Pause");
   }
   if (event.key == "+") {
      window.location.reload(true);
   }
   if (direction.length > 3) {
      direction.pop();
   }
};
