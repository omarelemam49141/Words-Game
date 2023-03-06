//Variables
let words = [
    "might",
    "noun",
    "verb",
    "hello",
    // "welcome",
    "tell",
    // "photography",
    "zoo",
    "God",
    "Well",
    //"Prepared",
    "Love",
    // "Think",
    "Mind",
    // "English",
    // "Arabic",
    // "Philosophy",
    // "International",
    "Hell",
    // "Paradise",
    // "Animal",
    // "Lion",
    // "Tiger",
    // "Again",
    // "Afternoon",
    // "Tonight",
    // "Tomorrow",
    // "Day",
    // "weak",
    // "week"
],
    time = 0,
    position = 0,
    score = 0,
    wordsCount = words.length,
    currentWord = "",
    levelsContainer = document.querySelector('.play-btn'),
    levels = Array.from(document.querySelector('.play-btn').children),
    levelSelected = "",
    difficulty = document.querySelector('.difficulty'),
    timeContainers = document.querySelectorAll('.time-remaining'),
    timeCounterContainer = document.querySelector('.time-counter'),
    theWordContainer = document.querySelector('h1'),
    comingWordsContainer = document.querySelector('.coming-words'),
    scoreContainer = document.querySelector('.score'),
    totalScoreContainer = document.querySelector('.total-score'),
    inputContainer = document.querySelector('input'),
    resultContainer = document.querySelector('.result');

//set the default
totalScoreContainer.innerHTML = words.length;
scoreContainer.innerHTML = score;
//disable the paste to the input field
inputContainer.onpaste = function() {
    return false;
}


levels.forEach(level => {
    level.addEventListener('click', (e) => {
        switch (level.innerHTML) {
            case "Easy":
                time = 5;
                break;
            case "Normal":
                time = 4;
                break;
            case "Hard":
                time = 3;
                break;
            default:
                time = 4;
        }
        
        levelSelected = level.innerHTML;

        setSettings();
    })
})

//set the settings of the game
function setSettings() {
    //focus on the input
    inputContainer.focus();
    //Hide the levels
    levelsContainer.style.display = "none";

    //add the difficulty
    difficulty.innerHTML = levelSelected;

    //start the word
    wordGenerator(time);
}

function wordGenerator(newTime) {
    //empty the input
    inputContainer.value = "";

    //reset the time
    newTime = time;

    //increase the time for the firs word
    if (position == 0) {
        newTime += 3;
        position++;
    }

    //set the time 
    timeContainers.forEach(timeContainer => {
        timeContainer.innerHTML = newTime;
    })

    //get a random word
    randomWord();

    //time counter function
    timeCounter(parseInt(newTime));
}

//timer counter function
function timeCounter(remainingTime) {
    //check if there is still words
    if (words.length >= 0) {
        let countDown = setInterval(() => {
            remainingTime--;
            timeCounterContainer.innerHTML = remainingTime;
            if (remainingTime === 0) {
                clearInterval(countDown);
    
                //check if the word is right
                let checked = checkWord();

                if (score == wordsCount) {
                    let span = document.createElement('span');
                    span.className = "win";
                    let winText = document.createTextNode('Congratz, You Win!');
                    span.appendChild(winText);
                    resultContainer.appendChild(span);
                    inputContainer.setAttribute('disabled', 'disabled')
                }
                if (checked != "bad" && score != wordsCount) {
                    //repeat after me :)
                    wordGenerator();
                }  
            }
        }, 1000);
    }
}

//random word function
function randomWord() {
    //random index
    let randomIndex = Math.floor(Math.random() * words.length);
    //random word
    randomWordSelected = words[randomIndex];
    //remove the random word
    words.splice(randomIndex, 1);
    //add the word
    theWordContainer.style.display = "block";
    theWordContainer.innerHTML = randomWordSelected;
    //empty the coming words
    comingWordsContainer.innerHTML = "";
    //add the coming words
    words.forEach(word => {
        comingWordsContainer.innerHTML += `<span>${word}</span>`;
    })
}

//check word function
function checkWord() {
    if (randomWordSelected.toLowerCase() === inputContainer.value.toLowerCase()) {
        score++;
        scoreContainer.innerHTML = score;
        document.querySelector('.win-sound').play();
    } else {
        let span = document.createElement('span');
        span.className = "lose";
        let loseText = document.createTextNode('You Lose!');
        span.appendChild(loseText);
        resultContainer.appendChild(span);
        inputContainer.setAttribute('disabled', 'disabled');
        document.querySelector('.lose-sound').play();
        return "bad";
    }
}