import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import CharacterInfoPage from './pages/CharacterInfoPage';
import ResultPage from './pages/ResultPage';
import './App.css';

/**
 * 메인 애플리케이션 컴포넌트
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/character-info" element={<CharacterInfoPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;