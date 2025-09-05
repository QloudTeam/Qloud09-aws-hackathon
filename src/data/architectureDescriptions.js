/**
 * CBTI 유형별 아키텍처 설명 및 예상 결과
 */

export const architectureDescriptions = {
  'ISEV': {
    title: '글로벌 웹 서비스',
    description: '전 세계 사용자에게 빠르고 안전한 웹사이트를 제공하는 아키텍처입니다. CDN을 통해 콘텐츠를 전 세계에 배포하고, 보안 기능으로 악성 트래픽을 차단합니다.',
    expectedResults: [
      '전 세계 어디서나 빠른 웹사이트 로딩 (평균 200ms 이하)',
      '99.9% 이상의 서비스 가용성',
      'DDoS 공격 및 악성 트래픽 자동 차단',
      '월 수백만 페이지뷰 처리 가능'
    ],
    useCase: '기업 홈페이지, 브랜드 사이트, 마케팅 랜딩 페이지',
    benefits: [
      '글로벌 사용자 경험 최적화',
      '높은 보안성과 안정성',
      '트래픽 급증 시 자동 대응'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'CloudFront CDN으로 글로벌 엣지 캐싱, Multi-AZ 배포로 지연 시간 최소화'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'ALB를 통한 자동 장애 조치, Multi-AZ EC2 배포로 단일 장애점 제거'
      },
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'WAF를 통한 웹 애플리케이션 방화벽, Route 53 Health Check로 DNS 보안'
      }
    ]
  },

  'ASEV': {
    title: '서버리스 API 플랫폼',
    description: '서버 관리 없이 API 서비스를 구축하는 현대적 아키텍처입니다. 사용한 만큼만 비용을 지불하며, 자동으로 확장됩니다.',
    expectedResults: [
      '초당 수천 건의 API 요청 처리',
      '사용량에 따른 자동 비용 최적화',
      '99.95% API 응답 성공률',
      '평균 응답 시간 100ms 이하'
    ],
    useCase: 'REST API, 마이크로서비스, 모바일 앱 백엔드',
    benefits: [
      '서버 관리 불필요',
      '사용량 기반 과금으로 비용 효율적',
      '무제한 자동 확장'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Cost Optimization',
        description: '비용 최적화',
        implementation: 'Lambda 사용량 기반 과금, DynamoDB On-Demand로 실제 사용량만 지불'
      },
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'API Gateway 자동 모니터링, CloudWatch를 통한 실시간 메트릭 수집'
      },
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'Cognito를 통한 사용자 인증 및 권한 관리, API Gateway 스로틀링'
      }
    ]
  },

  'ISEO': {
    title: '엔터프라이즈 웹 애플리케이션',
    description: '대규모 기업용 웹 애플리케이션을 위한 안정적이고 확장 가능한 3계층 아키텍처입니다. 데이터베이스 백업과 캐싱으로 성능을 최적화합니다.',
    expectedResults: [
      '동시 사용자 10,000명 이상 지원',
      '데이터베이스 자동 백업 및 복구',
      '캐싱을 통한 50% 이상 성능 향상',
      '99.9% 데이터 안전성 보장'
    ],
    useCase: '전자상거래, ERP 시스템, 고객 관리 시스템',
    benefits: [
      '높은 안정성과 데이터 보호',
      '확장 가능한 구조',
      '기업급 보안 및 컴플라이언스'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'CloudWatch를 통한 모니터링 및 로깅'
      },
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'AWS 보안 모범 사례 적용'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'Multi-AZ 배포 및 자동 장애 조치'
      }
    ]
  }
};

// 나머지 유형들에 기본 Well-Architected 원칙 추가
const defaultPrinciples = [
  {
    pillar: 'Operational Excellence',
    description: '운영 우수성',
    implementation: 'CloudWatch를 통한 모니터링 및 로깅'
  },
  {
    pillar: 'Security',
    description: '보안',
    implementation: 'AWS 보안 모범 사례 적용'
  },
  {
    pillar: 'Reliability',
    description: '안정성',
    implementation: 'Multi-AZ 배포 및 자동 장애 조치'
  }
];

Object.keys(architectureDescriptions).forEach(type => {
  if (!architectureDescriptions[type].wellArchitectedPrinciples) {
    architectureDescriptions[type].wellArchitectedPrinciples = defaultPrinciples;
  }
});