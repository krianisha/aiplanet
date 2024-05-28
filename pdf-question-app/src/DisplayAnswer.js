// DisplayAnswer.js
/*
This is the DisplayAnswer component. It is responsible for displaying the questions and answers in the application.
*/
import React from 'react';
import { useQuestionContext } from './QuestionContext';

const DisplayAnswer = ({ answer, userImage }) => {
  const { questions } = useQuestionContext();
  return (
    <div id='display-data'>
      {questions.map((q, index) => (
        <div key={index} className='question-container'>
          <div className="user-info">
          <img id='user-img' src={userImage} alt="User"></img>
          <p id='question-answer'>{q.question}</p>
          </div>
          <div className="bot-info">
          <img id='bot-img' src="https://yt3.googleusercontent.com/9RnnCIf9OpQ2vpNowrYw_QAcG3tPSI2iaElvIM7-B13hHwynyZzgnXAm9h8AwwG-gfOnKOT4224=s900-c-k-c0x00ffffff-no-rj" alt="User"></img>
          <p id='question-answer'>{q.answer}</p>
          </div> 
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
