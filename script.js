//Import WORDS list
import { WORDS } from './words.js';

//Declaration of variables
const NUMBER_OF_GUESSES = 6; //Capitalized because it's a known value
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; //Word being guessed as array of characters
let nextLetter = 0; //Index of array starting at 0, to be changed by how many letters are in a guess
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];//Calling WORDS array and using Math.floor, Math.random to pick a random word from list.
console.log(rightGuessString) //For debugging purposes in case something's not working, we know the right word.

//Generate the gameboard
function initBoard() {
    //Assigning to the HTML element
    let board = document.getElementById('gameboard');

    for (let i = 0; i < NUMBER_OF_GUESSES; i++){
        let row = document.createElement('main')
        row.className = 'letter-row' //Class 'letter-row' assigned to all rows created

        for (let j = 0; j < 5; j++){
            let box = document.createElement('main');
            box.className = 'letter-box'
            row.appendChild(box) //Appends each box to the row
        }

        board.appendChild(row) //Appends each row of 5 boxes to the gameboard
    }

}

initBoard()

//Listening to the keyboard for user input
document.addEventListener("keyup", (e) => { //Listen for keypress
    if (guessesRemaining === 0){
        return //Exit function if no guesses left
    }

    let pressedKey = String(e.key) //Turn key press into a string

    //For special keys: backspace and enter
    if ( pressedKey === 'Backspace' && nextLetter !== 0 ){ //If keypress is backspace, and is not at the beginning of a guess, will delete a letter
        deleteLetter()
        return
    }

    if ( pressedKey === 'Enter' ) {
        checkGuess() //Run check guess if enter is pressed
        return
    }

    //For letter keys
    let found = pressedKey.match(/[a-z]/gi) //Regex to validate pressed key with a-z
    if ( !found || found.length > 1 ) { //If not found (i.e. a number) or pressed more than 1 key at a time
        return //Exit the function
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter(pressedKey) {
    if ( nextLetter === 5 ) { //If the next index is 5, it's past the end of the row
        return
    }

    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName('letter-row')[ 6 - guessesRemaining ] //Grab current empty row
    let box = row.children[nextLetter] //Get box of index nextLetter
    
    animateCSS(box, 'pulse') //Adding pulse animation to box from animate just before letter filled
    box.textContent = pressedKey
    box.classList.add('filled-box')
    currentGuess.push(pressedKey) //Adds guessed letter to the end of guess array
    nextLetter += 1 //Add to counter of box location
}

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[ 6 - guessesRemaining ]
    let box = row.children[nextLetter - 1] //Identify the previously filled box
    
    box.textContent = '' //Change box to empty
    box.classList.remove('filled-box') //Remove filled-box styling
    currentGuess.pop() //Remove last guessed letter from guessed array
    nextLetter--
}

function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[ 6 - guessesRemaining ]
    let guessString = '' //Create empty string to populate with our guess
    let rightGuess = Array.from(rightGuessString) //Target word turned into array

    for ( const letter of currentGuess ){
        guessString += letter //Convert current guess array into string
    }

    if ( guessString.length != 5 ) { //Alert if guess is not 5 letters on enter
        toastr.error('Not enough letters!')
        return
    }

    if ( !WORDS.includes(guessString) ) { //Alert if word is not in the list
        toastr.error('That word is not in the list!')
        return
    }

    //If there is a valid guess
    for ( let i = 0; i < 5; i++ ) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i]) //Check if letter entered is in the target word
        
        if ( letterPosition === -1 ) {//Letter entered is not in target array
            letterColor = '#aaaaaa' //grey
        }else {
            if ( currentGuess[i] === rightGuess[i] ) { //If guess letter index and target index for letter are the same, turn green
                letterColor = '#50b000' //green
            }else { //Letter is in the target word, but not the right index/position
                letterColor = '#ffeb00' //yellow
            }

            rightGuess[letterPosition] = '#' 
        }


        let delay = 250 * i
        setTimeout(() => { //Style letter boxes with a slight time delay
            animateCSS(box, 'flipInX') //Flip the box
            box.style.backgroundColor = letterColor
            shadeKeyboard( letter, letterColor )
        }, delay)
    }

    if ( guessString === rightGuessString ) { //Winner winner chicken dinner
        toastr.success('You guessed right! Game over!')
        guessesRemaining = 0
        return
    }else { //Womp womp, not the right word. Reset current guess and letter index, and decreases guesses remaining
        guessesRemaining -= 1
        currentGuess = []
        nextLetter = 0

        if ( guessesRemaining === 0) { //And if the guesses remaining is now 0, player is out of guesses.
            toastr.error('You ran out of guesses! Game over!')
            toastr.info(`The right word was ${rightGuessString}`)
        }
    }
}

function shadeKeyboard( letter, color ) {
    for ( const elem of document.getElementsByClassName('keyboard-button') ) {
        if ( elem.textContent === letter ) { //Where letter is currentGuess[i] in above loop
            let oldColor = elem.style.backgroundColor //If letter is already correct, do nothing
            if ( oldColor === 'green' ) {
                return
            }

            if ( oldColor === 'yellow' && color !== 'green') { //If yellow, and not turning green, do nothing
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

//On-screen keyboard generates input as well
document.getElementById('keyboard').addEventListener('click', (e) => {
    const target = e.target

    if ( !target.classList.contains('keyboard-button') ) { //If user doesn't click on a key, terminate
        return
    }

    let key = target.textContent

    if ( key === "Del" ) {
        key = "Backspace" //Delete triggers same function as backspace
    }

    document.dispatchEvent( new KeyboardEvent("keyup", {'key':key})) //On click, same event as keyboard press
})

//Animation
const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise( (resolve, reject) => { //Create new promise and return it
        const animationName = `${prefix}${animation}`;
        
        const node = element //Add animation CSS classes
        node.style.setProperty( '--animate-duration', '0.3s');

        node.classList.add( `${prefix}animated`, animationName)

        function handleAnimationEnd(event) { //Remove animation CSS classes and resolve Promise on animation end
            event.stopPropagation()
            node.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        node.addEventListener( 'animationend', handleAnimationEnd, {once: true} )
        
    })