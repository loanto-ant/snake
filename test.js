const fs = require("fs");
fs.readFile("test.txt", "utf8", (err, data) => {
   if (err) {
      console.error(err);
      return;
   }
   console.log(data);
});

const content = "something interesting";
fs.writeFile("test.txt", content, (err) => {
   if (err) {
      console.error;
      return;
   }
});
