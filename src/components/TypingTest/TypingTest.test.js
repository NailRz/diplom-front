/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; 
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import testDataReducer from "../../features/testData/testDataSlice";
import testStatesReducer from "../../features/testStatesSlice/testStatesSlice";
import { TypingTest } from "./TypingTest";


const store = configureStore({
  reducer: {
    testData: testDataReducer,
    testStates: testStatesReducer,
  },
});


const renderWithProviders = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

test("Рендерит компонент TypingTest с начальными словами", () => {
  const words = ["tests", "words"];
  renderWithProviders(<TypingTest wordsProp={words} isWordsLoading={false} />);

  expect(screen.getByText("60")).toBeInTheDocument();
  

  expect(screen.getByText("tests")).toBeInTheDocument();
  expect(screen.getByText("words")).toBeInTheDocument();
});

test("Запуск теста при вводе текста", () => {
  renderWithProviders(<TypingTest wordsProp={["tests", "words"]} isWordsLoading={false} />);
  const input = screen.getByRole("textbox");


  fireEvent.keyDown(window, { key: "a" });
  fireEvent.change(input, { target: { value: "h" } });

  expect(input.value).toBe("h");
});

test("Обновление WPM по мере ввода текста", () => {
  renderWithProviders(<TypingTest wordsProp={["tests", "words"]} isWordsLoading={false} />);
  const input = screen.getByRole("textbox");


  fireEvent.keyDown(window, { key: "a" });
  fireEvent.change(input, { target: { value: "tests" } });

  expect(screen.getByText(/Количество слов в минуту \(WPM\):/)).toBeInTheDocument();
});
