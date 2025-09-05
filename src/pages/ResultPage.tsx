import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CBTIType, UserInfo } from '../types';
import cbtiData from '../data/cbti.json';
import html2canvas from 'html2canvas';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

/**
 * CBTI 테스트 결과 페이지 컴포넌트
 */
const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cbtiType, setCbtiType] = useState<CBTIType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const type = searchParams.get('type');

  useEffect(() => {
    if (!type || !cbtiData.CBTI_TYPES[type as keyof typeof cbtiData.CBTI_TYPES]) {
      navigate('/');
      return;
    }

    // CBTI 유형 데이터 설정
    setCbtiType(cbtiData.CBTI_TYPES[type as keyof typeof cbtiData.CBTI_TYPES]);

    // 사용자 정보 가져오기
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    // Bedrock 이미지 생성 (실제 구현에서는 API 호출)
    generateBedrockImage(type, JSON.parse(savedUserInfo || '{}'));
  }, [type, navigate]);

  const generateBedrockImage = async (cbtiType: string, userInfo: UserInfo) => {
    // 로컬 개발용 플레이스홀더 이미지
    const placeholderUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=${cbtiType}`;
    setGeneratedImageUrl(placeholderUrl);
  };

  const handleDownload = async () => {
    const element = document.getElementById('result-content');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `cbti-result-${type}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleShare = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
  };

  const handleSlack = () => {
    window.open('https://slack.com', '_blank');
  };

  const handleRestart = () => {
    localStorage.removeItem('cbtiAnswers');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (!cbtiType) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="result-container">
      <div id="result-content" className="result-content">
        {/* Top Section */}
        <div className="result-top">
          <h1>당신의 클라우드 유형은...</h1>
          <div className="type-info">
            <h2>{cbtiType.character}, {cbtiType.name}</h2>
            <p>{cbtiType.name} 유형은 {cbtiType.description}.</p>
            <div className="symbol">#{cbtiType.symbol}</div>
          </div>
        </div>

        {/* Middle Section - Bedrock 이미지 */}
        <div className="result-middle">
          {generatedImageUrl && (
            <img 
              src={generatedImageUrl} 
              alt="Generated Character" 
              className="generated-image"
            />
          )}
        </div>

        {/* Bottom Section */}
        <div className="result-bottom">
          <div className="architecture-section">
            <h3>{cbtiType.name}을 위한 추천 아키텍처</h3>
            <ArchitectureDiagram 
              cbtiType={type || 'ASEV'} 
              recommendedServices={cbtiType.recommended_services || []}
            />
          </div>

          <div className="action-buttons">
            <button className="action-button slack-button" onClick={handleSlack}>
              슬랙으로 이동
            </button>
            <div className="button-group">
              <button className="action-button" onClick={handleRestart}>
                다시하기
              </button>
              <button className="action-button" onClick={handleDownload}>
                다운로드
              </button>
              <button className="action-button" onClick={handleShare}>
                링크공유
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;