"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function getRandomWord(filePath) {
    var fileContent = fs.readFileSync(filePath, 'utf-8');
    var words = fileContent.split(/\s+/); // Split by whitespace
    var randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].replace(',', '');
}
var filePath = path.join(__dirname, 'words.txt');
var randomWord = getRandomWord(filePath);
console.log(randomWord);
