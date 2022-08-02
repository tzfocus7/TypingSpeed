const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let charIndex = mistakes = isTyping = 0;
let timer;
let maxTime = 90, timeLeft = maxTime;

function randomParagraph(){
    //getting random numbers and it'll always be less than the paragraphs length
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    //getting random item from the paragraphs array, splitting all characters of it, 
    //adding each character inside span and then adding this span inside p tag
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0){
        if (!isTyping){ //once timer starts, it won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //if user hasn't typed any character or pressed backspace
        if (typedChar == null){
            charIndex--; 
            if (characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar){
                // if user typed character and shown character matched them, then add the
                //correct class else increment mistakes and add the incorrect class
                 characters[charIndex].classList.add("correct");
             } else {
                 mistakes++;
                 characters[charIndex].classList.add("incorrect");
             }
             charIndex++; //increment charindex either user typed correct or incorrect character
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 90);
        //if wpm value is 0, empty, or infinity, then set its value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes; //cpm will not count mistakes
    
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    if (timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame(){
    //calling loadParagraph function and resetting each variables and elements value to default
    randomParagraph();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    inpField.value = "";
    clearInterval(timer)
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);