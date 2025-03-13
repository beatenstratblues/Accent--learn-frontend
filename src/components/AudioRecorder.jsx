import React, { useState, useRef } from 'react';
import axios from 'axios';

function AudioRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [referenceText, setReferenceText] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const audioContextRef = useRef(null);

    const startRecording = async () => {
        try {
            // Reset chunks
            audioChunksRef.current = [];
            
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

    const sendAudio = async (blob) => {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');  // Always use .webm extension for consistency
        formData.append('referenceText', referenceText);
        formData.append('originalSampleRate', audioContextRef.current?.sampleRate || '0'); // Send this info to backend
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/process_audio', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
            setError(null);
        } catch (err) {
            console.error("API error:", err);
            setError(err.response?.data?.error || err.message || 'An error occurred.');
        }
    };

    const handleTextChange = (event) => {
        setReferenceText(event.target.value);
    };

    const downloadBlob = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Reference Text"
                value={referenceText}
                onChange={handleTextChange}
            />
            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <p>Extracted Text: {result.extractedText}</p>
                    <p>Similarity Score: {result.similarityScore.toFixed(2)}%</p>
                </div>
            )}
            {audioBlob && (
                <div>
                    <button onClick={() => downloadBlob(audioBlob, 'recorded_audio.webm')}>
                        Download Audio
                    </button>
                    {/* <audio controls src={URL.createObjectURL(audioBlob)} /> */}
                </div>
            )}
        </div>
    );
}

export default AudioRecorder;