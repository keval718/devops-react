import React, { useState } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Papa from "papaparse";
import { baseUrl, accessKey, secretKey, currentDate, dateISO } from '../../utils/config';
const Home = () => {
    const [mp3File, setMp3File] = useState('');
    const [error, setError] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const handleFetch = async () => {
        setError(null);
        try {
            const config = {
                headers: {
                    'X-Amz-Date': dateISO,
                },
                Authorization: `AWS ${accessKey}:${secretKey}`,

            };
            const response = await axios.get(`${baseUrl.s3BucketUrl}Keval-admin_accessKeys.csv`, config);
            Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column name and their values
                    // eslint-disable-next-line array-callback-return
                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    // Parsed Data Response in array format
                    setParsedData(results.data);
                    const filteredData = results.data.filter(item => item.date === currentDate);
                    console.log(filteredData[0].value)


                },
            });
            setMp3File(response);
            console.log(parsedData, 'keval')
        } catch (error) {
            setError('Failed to retrieve MP3 file');
        }
    };

    const handleAudioEnded = () => {
        // Increment the playCount
        console.log('keval')
    };

    return (
        <div>
            <h1>MP3 File Playback</h1>
            <button onClick={handleFetch}>Fetch and Play</button>
            {mp3File && (
                <div>
                    <ReactAudioPlayer src={`https://listenup-sounds.s3.amazonaws.com/${currentDate}.mp3`} autoPlay controls onEnded={handleAudioEnded} style={{ pointerEvents: '' }} />
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Home;
