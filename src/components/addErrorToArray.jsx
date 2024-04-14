const addErrorToArray = (inputText, words, errorArray) => {
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
          errorArray = [...errorArray, { wordIndex: i, charIndex: j }];
        }
      }
    }
  }

  return errorArray;
};

export default addErrorToArray;