// inside script.js
const noobArray = [
  "the", "of", "and", "to", "in", "is", "you", "that", "it", "he",
  "was", "for", "on", "are", "with", "as", "I", "his", "they", "be",
  "at", "one", "have", "this", "from", "or", "had", "by", "not", "word",
  "but", "what", "some", "we", "can", "out", "other", "were", "all", "there",
  "when", "up", "use", "your", "how", "said", "an", "each", "she", "which",
  "do", "their", "time", "if", "will", "way", "about", "many", "then", "them",
  "write", "would", "like", "so", "these", "her", "long", "make", "thing", "see",
  "him", "two", "has", "look", "more", "day", "could", "go", "come", "did",
  "number", "sound", "no", "most", "people", "my", "over", "know", "water", "than",
  "call", "first", "who", "may", "down", "side", "been", "now", "find", "any",
  "new", "work", "part", "take", "get", "place", "made", "live", "where", "after"
]

console.log(noobArray.length);

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
console.log(startTime);         
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


// array to store the set of words displayed on screen
var feed = [];
// function to fill the array with a random set of words
function populateFeed(){
  feed = [];
  for (i = 0; i <40; i+=1){
    const feedIndex = Math.floor(Math.random() * 40);
    feed.push(noobArray[feedIndex]);
  }
}




// at the end of script.js
addEventListener('load', () => {
    // reset the word index for tracking
    wordIndex = 0;

    // call the populateFeed function 
    populateFeed();
    console.log(feed);

    // Create an array of span elements so we can set a class
    const spanWords = feed.map(function (word) {return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    

    // Highlight the first word
    console.log(quoteElement.childNodes);
    quoteElement.childNodes[0].className = 'highlight';
    

    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
});


// at the end of script.js
typedValueElement.addEventListener('input', () => {
    // Start the timer
    startTime = new Date().getTime();

    // Get the current word
    const currentWord = feed[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === feed.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in feed
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
});
