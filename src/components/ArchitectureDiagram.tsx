import React, { useState, useEffect } from 'react';
import { generateArchitecture, ArchitectureConfig } from '../utils/architectureGenerator';
import { generateCDKCode, generateTerraformCode } from '../utils/iacGenerator';

interface ArchitectureDiagramProps {
  cbtiType: string;
  recommendedServices: string[];
}

/**
 * 동적 아키텍처 다이어그램 및 IaC 코드 생성 컴포넌트
 */
const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ 
  cbtiType, 
  recommendedServices 
}) => {
  const [architecture, setArchitecture] = useState<ArchitectureConfig | null>(null);
  const [diagramUrl, setDiagramUrl] = useState<string>('');
  const [cdkCode, setCdkCode] = useState<string>('');
  const [terraformCode, setTerraformCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'diagram' | 'cdk' | 'terraform'>('diagram');

  useEffect(() => {
    // 아키텍처 생성
    const arch = generateArchitecture(cbtiType, recommendedServices);
    setArchitecture(arch);

    // IaC 코드 생성
    setCdkCode(generateCDKCode(arch, cbtiType));
    setTerraformCode(generateTerraformCode(arch, cbtiType));

    // 다이어그램 이미지 설정 (실제로는 MCP 서버 호출)
    setDiagramUrl(getDiagramUrl(cbtiType));
  }, [cbtiType, recommendedServices]);

  const getDiagramUrl = (type: string): string => {
    // CBTI 유형별 다이어그램 매핑
    const diagramMap: Record<string, string> = {
      'ASEV': '/generated-diagrams/serverless-architecture.png',
      'ASEO': '/generated-diagrams/web-app-architecture.png',
      'ISEV': '/generated-diagrams/web-app-architecture.png',
      'ISEO': '/generated-diagrams/web-app-architecture.png'
    };
    
    return diagramMap[type] || '/generated-diagrams/serverless-architecture.png';
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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
      <div className="architecture-tabs">
        <button 
          className={`tab ${activeTab === 'diagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagram')}
        >
          아키텍처 다이어그램
        </button>
        <button 
          className={`tab ${activeTab === 'cdk' ? 'active' : ''}`}
          onClick={() => setActiveTab('cdk')}
        >
          AWS CDK 코드
        </button>
        <button 
          className={`tab ${activeTab === 'terraform' ? 'active' : ''}`}
          onClick={() => setActiveTab('terraform')}
        >
          Terraform 코드
        </button>
      </div>

      <div className="architecture-content">
        {activeTab === 'diagram' && (
          <div className="diagram-section">
            <div className="diagram-header">
              <h4>프리티어 최적화 아키텍처</h4>
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
        )}

        {activeTab === 'cdk' && (
          <div className="code-section">
            <div className="code-header">
              <h4>AWS CDK (TypeScript)</h4>
              <button 
                className="download-btn" 
                onClick={() => downloadCode(cdkCode, `${cbtiType}-stack.ts`)}
              >
                CDK 코드 다운로드
              </button>
            </div>
            <pre className="code-block">
              <code>{cdkCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'terraform' && (
          <div className="code-section">
            <div className="code-header">
              <h4>Terraform</h4>
              <button 
                className="download-btn" 
                onClick={() => downloadCode(terraformCode, `${cbtiType}.tf`)}
              >
                Terraform 코드 다운로드
              </button>
            </div>
            <pre className="code-block">
              <code>{terraformCode}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="free-tier-info">
        <h5>🎯 프리티어 최적화 포인트</h5>
        <ul>
          <li>Lambda: 1M 요청/월 무료</li>
          <li>API Gateway: 1M 요청/월 무료</li>
          <li>S3: 5GB 표준 스토리지 무료</li>
          <li>DynamoDB: 25GB + 25 WCU/RCU 무료</li>
          <li>EC2: t4g.micro 750시간/월 무료</li>
          <li>RDS: db.t4g.micro 750시간/월 무료</li>
        </ul>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;