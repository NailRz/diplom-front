/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./Keyboard.module.css";

const Keyboard = ({ highlightKey }) => {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["TAB", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\"],
    ["CAPS", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
    ["SHIFTL", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "SHIFTR"],
    ["Space"]
  ];

  const fingerColors = {
    leftPinky: "#85e950", // greenish color
    leftRing: "#a3f8ab", // light pink
    leftMiddle: "#ffaff7", // light purple
    leftIndex: "#c2a5ff", // orchid color
    rightIndex: "#d9ccff", // pale green
    rightMiddle: "#ffaff7", // light purple
    rightRing: "#a3f8ab", // light pink
    rightPinky: "#85e950", // greenish color
    thumb: "#fef289" // yellow
  };

  const fingerMapping = {
    "1": "leftPinky", "2": "leftPinky", "3": "leftRing", "4": "leftMiddle",
    "5": "leftIndex", "6": "leftIndex", "7": "rightIndex", "8": "rightMiddle",
    "9": "rightRing", "0": "rightPinky", "-": "rightPinky", "=": "rightPinky",
    "Й": "leftPinky", "Ц": "leftRing", "У": "leftMiddle", "К": "leftIndex",
    "Е": "leftIndex", "Н": "rightIndex", "Г": "rightIndex", "Ш": "rightMiddle",
    "Щ": "rightRing", "З": "rightPinky", "Х": "rightPinky", "Ъ": "rightPinky", "\\": "rightPinky",
    "Ф": "leftPinky", "Ы": "leftRing", "В": "leftMiddle", "А": "leftIndex",
    "П": "leftIndex", "Р": "rightIndex", "О": "rightIndex", "Л": "rightMiddle",
    "Д": "rightRing", "Ж": "rightPinky", "Э": "rightPinky", "Enter": "rightPinky",
    "Я": "leftPinky", "Ч": "leftRing", "С": "leftMiddle", "М": "leftIndex",
    "И": "leftIndex", "Т": "rightIndex", "Ь": "rightIndex", "Б": "rightMiddle",
    "Ю": "rightRing", ".": "rightPinky", "TAB": "leftPinky", "CAPS": "leftPinky", "SHIFTL": "leftPinky", "Space": "thumb", "SHIFTR": "rightPinky"
  };
  const [flag, setFlag] = useState(0)
  if (highlightKey === ' ' && flag == 1) {
    highlightKey = 'Space';
  } else{
    if (flag == 0)
    setFlag(1)
  }
  return (
    <div className={classes.keyboard}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.keyboardRow}>
          {row.map((key) => (
            <div
              key={key}
              className={`${classes.keyboardKey} ${key === highlightKey ? classes.highlight : ''}`}
              style={{ backgroundColor: fingerColors[fingerMapping[key]] }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
