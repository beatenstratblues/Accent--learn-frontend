import React, { useState, useRef } from 'react';
import axios from 'axios';

function AlphabetRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const audioContextRef = useRef(null);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    console.log(import.meta.env.VITE_ML_URL);
    
    // Helper function to get phonetic pronunciation for letters
    const getLetterPhonetic = (letter) => {
        // Map letters to phonetic pronunciations
        const phonetics = {
            'A': 'a', // Long A sound
            'B': 'b',
            'C': 'c',
            'D': 'd',
            'E': 'e',  // Long E sound
            'F': 'f',
            'G': 'g',
            'H': 'h',
            'I': 'i', // Long I sound
            'J': 'j',
            'K': 'k',
            'L': 'l',
            'M': 'm',
            'N': 'n',
            'O': 'o',  // Long O sound
            'P': 'p',
            'Q': 'q',
            'R': 'r',
            'S': 's',
            'T': 't',
            'U': 'u', // Long U sound
            'V': 'v',
            'W': 'w',
            'X': 'x',
            'Y': 'y',
            'Z': 'zee'  // 'zed' in British English
        };
        
        return phonetics[letter] || letter;
    };

    const selectLetter = (letter) => {
        setSelectedLetter(letter);
        playLetterSound(letter);
    };

    const playLetterSound = (letter) => {
        // Use phonetic pronunciation instead of just the letter
        const phonetic = getLetterPhonetic(letter);
        
        // Configure speech synthesis for clear pronunciation
        const utterance = new SpeechSynthesisUtterance(phonetic);
        utterance.rate = 0.9;     // Slightly slower for clarity
        utterance.pitch = 1.0;    // Normal pitch
        utterance.volume = 1.0;   // Full volume
        
        // Use a specific voice if available (optional)
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.includes('en-'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        // Cancel any ongoing speech and speak the new letter
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };

    // Using the exact same recording implementation from working AudioRecorder
    const startRecording = async () => {
        if (!selectedLetter) {
            setError("Please select a letter first!");
            return;
        }

        try {
            // Reset chunks
            audioChunksRef.current = [];
            setResult(null);
            setError(null);
            setAudioUrl(null);
            
            // Get audio stream with specific constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            streamRef.current = stream;
            
            // Create audio context (browser might ignore requested sample rate)
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 16000
            });
            console.log(`AudioContext sample rate: ${audioContextRef.current.sampleRate}Hz`);
            
            // Get actual track settings (for debugging)
            const audioTrack = stream.getAudioTracks()[0];
            console.log("Track settings:", audioTrack.getSettings());
            
            // Create MediaRecorder with WAV MIME type (if supported)
            const options = { mimeType: 'audio/webm' };
            mediaRecorderRef.current = new MediaRecorder(stream, options);
            console.log(`Using MIME type: ${mediaRecorderRef.current.mimeType}`);
            
            // Collect data
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            
            // Handle recording stop
            mediaRecorderRef.current.onstop = () => {
                // Create blob from chunks
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                
                // Create URL for audio playback
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                
                // Send to backend
                sendAudio(audioBlob);
            };
            
            // Start recording with frequent data chunks for reliable stopping
            mediaRecorderRef.current.start(100);
            setRecording(true);
            
        } catch (err) {
            setError('Error accessing microphone: ' + err.message);
            console.error("Recording error:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            
            // Stop tracks
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    };

    // Modified sendAudio implementation to use simple letter as reference text
    const sendAudio = async (blob) => {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');  // Always use .webm extension for consistency
        
        // KEY CHANGE: Use just the single letter as the reference text
        formData.append('referenceText', selectedLetter.toLowerCase());  // Using lowercase to be consistent
        
        formData.append('originalSampleRate', audioContextRef.current?.sampleRate || '0');
        
        try {
            console.log(`Sending audio with reference text: "${selectedLetter.toLowerCase()}"`);
            console.log('Audio blob size:', Math.round(blob.size / 1024), 'KB');
            
            const response = await axios.post(`${import.meta.env.VITE_ML_URL}/process_audio`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            console.log('API response:', response.data);
            setResult(response.data);
            setError(null);
        } catch (err) {
            console.error("API error:", err);
            setError(err.response?.data?.error || err.message || 'An error occurred.');
        }
    };

    return (
        <div className='alphabet-recorder'>
            <div className='alphabet-container'>
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        className={`letter-button ${selectedLetter === letter ? 'selected' : ''}`}
                        onClick={() => selectLetter(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            
            <div className='selected-letter'>
                {selectedLetter && (
                    <p>Selected Letter: <span>{selectedLetter}</span></p>
                )}
            </div>
            
            <div className='recorder-controls'>
                {recording ? (
                    <button onClick={stopRecording}>
                        <img width="48" height="48" src="https://img.icons8.com/flat-round/64/stop.png" alt="stop"/>
                    </button>
                ) : (
                    <button onClick={startRecording} disabled={!selectedLetter}>
                        <img width="48" height="48" src="https://img.icons8.com/color/48/microphone.png" alt="microphone"/>
                    </button>
                )}
            </div>

            {error && <p className="error-message">{error}</p>}
            
            {result && (
                <div className='similarity-result'>
                    <p>Extracted Letter: <span>{result.extractedText || "(none)"}</span></p>
                    <p>Similarity Score: <span>{result.similarityScore.toFixed(2)}%</span></p>
                </div>
            )}
        </div>
    );
}

export default AlphabetRecorder;