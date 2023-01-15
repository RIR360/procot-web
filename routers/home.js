// modules
require("dotenv").config();
const express = require("express");
const {
    Members
} = require("../libraries/database");
const app = express.Router();


// home page
app.get("/", (req, res, next) => {

    Members.create(
        { 
            name: 'Rizvy', 
            batch: 4,
            roll: 29
        }
    )
    .then((person) => console.log(person))
    .catch((error) => console.log(error));

    res.render("pages/home", {

        title: "Home"

    })

})
app.get("/lab/solution", (req, res, next) => {

    let algorithm = `[Initialize] Set i := 0, a := pattern length, b := text length\nRepeat 3 to 11 until i <= b - a:\nSet j := 0\nRepeat 5 to 7 until j < a:\nIf text[i + j] != pat[j] then:\ngoto step 8\nj++\nIf j == a then:\nWrite \"Pattern found at position  (i + 1)\"\nGo to step 13\ni++\nWrite \"Pattern not found\"\n[Exit]`;

    let code = `#include  <stdio.h>\n#include  <string.h>\n#define SIZE 1000\n\nint main() \n{ \n    char text[SIZE],pat[SIZE];\n    int a = 0, b = 0, i, j;\n    \n    printf(\"Enter the string : \");\n    fgets(text, SIZE, stdin);\n    printf(\"Enter the pattern to find : \");\n    fgets(pat, SIZE, stdin);\n    \n    while(pat[a] != '\\n') a++;\n    while(text[b] != '\\n') b++;\n    \n    for (i = 0; i &lt;= b - a; i++) {\n    \n        for (j = 0; j &lt; a; j++)\n            if (text[i + j] != pat[j]) \n              break; \n    \n        if (j == a) {\n            printf(\"Pattern found at position %d \\n\", i+1);\n            return 0;\n        }\n    } \n    printf(\"Pattern not found\\n\");\n    return 0;\n}`;


    let output = "Enter the string : hello\nEnter the pattern to find : ll\nPattern found at position 3";

    res.render("pages/lab-solution", {

        title: "Solution",
        content: {
            title: "Write a program to implement first pattern matching algorithm.",
            algorithm: algorithm,
            code: code,
            output: output
        },
        contributor: {
            algorithm: "Rizvy",
            code: "Rizvy",
            output: "Rizvy"
        }

    })

});

module.exports = app;
