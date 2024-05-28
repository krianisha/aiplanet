// QuestionContext.js
import React, { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  // State to store the list of questions and answers
  const [questions, setQuestions] = useState([]);
  /**
   * Adds a new question and its corresponding answer to the list of questions.
   *
   * @param {string} question - The question text.
   * @param {string} answer - The answer to the question.
   */
  const addQuestion = (question, answer) => {
    setQuestions((prevQuestions) => [...prevQuestions, { question, answer }]);
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);
