import React from 'react'
import AudioRecorder from '../components/AudioRecorder'

const WordsPages = () => {
  return (
    <div className='wordPage'>
      <div className='pageTitle'>Type in any word and test your accent!!<img width="40" height="40" src="https://img.icons8.com/fluency/48/dictionary.png" alt="dictionary"/></div>
      <AudioRecorder/>
    </div>
  )
}

export default WordsPages