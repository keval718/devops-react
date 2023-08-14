import React from 'react';
import ReactAudioPlayer from 'react-audio-player';


const AudioPlayer = ({ mp3File, onAudioEnded, autoPlay, controls, style }) => {
    const handleAudioEnded = () => {
        if (onAudioEnded) {
            onAudioEnded();
        }
    };
    return (
        <ReactAudioPlayer
            src={mp3File}
            autoPlay={autoPlay}
            controls={controls}
            onEnded={handleAudioEnded}
            style={style} />
    )
}

export default AudioPlayer;