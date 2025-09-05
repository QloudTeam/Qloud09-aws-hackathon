import React, { useState, useEffect } from 'react';
import { generateArchitecture, ArchitectureConfig } from '../utils/architectureGenerator';

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
    return `/${type}-architecture.png`;
  };

  const downloadDiagram = () => {
    const a = document.createElement('a');
    a.href = diagramUrl;
    a.download = `${cbtiType}-architecture.png`;
    a.click();
  };

  if (!architecture) return <div>아키텍처 생성 중...</div>;

  return (
    <div className="architecture-container">
      <div className="architecture-header">
        <h4>추천 아키텍처</h4>
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
          <div className="services-list">
            <h5>포함된 서비스:</h5>
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