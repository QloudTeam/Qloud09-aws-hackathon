import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 닉네임 입력 페이지
 */
const NicknameInputPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.trim().length < 2) {
      alert('닉네임은 2글자 이상 입력해주세요.');
      return;
    }

    if (nickname.trim().length > 10) {
      alert('닉네임은 10글자 이하로 입력해주세요.');
      return;
    }

    // 닉네임을 localStorage에 저장
    localStorage.setItem('userNickname', nickname.trim());
    
    // 테스트 페이지로 이동
    navigate('/test');
  };

  return (
    <div className="nickname-input-container">
      <div className="nickname-input-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate('/')}>
            ← 홈으로 돌아가기
          </button>
          <h1>🏷️ 닉네임 입력</h1>
          <p>CBTI 테스트를 시작하기 전에 닉네임을 입력해주세요!</p>
        </div>

        <form onSubmit={handleSubmit} className="nickname-form">
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요 (2-10글자)"
              className="nickname-input"
              maxLength={10}
              autoFocus
            />
            <div className="input-info">
              <span className="char-count">{nickname.length}/10</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="start-test-button"
            disabled={!nickname.trim() || nickname.trim().length < 2}
          >
            🧪 CBTI 테스트 시작하기
          </button>
        </form>

        <div className="info-box">
          <h3>💡 안내사항</h3>
          <ul>
            <li>닉네임은 다른 사용자들과 CBTI 매칭 시 표시됩니다</li>
            <li>2글자 이상 10글자 이하로 입력해주세요</li>
            <li>특수문자, 이모지 사용 가능합니다</li>
            <li>언제든지 변경할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NicknameInputPage;