//Lautstärke
var lautstärke = 1;
//Direction
direction = new Array();
direction[0] = 1;
document.onkeydown = function (event) {
   //Rechts: 39; links: 37; Unten: 40; Oben: 38
   if (event.keyCode == 68 || event.keyCode == 39) {
      direction.unshift(1);
      var audio = new Audio("audio/rechts.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (event.keyCode == 87 || event.keyCode == 38) {
      direction.unshift(-22);
      var audio = new Audio("audio/oben.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (event.keyCode == 65 || event.keyCode == 37) {
      direction.unshift(-1);
      var audio = new Audio("audio/links.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   } else if (event.keyCode == 83 || event.keyCode == 40) {
      direction.unshift(22);
      var audio = new Audio("audio/unten.mp3");
      audio.volume = lautstärke;
      audio.play();
      //move();
   }
   if (event.keyCode == 32) {
      alert("Pause");
   }
   if (event.keyCode == 171) {
      window.location.reload(true);
   }
};
function fehlerblatt() {
   var dialog = document.getElementById("fehlerblatt_dialog");
   if (dialog.hasAttribute("open")) {
      dialog.close();
   } else if (dialog.hasAttribute("closed")) {
      dialog.show();
   }
}
function leaderboardAnzeigen() {
   var dialog_l = document.getElementById("leaderboard_dialog");
   if (dialog_l.hasAttribute("open")) {
      dialog_l.close();
   } else if (dialog_l.hasAttribute("closed")) {
      dialog_l.show();
   }
   fetch("leaderboard.json")
      .then((results) => results.json())
      .then((data) => {
         var output = "";
         for (var l = 0; l < data.length; l++) {
            output +=
               '<div class="person"> <p class="name">' +
               data[l].name +
               '</p> <span class="punkte">' +
               data[l].score +
               "</span> </div>";
         }

         document.getElementById("board").innerHTML = output;
      });
}
