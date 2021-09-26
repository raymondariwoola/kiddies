const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const testFunc = require("./custom.js");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


// Manually declare Alphabet constants
const alphabetsUpper =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetsLower = alphabetsUpper.map((a) => a.toLowerCase());

// Declare Alphabet constant using CharCode
/* lowerCase charCode - 97 to 122
           UpperCase charCode - 65 to 90
        */
const generateAlphaUp = [];
const generateAlphaLow = [];

for (let i = 97; i <= 122; i++) {
  const element = String.fromCharCode(i);
  generateAlphaLow.push(element);
  generateAlphaUp.push(element.toUpperCase());
}



app.get("/", (req, res) => {

    res.render("home", { alpha: alphabetsUpper });
});




app.listen(3000, function () {
    console.log("listening on port 3000");
})