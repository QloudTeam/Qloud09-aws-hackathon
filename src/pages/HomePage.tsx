import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 메인 홈페이지 컴포넌트
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1 className="main-title">CBTI</h1>
          <p className="subtitle">Cloud-Based Type Indicator</p>
          <button className="start-button" onClick={handleStartTest}>
            지금 시작하기
          </button>
        </div>
        
        <div className="info-sections">
          <div className="info-section">
            <h2>CBTI 소개</h2>
            <p>당신의 클라우드 성향을 분석하여 16가지 유형으로 분류합니다</p>
          </div>
          
          <div className="info-section">
            <h2>CBTI 성향 소개</h2>
            <p>기술적 접근부터 비즈니스 중심까지 다양한 클라우드 전문가 유형을 확인하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;