/*
This is the main App component. It is responsible for rendering the entire application and managing the state of the application.
*/
import './App.css';
import React, { useState } from 'react';
import PdfUpload from './PdfUpload';
import AskQuestion from './AskQuestion';
import DisplayAnswer from './DisplayAnswer';
import PopUp from './PopUp';
import plus from './plus.png';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [answer, setAnswer] = useState('');
  const [filename, setFilename] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileUpload = (file, filename) => {
      setUploadedFile(file);
      setFilename(filename);
      setIsUploadModalOpen(false);
  };

  const handleAskQuestion = (question) => {
    setAnswer(`${question}` )
  };
  const handleImageClick = () => {
    window.location.reload();
  };
  
return (
  <div>
    <div className='navi-bar'>
    </div>
    <img id='Ai-img' src="https://framerusercontent.com/images/aH0aUDpSiUrVC1nwJAwiUCXUtU.svg" onClick={handleImageClick} alt="" />

    {filename && <p id='file-name' >{filename}</p>}
    <button id='uploadBtn' onClick={() => setIsUploadModalOpen(true)}><img id='upload-plus' src={plus} alt='plusimg'></img><span id='UploadBtn-span' >Upload PDF</span></button>

    <PopUp isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
      <PdfUpload onFileUpload={handleFileUpload} setFilename={setFilename} setIsUploadModalOpen={setIsUploadModalOpen} />
    </PopUp>

    {(
      <>
        <AskQuestion onAskQuestion={handleAskQuestion} filename={filename}/>
        <div id='ask-question-div'>
          {answer && <DisplayAnswer answer={answer} userImage="https://lh3.googleusercontent.com/fife/ALs6j_EK9nzkgdwJsh31FWsM_mhkZytUltgWUXXRUb6Id5dW-fNHHpxCjM71IxAYv44hnVNjK7MAO1irW-dpDFBdWYfXf2_rUchmNmWdEJlBF00FL9qk8WgZexRxtpaJGY6s1gcdjaFrwH6VphMqhuhbJO6lagSw8t2mZKwL_vfni6lW0wPJOMbpb4_q0P2LGH93q1YlGBRxY3Mt--ba7ys5lh9khUBsQwjphTKoQBHNTGpDPWWF6B9G5lUNE46QYWEUU9rbptKwAeiGaBNQ4aUIMTudd3Umx8II04YHK_WL73lYH70RR-Adh56ChcN-_Q7KZSjqRyEYWTQf-hHP59hV49vJAyp1F3DRcn7g-QKaQR2B2CApykW4y6WdSwepxeAhtsD-6aWR6NdccADQdxipqtjGF3EpxIXUB7Fjy__kQddFdRnDp5D7Ycdq9pEPpD5L21gf3dC-JJsdUJTLcBmpQLUc4mHOS2eyKeSTeUYg5zuSV6ZM8h7VUxEJsKV2T9m2sJkx1INWGZhRMBoo2BCRQS1XPCkIcoBmJs-hMn287PSK8PHmi3fuMmw7A2rPqZ7T1gy7BFMgq7tSXqb7SUftuO3uSPvpUyfQaSGnePgIMKhbvuzMSq2Eqp6p5pfT0WrGU7RCmvL40_yc5uHqzPYKMNpeyC_YVBsRUlwDrotDdA3Qc1t1lJ1uLg2cTbldgqmeOetJWlo_4fsKJ_f1szUh1cDyN9qIHFgVRuTTiVS0D0UWOIlCBaNPBOLkFHzxRcWvrHoY4tvzdqGsX8bzRHPo3D3fchw4Ut_xe4Ih5nratQBby4LM-9MuGtytV5e0Wqa28bPX5ah02t8wIRcLcmwEl7uPJZ8ibh4tZXuN0u7R8chgTZ8VkSVvvpC__D4cfmewpwRZtvkrEoQ4tSvEiCqWDp2rsw37i_FA1joWqp7AgtVXQ7Ij_-crl2W4GugLVc6jJGSr6XghDN2u4SKC8w-yENhCIuDgqX1YdfzeMU13kZgRMRfPa63ylaEX_tFL5dFPn-2JhvHbks9ZrFayuOr2ZaxNvoLOraY6fX5h8E_eia7CMaTPvyEk2jA8n82VGW0q4fPmyv0P6LTEBPqk7wVj2DG6nTK155UNwHNQfGAAvuStMuLguFmQvCxiIDstvv_3tijUXlK6FBfLyVLS2wrNuKnHXj0OP9zlTU07hmVg7XAKXA_vXTS3j8ZmHtm6B3Fw9cLKKaSt6uUbklasIRR8eirdkRT5ivTBiYYOQBxyqDsAupHS73szrQ_fmlSnlRydatnNVeN6dKuoqgtNYeIKga5080YHgfjEX_Pj5_xkiflOFlazg1wOca9Gb5-253Ck1g3N5lG6jeNiTuxRb1AE04AZPwLjWmLi3bukJUWI4s-aqL3fDTcjF_hLiy67f0fKk-KTyU1pE6GqQ_34Vt7u_KXnoVFcU9gxOhD4cjkb=s32-c"/>}
        </div>
      </>
    )}

    {/* Additional Modal for Displaying Answer write the code such that if no pdf is there it tells to add pdf*/}
    <PopUp isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      <p>{answer}</p>
    </PopUp>
  </div>
);
};


export default App;
