import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cbtiData from '../data/cbti.json';
import { UserInfo } from '../types';

/**
 * CBTI 이미지 생성 페이지
 */
const ImageGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCBTI, setSelectedCBTI] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    gender: 'male',
    ageGroup: '20s'
  });
  
  useEffect(() => {
    const cbtiFromUrl = searchParams.get('cbti');
    if (cbtiFromUrl) {
      setSelectedCBTI(cbtiFromUrl);
    }
  }, [searchParams]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const cbtiTypes = Object.keys(cbtiData.CBTI_TYPES);

  const generateImage = async () => {
    if (!selectedCBTI) {
      alert('CBTI 유형을 선택해주세요.');
      return;
    }

    try {
      setImageLoading(true);
      const cbtiTypeData = cbtiData.CBTI_TYPES[selectedCBTI as keyof typeof cbtiData.CBTI_TYPES];
      
      const response = await generateImageWithBedrock(
        userInfo.ageGroup,
        userInfo.gender,
        cbtiTypeData.symbol,
        cbtiTypeData.character
      );
      
      if (response) {
        setGeneratedImageUrl(response);
      } else {
        const placeholderUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=${selectedCBTI}`;
        setGeneratedImageUrl(placeholderUrl);
      }
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      const placeholderUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=${selectedCBTI}`;
      setGeneratedImageUrl(placeholderUrl);
    } finally {
      setImageLoading(false);
    }
  };

  const generateImageWithBedrock = async (
    ageGroup: string,
    gender: string,
    symbol: string,
    character: string
  ): Promise<string | null> => {
    try {
      const symbolTranslation: { [key: string]: string } = {
        '나침반': 'compass', '침대': 'bed', '지도': 'map', '헬멧': 'helmet',
        '별': 'star', '저울': 'scale', '자물쇠': 'padlock', '문서': 'document',
        '로켓': 'rocket', '렌치': 'wrench', '퍼즐': 'puzzle', '그래프': 'graph',
        '열쇠': 'key', '박스': 'box', '각도기': 'protractor', '지구본': 'globe'
      };
      
      const characterTranslation: { [key: string]: string } = {
        '호기심': 'curious', '평온함': 'calm', '사려깊음': 'thoughtful', '침착함': 'composed',
        '창의성': 'creative', '균형감': 'balanced', '책임감': 'responsible', '질서정연함': 'orderly',
        '낙관주의': 'optimistic', '헌신': 'dedicated', '조화': 'harmonious', '세심함': 'attentive',
        '유연성': 'flexible', '규율': 'disciplined', '원칙주의': 'principled', '보호본능': 'protective'
      };
      
      const cleanSymbol = symbol.replace('#', '');
      const cleanCharacter = character.replace('#', '');
      const symbolEn = symbolTranslation[cleanSymbol] || cleanSymbol;
      const characterEn = characterTranslation[cleanCharacter] || cleanCharacter;
      const genderEn = gender === 'male' ? 'man' : 'woman';
      
      const prompt = `Keywords: ${ageGroup} | ${gender} | ${symbolEn} | ${characterEn}
High-quality 3D render in Pixar/DreamWorks style.
The ${genderEn} must be holding a clear ${symbolEn} in their hand.
Clean background, profile photo composition, 1024x1024 resolution.`;
      
      const response = await fetch('/api/bedrock-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const result = await response.json();
      
      if (result.success && result.image) {
        return result.image;
      } else {
        return null;
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      return null;
    }
  };

  const downloadImage = () => {
    if (!generatedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `cbti-${selectedCBTI}-character.png`;
    link.click();
  };

  return (
    <div className="image-generator-container">
      <div className="image-generator-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate('/')}>
            ← 홈으로 돌아가기
          </button>
          <h1>🎨 CBTI 캐릭터 이미지 생성</h1>
          <p>당신의 CBTI 유형을 선택하고 개인화된 캐릭터 이미지를 생성해보세요!</p>
        </div>

        <div className="generator-form">
          <div className="form-section">
            <h3>CBTI 유형 선택</h3>
            <select 
              value={selectedCBTI} 
              onChange={(e) => setSelectedCBTI(e.target.value)}
              className="cbti-select"
            >
              <option value="">CBTI 유형을 선택하세요</option>
              {cbtiTypes.map(type => {
                const typeData = cbtiData.CBTI_TYPES[type as keyof typeof cbtiData.CBTI_TYPES];
                return (
                  <option key={type} value={type}>
                    {type} - {typeData.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-section">
            <h3>개인 정보</h3>
            <div className="form-group">
              <label>성별:</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={userInfo.gender === 'male'}
                    onChange={(e) => setUserInfo({...userInfo, gender: e.target.value as 'male' | 'female'})}
                  />
                  <span>남성</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={userInfo.gender === 'female'}
                    onChange={(e) => setUserInfo({...userInfo, gender: e.target.value as 'male' | 'female'})}
                  />
                  <span>여성</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>연령대:</label>
              <div className="radio-group">
                {['10s', '20s', '30s', '40s', '50s'].map(age => (
                  <label key={age} className="radio-option">
                    <input
                      type="radio"
                      name="ageGroup"
                      value={age}
                      checked={userInfo.ageGroup === age}
                      onChange={(e) => setUserInfo({...userInfo, ageGroup: e.target.value})}
                    />
                    <span>{age}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button 
            className="generate-button" 
            onClick={generateImage}
            disabled={imageLoading || !selectedCBTI}
          >
            {imageLoading ? '이미지 생성 중...' : '🎨 이미지 생성하기'}
          </button>
        </div>

        {(imageLoading || generatedImageUrl) && (
          <div className="image-result">
            <h3>생성된 캐릭터 이미지</h3>
            {imageLoading ? (
              <div className="image-loading">
                <p>AI가 당신만의 캐릭터를 그리고 있습니다...</p>
              </div>
            ) : (
              <div className="image-display">
                <img 
                  src={generatedImageUrl} 
                  alt="Generated Character" 
                  className="generated-image"
                />
                <div className="image-actions">
                  <button className="download-button" onClick={downloadImage}>
                    📥 이미지 다운로드
                  </button>
                  <button className="regenerate-button" onClick={generateImage}>
                    🔄 이미지 재생성
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneratorPage;