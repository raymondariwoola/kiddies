const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const testFunc = require("./custom.js");

const app = express();
app.use(express.static("public/"));
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

let type;

app.get("/alphabets-menu", (req, res) => {
  res.render("alphabets-menu");
});

app.get("/numbers-menu", (req, res) => {
  res.render("numbers-menu");
});

app.get("/shapes", (req,res) => {
  res.render("shapes");
})

app.post("/alphabets-menu", (req, res) => {
   type = req.body.upperCase ? "uppercase" 
  : req.body.lowerCase ? "lowercase"
  : null
  res.redirect("/alphabets-menu/alphabets");
});

app.post("/numbers-menu", (req, res) => {
  type = req.body.first10 ? "first10" :
    req.body.first100 ? "first100" :
    null
  res.redirect("/numbers-menu/numbers");
});


app.get("/alphabets-menu/alphabets", (req, res) => {
  type === undefined
    ? res.redirect("/alphabets-menu")
    : res.render("alphabets", { type: type });
});

app.get("/numbers-menu/numbers", (req, res) => {
  type === undefined ?
    res.redirect("/numbers-menu") :
    res.render("numbers", {
      type: type
    });
});



// app.get('/alphabets-menu/alphabets', function (req, res, next) {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, function (req, res) {
//  type === undefined
//     ? res.redirect("/alphabets-menu")
//     : res.render("alphabets", { type: type });
// })


app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});