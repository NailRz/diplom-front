/* eslint-disable react/prop-types */
import { useMemo } from "react";
import classes from "./Keyboard.module.css";

const KbMap = ({ errors }) => {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["TAB", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\"],
    ["CAPS", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
    ["SHIFTL", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "SHIFTR"],
    ["Space"]
  ];

  const calculateErrorFrequencies = (errors) => {
    if (!Array.isArray(errors)) {
      return {};
    }
    const frequencies = {};
    errors.forEach(({ enteredLetter }) => {
      const key = enteredLetter.toUpperCase();
      frequencies[key] = (frequencies[key] || 0) + 1;
    });
    return frequencies;
  };

  const errorFrequencies = useMemo(() => calculateErrorFrequencies(errors), [errors]);
  console.log("Error Frequencies:", errorFrequencies);

  const maxErrorCount = Math.max(...Object.values(errorFrequencies), 0);
  console.log("Max Error Count:", maxErrorCount);

  const interpolateColor = (errorCount, maxErrorCount) => {
    if (errorCount === 0) return 'rgba(128, 255, 0, 1)'; // Lighter green for no errors
    const ratio = Math.pow(errorCount / maxErrorCount, 0.6); // Square the ratio to emphasize the gradient
    const red = Math.min(255, Math.round(255 * ratio * 0.2)); // Adjust the red component
    const green = Math.min(255, Math.round(255 * (1 - ratio) * 0.8)); // Adjust the green component
    return `rgba(${red}, ${green}, 0, 1)`;
  };
  
  const getBackgroundColor = (key) => {
    const errorCount = errorFrequencies[key] || 0;
    return interpolateColor(errorCount, maxErrorCount);
  };

  return (
    <div className={classes.keyboard}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.keyboardRow}>
          {row.map((key) => (
            <div
              key={key}
              className={classes.keyboardKey}
              style={{ backgroundColor: getBackgroundColor(key) }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KbMap;
