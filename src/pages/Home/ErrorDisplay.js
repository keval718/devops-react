import React from 'react';
import './ErrorDisplay.css'

const ErrorDisplay = ({ error }) => {
    return (
        <div className='error'>{error}</div>
    );
};

export default ErrorDisplay;
