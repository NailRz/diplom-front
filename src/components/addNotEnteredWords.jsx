export function addNotEnteredWords(words, inputArray, newNotEnteredArray = []) {
    console.log(inputArray);
    console.log(words);
    for (let i = 0; i < words.length - 2; i++) {
        const word = words[i];
        console.log(word);
        const enteredWord = inputArray[i];
        console.log(enteredWord);

        if (word.length > enteredWord?.length) {
            for (let j = enteredWord.length; j < word.length; j++) {
                newNotEnteredArray.push({
                    wordIndex: i,
                    charIndex: j,
                    notEntered: 1,
                });
            }
        }
    }
    console.log(newNotEnteredArray);
    return newNotEnteredArray;
}