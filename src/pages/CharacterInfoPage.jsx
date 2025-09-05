import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateCBTIType } from '../utils/cbtiCalculator';

/**
 * 사용자 추가 정보 입력 페이지 컴포넌트
 */
const CharacterInfoPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    gender: 'male',
    ageGroup: '20s'
  });

  const handleSubmit = () => {
    // localStorage에서 테스트 답변 가져오기
    const savedAnswers = localStorage.getItem('cbtiAnswers');
    if (!savedAnswers) {
      alert('테스트 답변을 찾을 수 없습니다. 다시 테스트를 진행해주세요.');
      navigate('/test');
      return;
    }

    const answers = JSON.parse(savedAnswers);
    const cbtiType = calculateCBTIType(answers);

    // 사용자 정보 저장
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // 결과 페이지로 이동
    navigate(`/result?type=${cbtiType}`);
  };

  return (
    <div className="character-info-container">
      <div className="info-content">
        <h1 className="page-title">추가 정보 입력</h1>
        <p className="page-subtitle">더 정확한 결과를 위해 추가 정보를 입력해주세요</p>

        <div className="form-section">
          <div className="form-group">
            <h3>성별</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userInfo.gender === 'male'}
                  onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                />
                <span>남성</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userInfo.gender === 'female'}
                  onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                />
                <span>여성</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <h3>연령대</h3>
            <div className="radio-group">
              {['20s', '30s', '40s', '50s'].map(age => (
                <label key={age} className="radio-option">
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    checked={userInfo.ageGroup === age}
                    onChange={(e) => setUserInfo({...userInfo, ageGroup: e.target.value})}
                  />
                  <span>{age === '20s' ? '20대' : age === '30s' ? '30대' : age === '40s' ? '40대' : '50대'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          나의 클라우드 유형 확인하기
        </button>
      </div>
    </div>
  );
};

export default CharacterInfoPage;