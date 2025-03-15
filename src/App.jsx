import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import LettersPage from './pages/LettersPage';
import WordsPages from './pages/WordsPages';
import ProfilePage from './pages/ProfilePage';
import QuestsPage from './pages/QuestsPage';
import DailyPage from './pages/DailyPage';


function App() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="letters" element={<LettersPage />} />
            <Route path="words" element={<WordsPages />} />
            <Route path="quests" element={<QuestsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="daily" element={<DailyPage />} />
          </Route>
        </Routes>
    </Router>
    );
}

export default App;