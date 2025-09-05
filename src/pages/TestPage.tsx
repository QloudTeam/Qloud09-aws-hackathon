import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { TestAnswer } from '../types';
import questionsData from '../data/questions.json';

/**
 * CBTI 테스트 진행 페이지 컴포넌트
 */
const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const questions = questionsData.questions;
  const totalQuestions = questions.length;

  const handleOptionSelect = (trait: string) => {
    setSelectedOption(trait);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    // 현재 답변 저장
    const newAnswer: TestAnswer = {
      questionId: questions[currentQuestion].id,
      selectedTrait: selectedOption
    };

    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(a => a.questionId === newAnswer.questionId);
    
    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setAnswers(updatedAnswers);

    // 마지막 질문인 경우 추가 정보 입력 페이지로 이동
    if (currentQuestion === totalQuestions - 1) {
      // 답변을 localStorage에 저장
      localStorage.setItem('cbtiAnswers', JSON.stringify(updatedAnswers));
      navigate('/character-info');
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // 이전 답변 복원
      const prevAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id);
      setSelectedOption(prevAnswer?.selectedTrait || '');
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="test-container">
      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
      
      <div className="question-section">
        <h2 className="question-text">{currentQ.question}</h2>
        
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option.trait ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option.trait)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          className="nav-button prev-button" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          이전
        </button>
        <button 
          className="nav-button next-button" 
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentQuestion === totalQuestions - 1 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default TestPage;