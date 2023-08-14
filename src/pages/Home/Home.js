import React, { useState, useEffect } from "react";
import LevelSelection from "./LevelSelection";
import AnswerSubmission from "./AnswerSubmission";
import ErrorDisplay from "./ErrorDisplay";
import { useNavigate } from "react-router-dom";
import LogoBg from "../../assets/svgs/LogoBg.svg";
import {
    baseUrl,
    accessKey,
    secretKey,
    currentDate,
    dateISO,
    currentDayOfYear
} from "../../utils/config";
import Papa from "papaparse";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [showLogo, setShowLogo] = useState(true);
    const [level, setLevel] = useState("");
    const [playCount, setPlayCount] = useState(1);
    const [count, setCount] = useState(1);
    const [error, setError] = useState("");
    const [wrongAnswer, setWrongAnswer] = useState("");
    const [answer, setAnswer] = useState("");
    const [input, setInput] = useState("");
    const [correct, setCorrect] = useState(false)
    const [inCorrect, setInCorrect] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // comented for now to avoid changing date in localstorage do not remove
        // if (localStorage.getItem("date") === currentDate) {
        //     if (localStorage.getItem("easyLost") && localStorage.getItem("mediumLost") && localStorage.getItem("hardLost") !== null) {
        //         navigate("/notAllowed");
        //     }
        //     if (localStorage.getItem("easyWon") && localStorage.getItem("mediumWon") && localStorage.getItem("hardWon") !== null) {
        //         navigate("/alreadyWon");
        //     }
        // }
        console.log(currentDayOfYear, navigate)
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 3000);
        if (level)
            fetchAnswer();
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level]);

    const fetchAnswer = async () => {
        try {
            const config = {
                headers: {
                    "X-Amz-Date": dateISO,
                },
                Authorization: `AWS ${accessKey}:${secretKey}`,
            };

            const response = await axios.get(
                `${baseUrl.s3BucketUrl}keval-admin_accessKeys.csv`,
                config
            );
            console.log(`${currentDayOfYear - 221}-${level}`, 'keval')

            Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const filteredData = results.data.filter(
                        (item) => item.date === `${currentDayOfYear - 221}-${level}`
                    );
                    setAnswer(filteredData[0].value);
                    console.log(filteredData[0].value)
                },
            });
        } catch (error) {
            setError("Failed to retrieve MP3 file");
        }
    };

    const handleAudioEnded = () => {
        setPlayCount((prevCount) => prevCount + 1);
    };

    const getErrorMessage = () => {
        const texts = [
            "Sorry that is wrong. Give it another shot - we believe in you!",
            "Try again please.",
            "Almost there try again."
        ];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }
    const handleSubmit = () => {
        const levelKeys = {
            easy: {
                played: 'easyPlayed',
                streak: 'easyStreak',
                won: 'easyWon',
                lost: 'easyLost',
            },
            medium: {
                played: 'mediumPlayed',
                streak: 'mediumStreak',
                won: 'mediumWon',
                lost: 'mediumLost',
            },
            hard: {
                played: 'hardPlayed',
                streak: 'hardStreak',
                won: 'hardWon',
                lost: 'hardLost',
            },
        };

        const levelData = levelKeys[level];

        const played = localStorage.getItem(levelData.played);
        const streak = localStorage.getItem(levelData.streak);
        const won = localStorage.getItem(levelData.won);
        const lost = localStorage.getItem(levelData.lost);

        if (input.toLocaleLowerCase() === answer.toLowerCase()) {
            localStorage.setItem(levelData.played, played !== null ? parseInt(played) + 1 : 1);
            setWrongAnswer('');
            setCorrect(true);
            localStorage.setItem("date", currentDate);
            localStorage.setItem(levelData.streak, streak !== null ? parseInt(streak) + 1 : 1);
            localStorage.setItem(levelData.won, won !== null ? parseInt(won) + 1 : 1);
        } else {
            setWrongAnswer(getErrorMessage());
            setCount((prevCount) => prevCount + 1);
            setInput("");
            if (count >= 4) {
                setWrongAnswer('Sorry you have run out of tries today. Better luck tomorrow!');
                localStorage.setItem(levelData.played, played !== null ? parseInt(played) + 1 : 1);
                localStorage.setItem(levelData.lost, lost !== null ? parseInt(lost) + 1 : 1);
                localStorage.setItem("date", currentDate);
                localStorage.setItem(levelData.streak, 0);
                setCorrect(false);
                setInCorrect(true);
            }
        }
    };


    return (
        <>
            <>
                {showLogo && (
                    <div className="logo logo-animation">
                        <img src={LogoBg} alt="logo fades in" />
                    </div>
                )}

                {!showLogo && level === "" && <LevelSelection setLevel={setLevel} />}

                {!showLogo && level !== "" && error === "" && (
                    <AnswerSubmission
                        baseUrl={baseUrl}
                        playCount={playCount}
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        handleAudioEnded={handleAudioEnded}
                        wrongAnswer={wrongAnswer}
                        correct={correct}
                        inCorrect={inCorrect}
                        currentDayOfYear={currentDayOfYear}
                        level={level}
                    />
                )}

                {!showLogo && level !== "" && error !== "" && (
                    <ErrorDisplay error={error} />
                )}
            </>
        </>
    );
};

export default Home;
