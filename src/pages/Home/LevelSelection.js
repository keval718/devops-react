import React from 'react';
import './LevelSelection.css'

const LevelSelection = ({ setLevel }) => {
    const handleLevelSelection = (level) => {
        setLevel(level);
    };

    return (
        <>
            <div className='container'>
                <div className="level-text" onClick={() => handleLevelSelection('easy')}>
                    Easy Peazy...   (Easy)
                </div>
                {/* 
                <div className="level-text" onClick={() => handleLevelSelection('medium')}>
                    Not so breezy... (Medium)
                </div> */}

                <div className="level-text" onClick={() => handleLevelSelection('hard')}>
                    Got me dizzy...   (Hard)
                </div>
            </div>
        </>
    );
};

export default LevelSelection;
