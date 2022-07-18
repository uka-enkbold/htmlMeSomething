// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85


const input = require("readline-sync");
let word = '';
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldPointStructure) {
  let newPointStructure = {};
  Object.keys(oldPointStructure).forEach(point => {
    oldPointStructure[point].forEach(character=> {
      newPointStructure[character.toLowerCase()] = point;
    });
  });
  return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

let initialPrompt = function() {
	let userWord  = input.question("Enter a word to score:\n ")
	return userWord;
	}

let simpleScore = function (word){
	if(word.includes(" ")){
		word= word.length-1;
	}
 return word.length;
};

let vowelBonusScore = function(word){
  let vowels = 'aeiou';
  let countbyBonusVowels = 0;
  for(let i = 0; i < word.length ; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      countbyBonusVowels += 3;
    }
    if (!vowels.includes(word[i].toLowerCase())){
      countbyBonusVowels +=1
    }
  }
  return countbyBonusVowels;
}

let scrabbleScore = function(word){
	let scrabble = newPointStructure
	   points = 0,
   word = word.toLowerCase();
    for (i = 0; i < word.length; i++) {
        points += Number(scrabble[word[i]] )
    }
    return points;
}

const scoringAlgorithms = [
	{
		"name" : "Simple Score",
		"Description": "Each letter is worth 1 point",
		"ScoreFunction": simpleScore
	},
	{
		"name" : "Bonus Vowels",
		"Description": "Vowels are 3 pts, consonants are 1 pt.",
		"ScoreFunction": vowelBonusScore
	},
	{
		"name" : "Scrabble",
		"Description": "The traditional scoring algorithm.",
		"ScoreFunction": scrabbleScore
	}	
];

let scorerPrompt = function () {
 let options = [
`\n\t0 - Simple: ${scoringAlgorithms[0].Description}`,
`\n\t1 - Bonus Vowels: ${scoringAlgorithms[1].Description}`,
`\n\t2 - Scrabble: ${scoringAlgorithms[2].Description} `
]
let selectedScoringReply = input.question(`\n Which scoring options would you like to use?\n ${options}\n Please enter 0, 1, or 2:
`);
	while (selectedScoringReply < 0 || selectedScoringReply>=3 || isNaN(selectedScoringReply)) {
selectedScoringReply = input.question(`\nPlease enter a valid number. Which scoring options would you like to use? ${options} \nPlease enter 0, 1, or 2:\n`);
	}
	return Number(selectedScoringReply); 
}

function runProgram(){
	while (word!=='stop'){
	word = initialPrompt()	
	if(word === 'stop'){
		console.log("thanks for playing")
		return
	}
	let num = scorerPrompt(); 
console.log(`score for '${word}': is ${scoringAlgorithms[num].ScoreFunction(word)} points`)
}
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

