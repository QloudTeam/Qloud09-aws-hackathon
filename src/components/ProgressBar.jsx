import React from 'react';

/**
 * 테스트 진행 상황을 표시하는 프로그레스 바 컴포넌트
 */
const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-title">CBTI TEST</span>
        <span className="progress-count">{current}/{total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;