// AskQuestion.js
/*
This is the AskQuestion component. It is responsible for handling the user input and sending the question to the backend.

*/
import React, { useState, useEffect } from 'react';
import send_btn from './send.png';
import { useQuestionContext } from './QuestionContext';

const AskQuestion = ({ onAskQuestion, filename, userImage }) => {
    const [question, setQuestion] = useState('');
    const { addQuestion } = useQuestionContext();

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleAskQuestion();
        }
    };
    useEffect(() => {
        console.log('Question:', question);
    }, [question]);

    useEffect(() => {
        console.log('Filename:', filename);
    }, [filename]);

    const handleAskQuestion = async () => {
        
        if (question) {
            // Log the question and filename to console for testing
            console.log('Question:', question);
            console.log('Filename:', filename);};

        if (question && filename) {
            try {

                // Make a POST request to the backend
                const response = await fetch('http://localhost:8000/ask-question/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        question,
                        pdf_metadata: {
                            filename,
                        },
                    }),
                });
                
                console.log('pdf_metadata:', { filename });
                if (response.ok) {
                    const result = await response.json();
                    addQuestion(question, result.answer);
                    onAskQuestion(result.answer);
                    setQuestion(''); 

                } else {
                    // Handle the error response
                    alert('Failed to ask the question:', response.statusText);
                    console.error('Failed to ask the question:', response.statusText);
                }
            } catch (error) {
                alert('Incorrect file:', error);
                console.error('Error while asking the question:', error);
            }
        } else {
            // Display an error message for no question entered
            alert('Please enter a question.');
        }
    };

    return (
        <div className='ask-question-container'>
            <div>
                <textarea id='text-box' placeholder='Send a message...' value={question} onChange={handleQuestionChange}  onKeyDown={handleKeyDown}></textarea>
                <button className='ask-question-button' onClick={handleAskQuestion}><img className='ask-question-button' src={send_btn} alt='sendbtn'></img></button>
            </div>
        </div>
    );
};

export default AskQuestion;
