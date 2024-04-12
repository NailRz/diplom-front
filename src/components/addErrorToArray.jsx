const addErrorToArray = (inputText, words, errorArray) => {
  const enteredWords = inputText.trim().split(/\s+/);

  for (let i = 0; i < enteredWords.length && i < words.length; i++) {
    const enteredWord = enteredWords[i];
    const correctWord = words[i];
    // const isEntWordMinThenCorrect = enteredWord < correctWord ? 1 : 0;

    for (let j = 0; j < enteredWord.length  ; j++) {
      if (enteredWord[j] !== correctWord[j] || enteredWord[i] == 'undefined') {
        const errorExists = errorArray.some(
          (error) => error.wordIndex === i && error.charIndex === j
        );

        if (!errorExists) {
          errorArray.push({ wordIndex: i, charIndex: j });
        }
      }
    }
  }
  // console.log(errorArray)

  return errorArray;
};

export default addErrorToArray;