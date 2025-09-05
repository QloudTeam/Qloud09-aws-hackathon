import React, { useState, useEffect } from 'react';
import { generateArchitecture, ArchitectureConfig } from '../utils/architectureGenerator';
import { architectureDescriptions } from '../data/architectureDescriptions';

interface ArchitectureDiagramProps {
  cbtiType: string;
  recommendedServices: string[];
}

/**
 * 아키텍처 다이어그램 컴포넌트
 */
const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ 
  cbtiType, 
  recommendedServices 
}) => {
  const [architecture, setArchitecture] = useState<ArchitectureConfig | null>(null);
  const [diagramUrl, setDiagramUrl] = useState<string>('');

  useEffect(() => {
    const arch = generateArchitecture(cbtiType, recommendedServices);
    setArchitecture(arch);
    setDiagramUrl(getDiagramUrl(cbtiType));
  }, [cbtiType, recommendedServices]);

  const getDiagramUrl = (type: string): string => {
    return `/${type}-architecture.png`; // public 폴더의 이미지 사용
  };

  const downloadDiagram = () => {
    const a = document.createElement('a');
    a.href = diagramUrl;
    a.download = `${cbtiType}-architecture.png`;
    a.click();
  };

  if (!architecture) return <div>아키텍처 생성 중...</div>;

  const archDescription = architectureDescriptions[cbtiType];

  return (
    <div className="architecture-container">
      <div className="architecture-header">
        <h4>{archDescription?.title || '추천 아키텍처'}</h4>
      </div>

      <div className="architecture-content">
        <div className="diagram-section">
          <div className="diagram-header">
            <button className="download-btn" onClick={downloadDiagram}>
              다이어그램 다운로드
            </button>
          </div>
          <img 
            src={diagramUrl} 
            alt={`${cbtiType} 아키텍처`}
            className="architecture-diagram"
          />
          
          {archDescription && (
            <div className="architecture-description">
              <div className="description-section">
                <h5>📝 아키텍처 설명</h5>
                <p>{archDescription.description}</p>
              </div>
              
              <div className="well-architected-section">
                <h5>🏢 AWS Well-Architected 모범 사례</h5>
                <div className="principles-grid">
                  {archDescription.wellArchitectedPrinciples?.map((principle, index) => (
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
              
              <div className="results-section">
                <h5>🎯 예상 결과</h5>
                <ul>
                  {archDescription.expectedResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
              
              <div className="usecase-section">
                <h5>🚀 활용 사례</h5>
                <p>{archDescription.useCase}</p>
              </div>
              
              <div className="benefits-section">
                <h5>✨ 주요 장점</h5>
                <ul>
                  {archDescription.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="services-list">
            <h5>포함된 AWS 서비스:</h5>
            <div className="service-tags">
              {architecture.services.map((service, index) => (
                <span key={index} className="service-tag">{service}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;