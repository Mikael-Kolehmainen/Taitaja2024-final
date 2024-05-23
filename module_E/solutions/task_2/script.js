const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("typing-speed");
const textareaElement = document.getElementById("textarea");

const testTimeInSeconds = 60;
let timer = testTimeInSeconds;

const startTypingTest = () => {
  textareaElement.removeEventListener("focus", startTypingTest);

  const ticker = setInterval(() => {
    timerElement.innerText = timer;
    timer -= 1;

    if (timer < 0) {
      endTypingTest();
      clearInterval(ticker);
    }
  }, 1000);
};

const endTypingTest = () => {
  textareaElement.ariaDisabled = true;
  const words = textareaElement.value.split(" ");

  let wordCount = 0;
  words.forEach((word) => {
    if (word) {
      wordCount++;
    }
  });

  const wpm = wordCount / (testTimeInSeconds / 60);

  resultElement.innerText = `Measured typing speed of ${wpm} WPM in ${testTimeInSeconds} seconds`;
};

textareaElement.addEventListener("focus", startTypingTest);
