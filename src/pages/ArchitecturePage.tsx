import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cbtiData from '../data/cbti.json';
import { architectureDescriptions } from '../data/architectureDescriptions';
import { architectureReasons } from '../data/architectureReasons';

/**
 * CBTI별 아키텍처 확인 페이지
 */
const ArchitecturePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCBTI, setSelectedCBTI] = useState<string>('');
  
  useEffect(() => {
    const cbtiFromUrl = searchParams.get('cbti');
    if (cbtiFromUrl) {
      setSelectedCBTI(cbtiFromUrl);
    }
  }, [searchParams]);

  const cbtiTypes = Object.keys(cbtiData.CBTI_TYPES);

  const downloadYamlFile = () => {
    if (!selectedCBTI) {
      alert('CBTI 유형을 선택해주세요.');
      return;
    }

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

    const yamlFileName = fileMapping[selectedCBTI] || `${selectedCBTI}-architecture.yaml`;
    const link = document.createElement('a');
    link.href = `/cloudformation-templates/${yamlFileName}`;
    link.download = yamlFileName;
    link.click();
  };

  const selectedTypeData = selectedCBTI ? cbtiData.CBTI_TYPES[selectedCBTI as keyof typeof cbtiData.CBTI_TYPES] : null;
  const selectedArchDescription = selectedCBTI ? architectureDescriptions[selectedCBTI] : null;

  return (
    <div className="architecture-page-container">
      <div className="architecture-page-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate('/')}>
            ← 홈으로 돌아가기
          </button>
          <h1>🏗️ CBTI별 AWS 아키텍처</h1>
          <p>각 CBTI 유형에 최적화된 AWS 아키텍처를 확인하고 구현 파일을 다운로드하세요!</p>
        </div>

        <div className="cbti-selector">
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

        {selectedCBTI && selectedTypeData && selectedArchDescription && (
          <div className="architecture-details">
            <div className="cbti-info">
              <h2>{selectedCBTI} - {selectedTypeData.name}</h2>
              <p className="cbti-description">{selectedTypeData.description}</p>
              <div className="cbti-tags">
                <span className="tag">{selectedTypeData.symbol}</span>
                <span className="tag">{selectedTypeData.character}</span>
              </div>
            </div>

            <div className="architecture-diagram-section">
              <h3>📊 아키텍처 다이어그램</h3>
              <div className="diagram-container">
                <img 
                  src={`/${selectedCBTI}-architecture.png`}
                  alt={`${selectedCBTI} 아키텍처`}
                  className="architecture-diagram"
                />
                <button className="download-yaml-button" onClick={downloadYamlFile}>
                  📄 CloudFormation YAML 다운로드
                </button>
              </div>
            </div>

            {/* 아키텍처 추천 이유 섹션 */}
            {architectureReasons[selectedCBTI] && (
              <div className="architecture-reason-section">
                <h3>🎯 왜 이 아키텍처를 추천하나요?</h3>
                <div className="reason-content">
                  <div className="reason-item">
                    <h4>💡 성격 분석</h4>
                    <p>{architectureReasons[selectedCBTI].personalityMatch}</p>
                  </div>
                  <div className="reason-item">
                    <h4>🔧 기술적 적합성</h4>
                    <p>{architectureReasons[selectedCBTI].technicalAlignment}</p>
                  </div>
                  <div className="reason-item">
                    <h4>⭐ 업무 스타일</h4>
                    <p>{architectureReasons[selectedCBTI].workStyle}</p>
                  </div>
                  <div className="reason-item">
                    <h4>🚀 기대 효과</h4>
                    <ul>
                      {architectureReasons[selectedCBTI].benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="architecture-description">
              <h3>📝 아키텍처 설명</h3>
              <div className="description-content">
                <div className="description-section">
                  <h4>개요</h4>
                  <p>{selectedArchDescription.description}</p>
                </div>

                <div className="description-section">
                  <h4>🎯 예상 결과</h4>
                  <ul>
                    {selectedArchDescription.expectedResults.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>

                <div className="description-section">
                  <h4>🚀 활용 사례</h4>
                  <p>{selectedArchDescription.useCase}</p>
                </div>

                <div className="description-section">
                  <h4>✨ 주요 장점</h4>
                  <ul>
                    {selectedArchDescription.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {selectedArchDescription.wellArchitectedPrinciples && (
                  <div className="description-section">
                    <h4>🏢 AWS Well-Architected 모범 사례</h4>
                    <div className="principles-grid">
                      {selectedArchDescription.wellArchitectedPrinciples.map((principle, index) => (
                        <div key={index} className="principle-card">
                          <div className="principle-header">
                            <strong>{principle.pillar}</strong>
                            <span className="principle-desc">({principle.description})</span>
                          </div>
                          <p className="principle-implementation">{principle.implementation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="recommended-services">
              <h3>🔧 포함된 AWS 서비스</h3>
              <div className="service-tags">
                {selectedTypeData.recommended_services.map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitecturePage;