// modules
require("dotenv").config();
const express = require("express");
const {
    database
} = require("../libraries/database");
const app = express.Router();


// home page
app.get("/", (req, res, next) => {

    let algorithm = `
    1. [Initialize] Set i := 0, a := pattern length, b := text length
    2. Repeat 3 to 11 until i <= b - a:
    3.  Set j := 0
    4.  Repeat 5 to 7 until j < a:
    5.   If text[i + j] != pat[j] then:
    6.    goto step 8
    7.   j++
    8.  If j == a then:
    9.   Write "Pattern found at position  (i + 1)"
    10.  go to step 13
    11. i++
    12. Write "Pattern not found"
    13. [Exit]
    `;

    let code = `
    #include  <stdio.h>
    #include  <string.h>
    #define SIZE 1000
    
    int main() 
    { 
        char text[SIZE],pat[SIZE];
        int a = 0, b = 0, i, j;
        
        printf("Enter the string : ");
        fgets(text, SIZE, stdin);
        printf("Enter the pattern to find : ");
        fgets(pat, SIZE, stdin);
        
        while(pat[a] != '\n') a++;
        while(text[b] != '\n') b++;
        
        for (i = 0; i &lt;= b - a; i++) {
        
            for (j = 0; j &lt; a; j++)
                if (text[i + j] != pat[j]) 
                    break; 
        
            if (j == a) {
                printf("Pattern found at position %d \n", i+1);
                return 0;
            }
        } 
        printf("Pattern not found\n");
        return 0;
    }`;

    let output = "Enter the string : hello\nEnter the pattern to find : ll\nPattern found at position 3";

    res.render("pages/home", {
        content: {
            algorithm: "",
            code: "",
            output: output
        },
        contributor: {
            algorithm: "",
            code: "Rizvy",
            output: "Rizvy"
        }
    })

});

module.exports = app;
