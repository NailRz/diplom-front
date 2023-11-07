import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const words = "ведь идти ребенок сам что даже ну молчать подумать хотеть сразу это просто хочет тут новый без сам видеть вы через в город свой чужой как быть мне с этим делом что могу сделать если";
  const inputRef = useRef(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Время в секундах
  const [isTyping, setIsTyping] = useState(false);

  const startTest = () => {
    if (inputText.length === 0 && !isTestComplete) {
      setStartTime(Date.now());
      setIsTestComplete(false);
      setTimeLeft(15); // Установка времени в 15 секунд
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isTyping) {
        startTest();
        setIsTyping(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isTyping]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isTestComplete) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Каждую секунду
    } else if (timeLeft === 0) {
      setEndTime(Date.now());
      setIsTestComplete(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, isTestComplete]);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInputText(userInput);

    if (userInput.trim().split(/\s+/).length > 0) {
      setWordCount(userInput.trim().split(/\s+/).length);
    }

    if (userInput.length === words.length) {
      setEndTime(Date.now());
      setIsTestComplete(true);
    } else {
      setEndTime(0);
      setIsTestComplete(false);
    }
  };

  const calculateWPM = () => {
    const timeElapsed = (endTime - startTime) / 1000 / 60;
    const charactersTyped = inputText.length;
    const calculatedWpm = charactersTyped / 5 / timeElapsed;
    setWpm(calculatedWpm);
  };

  useEffect(() => {
    if (isTestComplete && endTime > 0) {
      calculateWPM();
    }
  }, [endTime, isTestComplete]);

  const formattedWpm = Number.isFinite(wpm) ? wpm.toFixed(0) : "Calculating...";

  const renderWords = () => {
    const inputArray = inputText.split("");
    const wordsArray = words.split("");

    return wordsArray.map((letter, index) => {
      let textColor = "white";

      if (inputArray[index]) {
        if (letter === inputArray[index]) {
          textColor = "green";
        } else {
          textColor = "red";
        }
      }

      return (
        <span
          key={index}
          style={{ color: textColor, cursor: "text" }}
          onClick={startTest}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <>
      <div style={{ fontFamily: "Arial", fontSize: "18px", lineHeight: "24px" }}>
        <div style={{ marginBottom: "10px" }}>{renderWords()}</div>
        <input
          type="text"
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          style={{
            fontSize: "18px",
            padding: "5px",
            width: "1px",
            height: "1px",
            position: "absolute",
            top: "-100px",
            left: "-100px",
            opacity: 0,
            overflow: "hidden",
          }}
          // style={{
          //   fontSize: "18px",
          //   padding: "5px",
          //   width: "90%",
          //   maxWidth: "500px",
          //   margin: "0 auto",
          // }}
        />
        <p>Time Left: {timeLeft} seconds</p>
        <p>Words per Minute (WPM): {formattedWpm}</p>
      </div>
    </>
  );
}

export default App;
