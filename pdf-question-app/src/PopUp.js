// PopUp.js
import React from 'react';
import './PopUp.css';

const PopUp = ({ isOpen, onClose, children }) => {
    /**
   * This is the popup component. it contains the file selection and the upload button.
   */
  return (
    <div className={`PopUp ${isOpen ? 'open' : ''}`}> 
      <div className="PopUp-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
