import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CBTIType, UserInfo } from '../types';
import cbtiData from '../data/cbti.json';
import html2canvas from 'html2canvas';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import LocalTestNotice from '../components/LocalTestNotice';
import { handleSlackIntegration } from '../utils/slackIntegration';
import { generateArchitecture } from '../utils/architectureGenerator';
import { generateCloudFormationTemplate } from '../utils/cloudFormationGenerator';

//mport { handleSlackIntegration } from '../utils/slackIntegration';
// import { generateArchitecture } from '../utils/architectureGenerator';
// import { generateCloudFormationTemplate } from '../utils/cloudFormationGenerator';

/**
 * CBTI 테스트 결과 페이지 컴포넌트
 */
const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cbtiType, setCbtiType] = useState<CBTIType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

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

    // Bedrock 이미지 생성 (비동기로 처리)
    if (savedUserInfo) {
      const parsedUserInfo = JSON.parse(savedUserInfo);
      const cbtiTypeData = cbtiData.CBTI_TYPES[type as keyof typeof cbtiData.CBTI_TYPES];
      
      setTimeout(() => {
        generateBedrockImageWithData(type, parsedUserInfo, cbtiTypeData);
      }, 100);
    }
  }, [type, navigate]);

  const generateBedrockImageWithData = async (cbtiTypeKey: string, userInfo: UserInfo, cbtiTypeData: CBTIType) => {
    try {
      if (!cbtiTypeKey || !cbtiTypeData || !userInfo) return;
      
      setImageLoading(true);
      
      console.log('이미지 생성 데이터:', {
        ageGroup: userInfo.ageGroup,
        gender: userInfo.gender,
        symbol: cbtiTypeData.symbol,
        character: cbtiTypeData.character
      });
      
      // Bedrock Nova Canvas를 사용하여 이미지 생성
      const response = await generateImageWithBedrock(
        userInfo.ageGroup,
        userInfo.gender,
        cbtiTypeData.symbol,
        cbtiTypeData.character
      );
      
      if (response) {
        setGeneratedImageUrl(response);
      } else {
        // 실패 시 플레이스홀더 이미지
        const placeholderUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=${cbtiTypeKey}`;
        setGeneratedImageUrl(placeholderUrl);
      }
    } catch (error) {
      console.error('Bedrock 이미지 생성 오류:', error);
      const placeholderUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=${cbtiTypeKey}`;
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
      // 한국어 symbol을 영어로 번역
      const symbolTranslation: { [key: string]: string } = {
        '나침반': 'compass',
        '침대': 'bed',
        '지도': 'map',
        '헬멧': 'helmet',
        '별': 'star',
        '저울': 'scale',
        '자물쇠': 'padlock',
        '문서': 'document',
        '로켓': 'rocket',
        '렌치': 'wrench',
        '퍼즐': 'puzzle',
        '그래프': 'graph',
        '열쇠': 'key',
        '박스': 'box',
        '각도기': 'protractor',
        '지구본': 'globe'
      };
      
      // 한국어 character를 영어로 번역
      const characterTranslation: { [key: string]: string } = {
        '호기심': 'curious',
        '평온함': 'calm',
        '사려깊음': 'thoughtful',
        '침착함': 'composed',
        '창의성': 'creative',
        '균형감': 'balanced',
        '책임감': 'responsible',
        '질서정연함': 'orderly',
        '낙관주의': 'optimistic',
        '헌신': 'dedicated',
        '조화': 'harmonious',
        '세심함': 'attentive',
        '유연성': 'flexible',
        '규율': 'disciplined',
        '원칙주의': 'principled',
        '보호본능': 'protective'
      };
      
      const cleanSymbol = symbol.replace('#', '');
      const cleanCharacter = character.replace('#', '');
      const symbolEn = symbolTranslation[cleanSymbol] || cleanSymbol;
      const characterEn = characterTranslation[cleanCharacter] || cleanCharacter;
      const genderEn = gender === 'male' ? 'man' : 'woman';
      const genderPronoun = gender === 'male' ? 'his' : 'her';
      
      // Symbol별 자연스러운 상황 설정
      const symbolActions: { [key: string]: string } = {
        'compass': 'looking at a compass with curiosity, as if planning an adventure',
        'bed': 'sitting peacefully on a comfortable bed, looking relaxed and content',
        'map': 'studying a detailed map spread out, pointing to destinations with thoughtful concentration',
        'helmet': 'wearing a safety helmet confidently, ready for important work',
        'star': 'gazing up at a glowing star in hand, eyes filled with wonder and creativity',
        'scale': 'carefully balancing a precision scale, focused on achieving perfect equilibrium',
        'padlock': 'securely holding a golden padlock, symbolizing trust and protection',
        'document': 'organizing important documents methodically, showing attention to detail',
        'rocket': 'excitedly holding a small rocket model, dreaming of future possibilities',
        'wrench': 'skillfully using a wrench to fix something, showing dedication to craft',
        'puzzle': 'solving a colorful puzzle piece by piece, demonstrating patience and harmony',
        'graph': 'analyzing data on a glowing chart, paying close attention to every detail',
        'key': 'holding a master key that opens many doors, representing flexibility and access',
        'box': 'carefully organizing items in a structured box, showing discipline and order',
        'protractor': 'measuring angles with a protractor precisely, following strict principles',
        'globe': 'protectively cradling a small globe, caring for the world around them'
      };
      
      const symbolAction = symbolActions[symbolEn] || `holding a ${symbolEn} meaningfully`;
      
      const prompt = `Keywords (all must appear): ${ageGroup} | ${gender} | ${symbolEn} | ${characterEn}
Rule: Do not create unless all four keywords are represented.

Create a high-quality 3D render in Pixar/DreamWorks animation style: A ${characterEn} ${genderEn} in ${genderPronoun} ${ageGroup} ${symbolAction}. The scene should feel natural and storytelling, with the ${symbolEn} being an integral part of the character's activity, not just a prop. The ${genderEn} should have a ${characterEn} facial expression that matches the action. 

Visual details: Soft, warm lighting that enhances the ${characterEn} mood. Clean, simple background that doesn't distract from the main subject. The ${symbolEn} should be clearly visible and contextually meaningful to the scene. Character should look approachable and friendly with Pixar-style features.

Framing: Square 1:1 ratio, medium close-up shot, centered composition with the character and ${symbolEn} both clearly visible in the frame.`;
      
      console.log('생성된 프롬프트:', prompt);
      console.log('CBTI 데이터 확인:', { 
        ageGroup, 
        gender, 
        symbol: `${cleanSymbol} -> ${symbolEn}`, 
        character: `${cleanCharacter} -> ${characterEn}` 
      });

      // 백엔드 API 호출
      console.log('백엔드 API 호출 시작...');
      
      const response = await fetch('/api/bedrock-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const result = await response.json();
      
      console.log('백엔드 API 응답 수신:', result);
      
      if (result.success && result.image) {
        console.log('이미지 생성 성공!');
        return result.image;
      } else {
        console.error('이미지 생성 실패:', result.error);
        return null;
      }
      
    } catch (error) {
      console.error('API 호출 오류:', error);
      
      // 오류 시 플레이스홀더 이미지 반환
      const encodedText = encodeURIComponent(`${symbol.replace('#', '')}+${character.replace('#', '')}`);
      return `https://via.placeholder.com/400x400/667eea/ffffff?text=${encodedText}`;
    }
  };

  
  // 페이지 전체를 이미지로 저장
  const handlePageSave = async () => {
    const element = document.getElementById('result-content');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `cbti-result-${type}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // CloudFormation YAML 파일 다운로드
  const handleCodeDownload = () => {
    if (!cbtiType || !type) return;
    
    // CBTI 유형별 CloudFormation 템플릿 파일 매핑
    const fileMapping: { [key: string]: string } = {
      'ASEO': 'ASEO-platform-service.yaml',
      'ASEV': 'ASEV-serverless-api.yaml', 
      'ASRO': 'ASRO-monitoring-system.yaml',
      'ASRV': 'ASRV-architecture-designer.yaml',
      'ACEO': 'ACEO-delivery-engineer.yaml',
      'ACEV': 'ACEV-fullstack-pioneer.yaml',
      'ACRO': 'ACRO-edge-guardian.yaml', 
      'ACRV': 'ACRV-security-developer.yaml',
      'ISEO': 'ISEO-enterprise-webapp.yaml',
      'ISEV': 'ISEV-global-web-service.yaml',
      'ISRO': 'ISRO-backup-monitoring.yaml',
      'ISRV': 'ISRV-global-cdn.yaml',
      'ICEO': 'ICEO-auto-scaling.yaml',
      'ICEV': 'ICEV-iac-infrastructure.yaml',
      'ICRO': 'ICRO-governance-infrastructure.yaml',
      'ICRV': 'ICRV-security-website.yaml'
    };
    
    const yamlFileName = fileMapping[type] || `${type}-architecture.yaml`;
    const link = document.createElement('a');
    link.href = `/cloudformation-templates/${yamlFileName}`;
    link.download = yamlFileName;
    link.click();
  };

  // 슬랙 커뮤니티 가입
  const handleSlackCommunity = () => {
    // 슬랙 워크스페이스 초대 링크로 리디렉션
    const slackInviteUrl = 'https://join.slack.com/t/the-cbti/shared_invite/zt-3cspruxbq-RZK7pumghk6tiR8Cw~BwsA';
    window.open(slackInviteUrl, '_blank');
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
            <div className="cbti-code">{type}</div>
            <h2>{cbtiType.name}</h2>
            <p>{cbtiType.description}</p>
            <div className="hashtags">
              <span className="hashtag">{cbtiType.symbol}</span>
              <span className="hashtag">{cbtiType.character}</span>
            </div>
          </div>
        </div>

        {/* Middle Section - Bedrock 이미지 */}
        <div className="result-middle">
          {imageLoading ? (
            <div className="image-loading">
              <p>이미지 생성 중...</p>
            </div>
          ) : generatedImageUrl ? (
            <img 
              src={generatedImageUrl} 
              alt="Generated Character" 
              className="generated-image"
            />
          ) : (
            <div className="image-placeholder">
              <p>이미지를 생성할 수 없습니다.</p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div style={{ padding: '2rem' }}>
          {/* Desktop Layout */}
         <div className="desktop-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '500px' }}>
              <button className="action-button" onClick={handleRestart} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', flex: 1 }}>
                다시하기
              </button>
              <button className="action-button" onClick={handlePageSave} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', flex: 1 }}>
                페이지 저장
              </button>
              <button className="action-button" onClick={handleCodeDownload} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', flex: 1 }}>
                코드 다운
              </button>
            </div>
            <button className="action-button slack-button" onClick={handleSlackCommunity} style={{ width: '100%', maxWidth: '500px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
              슬랙 커뮤니티 가입하기 🚀
            </button>
          </div>
          
          {/* Mobile Layout */}
          <div className="mobile-buttons" style={{ display: 'none', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <button className="action-button" onClick={handleRestart} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', width: '100%', maxWidth: '300px' }}>
              다시하기
            </button>
            <button className="action-button" onClick={handlePageSave} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', width: '100%', maxWidth: '300px' }}>
              페이지 저장
            </button>
            <button className="action-button" onClick={handleCodeDownload} style={{ backgroundColor: '#eaeeffff', color: '#323335ff', width: '100%', maxWidth: '300px' }}>
              코드 다운
            </button>
            <button className="action-button slack-button" onClick={handleSlackCommunity} style={{ width: '100%', maxWidth: '300px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
              슬랙 커뮤니티 가입하기 🚀
            </button>
          </div>
        </div>

        <div className="result-bottom">
          <div className="architecture-section">
            <h3>{cbtiType.name}을 위한 추천 아키텍처</h3>
            <ArchitectureDiagram 
              cbtiType={type || 'ASEV'} 
              recommendedServices={cbtiType.recommended_services || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;