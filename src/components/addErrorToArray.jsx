const addErrorToArray = (inputText, words, errorArray, TimeLeft) => {
  const enteredWords = inputText.trim().split(/\s+/);

  for (let i = 0; i < enteredWords.length && i < words.length; i++) {
    const enteredWord = enteredWords[i];
    const correctWord = words[i];

    for (let j = 0; j < enteredWord.length  ; j++) {
      if (enteredWord[j] !== correctWord[j] || enteredWord[i] == 'undefined') {
        const errorExists = errorArray.some(
          (error) => error.wordIndex === i && error.charIndex === j
        );

        if (!errorExists) {
          errorArray = [...errorArray, { time: Number(TimeLeft), wordIndex: i, charIndex: j, enteredLetter: enteredWord[j], correctLetter: correctWord[j] }];
        }
      }
    }
  }

  return errorArray;
};

export default addErrorToArray;