import React, { useState, useEffect } from 'react';
import DailyChallengeAudioRecorder from '../components/DailyChallengeAudioRecorder';

const DailyPage = () => {
  const [dailyWord, setDailyWord] = useState('');
  const [challengeDate, setChallengeDate] = useState('');

  // List of words for random selection
  const wordList = [
    'pronunciation', 'opportunity', 'thoroughly', 'specifically', 'enthusiasm',
    'necessarily', 'phenomenon', 'particularly', 'enthusiasm', 'vocabulary',
    'extraordinary', 'deliberately', 'accommodate', 'restaurant', 'inevitable'
  ];

  useEffect(() => {
    try {
      // Set today's date
      const today = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      setChallengeDate(today.toLocaleDateString('en-US', options));
      
      // Generate a word based on the date
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
      const wordIndex = dayOfYear % wordList.length;
      setDailyWord(wordList[wordIndex]);
    } catch (error) {
      console.error("Error in Daily Challenge initialization:", error);
    }
  }, []);

  return (
    <div className='challengePage'>
      <div className='pageTitle'>
        Daily Quest &nbsp;
        <img width="40" height="40" src="https://img.icons8.com/fluency/48/calendar.png" alt="calendar"/>
      </div>
      
      <div style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        <h3>{challengeDate}</h3>
      </div>
      
      <div style={{ 
        backgroundColor: '#202F36', 
        padding: '30px', 
        borderRadius: '15px', 
        color: 'white',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h2>Today's Word:</h2>
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: '#4A4DFE',
          margin: '20px 0'
        }}>
          {dailyWord}
        </div>
        <p style={{ color: '#ccc' }}>Try to pronounce this word correctly</p>
      </div>
      <DailyChallengeAudioRecorder dailyWord={dailyWord}/>
    </div>
  );
};

export default DailyPage;