import React from "react";
import AlphabetRecorder from "../components/AlphabetRecorder";

const LettersPage = () => {
  return (
    <div className="letterPage">
      <div className="pageTitle">
        <h3>Practice Alphabet Pronunciation</h3>
      </div>
      <AlphabetRecorder />
    </div>
  );
};

export default LettersPage;
