import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import HeardBars from '../../assets/svgs/heard-bars.svg'
import Play from '../../assets/svgs/play.png'
import './AnswerSubmission.css';

const AnswerSubmission = ({ baseUrl, playCount, input, setInput, handleSubmit, handleAudioEnded, wrongAnswer, correct, inCorrect, currentDayOfYear, level }) => {
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const handlePlayer = () => {

        if (audioRef.current && playCount <= 4) {
            audioRef.current.play();
        }
    }
    return (
        <>
            <div className="player">
                <img src={HeardBars} alt="player" onClick={handlePlayer} />
                <img src={Play} alt="play button" onClick={handlePlayer} className='heardbars-action' />
                <audio ref={audioRef} src={`${baseUrl.s3BucketUrl}${currentDayOfYear - 221}-${level}.wav`} onEnded={handleAudioEnded} />
            </div>
            <div className='player-main'>
                {correct &&
                    <div className='correct-answer-text'>
                        YES SIR! That’s correct!
                    </div>}
                {wrongAnswer !== '' ?
                    <div className='wrong-answer-text'>
                        {wrongAnswer}
                    </div> : (null)}
                {correct || inCorrect ? (null) : (<input type="text" className='player-input' name="userInput" placeholder='Type what you think that sound is!' value={input} onChange={(e) => setInput(e.target.value)} />)}
                {correct || inCorrect ? (<button className='player-button' onClick={() => navigate("/stats")}>View Stats</button>) : (<button className='player-button' onClick={handleSubmit}>Submit</button>)}
            </div >

        </>
    );
};

export default AnswerSubmission;
