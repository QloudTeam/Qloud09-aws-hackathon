import { CBTIType } from '../types';

export interface ArchitectureConfig {
  services: string[];
  connections: Array<{ from: string; to: string }>;
  freeTierOptimized: boolean;
}

/**
 * CBTI 유형별 프리티어 최적화 아키텍처 매핑
 */
const ARCHITECTURE_MAPPINGS: Record<string, ArchitectureConfig> = {
  // 서버리스 중심 유형들
  'ASEV': { // 앱 혁신가
    services: ['API Gateway', 'Lambda', 'DynamoDB', 'S3', 'CloudFront', 'CloudWatch'],
    connections: [
      { from: 'CloudFront', to: 'API Gateway' },
      { from: 'API Gateway', to: 'Lambda' },
      { from: 'Lambda', to: 'DynamoDB' },
      { from: 'Lambda', to: 'S3' }
    ],
    freeTierOptimized: true
  },
  'ASEO': { // 앱 오퍼레이터
    services: ['Elastic Beanstalk', 'RDS', 'S3', 'CloudWatch', 'SES'],
    connections: [
      { from: 'Elastic Beanstalk', to: 'RDS' },
      { from: 'Elastic Beanstalk', to: 'S3' },
      { from: 'Elastic Beanstalk', to: 'SES' }
    ],
    freeTierOptimized: true
  },
  // 인프라 중심 유형들
  'ISEV': { // 클라우드 탐험가
    services: ['CloudFront', 'ALB', 'EC2', 'S3', 'CloudWatch'],
    connections: [
      { from: 'CloudFront', to: 'ALB' },
      { from: 'ALB', to: 'EC2' },
      { from: 'EC2', to: 'S3' }
    ],
    freeTierOptimized: true
  },
  'ISEO': { // 안정성 마스터
    services: ['EC2', 'RDS', 'CloudWatch', 'Auto Scaling', 'ELB'],
    connections: [
      { from: 'ELB', to: 'EC2' },
      { from: 'EC2', to: 'RDS' },
      { from: 'Auto Scaling', to: 'EC2' }
    ],
    freeTierOptimized: true
  },
  // 데이터 분석 유형들
  'ASRV': { // 아키텍처 디자이너
    services: ['S3', 'Glue', 'Athena', 'QuickSight', 'CloudWatch'],
    connections: [
      { from: 'S3', to: 'Glue' },
      { from: 'Glue', to: 'Athena' },
      { from: 'Athena', to: 'QuickSight' }
    ],
    freeTierOptimized: true
  },
  // 보안 중심 유형들
  'ICRV': { // 보안 수호자
    services: ['WAF', 'CloudFront', 'ALB', 'EC2', 'VPC', 'CloudTrail'],
    connections: [
      { from: 'WAF', to: 'CloudFront' },
      { from: 'CloudFront', to: 'ALB' },
      { from: 'ALB', to: 'EC2' }
    ],
    freeTierOptimized: true
  }
};

/**
 * CBTI 유형에 따른 아키텍처 설정 생성
 */
export const generateArchitecture = (cbtiType: string, recommendedServices: string[]): ArchitectureConfig => {
  // 기본 매핑이 있으면 사용
  if (ARCHITECTURE_MAPPINGS[cbtiType]) {
    return ARCHITECTURE_MAPPINGS[cbtiType];
  }

  // 추천 서비스 기반 동적 생성
  const services = [...recommendedServices, 'CloudWatch']; // 모니터링은 기본 포함
  const connections: Array<{ from: string; to: string }> = [];

  // 기본 연결 패턴 생성
  if (services.includes('API Gateway') && services.includes('Lambda')) {
    connections.push({ from: 'API Gateway', to: 'Lambda' });
  }
  if (services.includes('Lambda') && services.includes('DynamoDB')) {
    connections.push({ from: 'Lambda', to: 'DynamoDB' });
  }
  if (services.includes('ALB') && services.includes('EC2')) {
    connections.push({ from: 'ALB', to: 'EC2' });
  }
  if (services.includes('EC2') && services.includes('RDS')) {
    connections.push({ from: 'EC2', to: 'RDS' });
  }

  return {
    services,
    connections,
    freeTierOptimized: true
  };
};