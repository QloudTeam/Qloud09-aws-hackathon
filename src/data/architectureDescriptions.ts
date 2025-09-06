/**
 * CBTI 유형별 아키텍처 설명 및 예상 결과
 */



export interface WellArchitectedPrinciple {
  pillar: string;
  description: string;
  implementation: string;
}

export interface ArchitectureDescription {
  title: string;
  description: string;
  expectedResults: string[];
  useCase: string;
  benefits: string[];
  wellArchitectedPrinciples: WellArchitectedPrinciple[];
}

export const architectureDescriptions: Record<string, ArchitectureDescription> = {
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
    ]
  },

  'ICRV': {
    title: '보안 강화 웹사이트',
    description: '최고 수준의 보안이 필요한 웹사이트를 위한 아키텍처입니다. 모든 접근을 모니터링하고 보안 위협을 실시간으로 탐지합니다.',
    expectedResults: [
      '100% 보안 위협 탐지 및 차단',
      '모든 사용자 활동 로그 기록',
      '보안 규정 준수 자동 검증',
      '실시간 보안 알림 시스템'
    ],
    useCase: '금융 서비스, 의료 시스템, 정부 기관 웹사이트',
    benefits: [
      '최고 수준의 보안 보장',
      '규정 준수 자동화',
      '실시간 위협 대응'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'WAF 웹 애플리케이션 방화벽, S3 버킷 암호화, CloudTrail 감사 로그'
      },
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'AWS Config를 통한 규정 준수 자동 모니터링, CloudWatch 실시간 알림'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'CloudFront를 통한 DDoS 보호, 다중 보안 계층으로 단일 장애점 제거'
      }
    ]
  },

  'ASRO': {
    title: '모니터링 및 알림 시스템',
    description: '애플리케이션과 인프라를 실시간으로 모니터링하고 이상 상황을 즉시 알려주는 시스템입니다. 문제 발생 전 예방적 대응이 가능합니다.',
    expectedResults: [
      '실시간 시스템 상태 모니터링',
      '이상 징후 자동 탐지 및 알림',
      '99.9% 알림 전달 성공률',
      '평균 1분 이내 문제 감지'
    ],
    useCase: '애플리케이션 모니터링, 인프라 감시, 운영 알림',
    benefits: [
      '사전 예방적 문제 해결',
      '자동화된 알림 시스템',
      '운영 효율성 향상'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'CloudWatch를 통한 통합 모니터링, SNS로 다채널 알림 전달'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'SQS를 통한 메시지 큐잉으로 알림 손실 방지, 다중 알림 채널'
      },
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'S3를 통한 로그 데이터 효율적 저장, 실시간 메트릭 처리'
      }
    ]
  },

  'ICEV': {
    title: 'IaC 기반 인프라 관리',
    description: '코드로 인프라를 관리하는 현대적 접근 방식입니다. 버전 관리와 자동화를 통해 일관성 있는 인프라를 구축합니다.',
    expectedResults: [
      '인프라 배포 시간 90% 단축',
      '100% 재현 가능한 환경 구성',
      '인프라 변경 이력 완전 추적',
      '자동화된 인프라 테스트'
    ],
    useCase: 'DevOps 환경, 멀티 환경 관리, 인프라 표준화',
    benefits: [
      '인프라 관리 자동화',
      '일관성 있는 환경 구성',
      '빠른 배포 및 롤백'
    ]
  },

  'ICEO': {
    title: '오토 스케일링 시스템',
    description: '트래픽 변화에 자동으로 대응하는 지능형 확장 시스템입니다. CPU 사용률과 요청 수를 모니터링하여 최적의 인스턴스 수를 유지합니다.',
    expectedResults: [
      '트래픽 70% 증가 시 2분 내 자동 확장',
      '비용 40-60% 절약 (수요 기반 리소스 사용)',
      'CPU 사용률 50-70% 최적 범위 유지',
      '스트레스 테스트 도구로 확장 동작 검증 가능'
    ],
    useCase: '이벤트 사이트, 뉴스 포털, 트래픽 변동이 큰 서비스',
    benefits: [
      '지능형 리소스 관리',
      '실시간 성능 모니터링',
      '예측 가능한 확장 동작'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Cost Optimization',
        description: '비용 최적화',
        implementation: 'Target Tracking과 Simple Scaling 정책으로 정밀한 리소스 조정'
      },
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'CloudWatch 커스텀 메트릭으로 실시간 성능 추적 및 최적화'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'Multi-AZ Auto Scaling Group으로 고가용성 및 자동 복구'
      }
    ]
  },

  'ICRO': {
    title: '거버넌스 인프라',
    description: '엄격한 관리와 규정 준수가 필요한 환경을 위한 종합 거버넌스 시스템입니다. AWS Config, CloudTrail, Systems Manager를 통해 완전한 가시성과 제어를 제공합니다.',
    expectedResults: [
      'AWS Config 규칙 100% 자동 모니터링',
      'CloudTrail로 모든 API 호출 추적',
      '컴플라이언스 리포트 자동 생성',
      '보안 이벤트 실시간 알림 (1분 이내)'
    ],
    useCase: '대기업 IT 인프라, 금융/의료 규제 산업, 정부 시스템',
    benefits: [
      '완전한 감사 추적성',
      '자동화된 컴플라이언스 검증',
      '중앙 집중식 정책 관리'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'AWS Config 규칙으로 보안 정책 자동 검증, CloudTrail 감사 로그'
      },
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'Systems Manager로 중앙 집중식 관리, Lambda 기반 자동화'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'EventBridge를 통한 안정적인 이벤트 처리 및 알림'
      }
    ]
  },

  'ASEO': {
    title: '플랫폼 서비스',
    description: '관리형 서비스를 활용한 완전한 플랫폼 솔루션입니다. Elastic Beanstalk, RDS, ElastiCache를 조합하여 개발자가 비즈니스 로직에만 집중할 수 있는 환경을 제공합니다.',
    expectedResults: [
      'Elastic Beanstalk으로 배포 시간 90% 단축',
      'RDS Multi-AZ로 99.95% 데이터베이스 가용성',
      'ElastiCache로 응답 시간 70% 개선',
      'API Gateway로 RESTful API 자동 관리'
    ],
    useCase: '엔터프라이즈 웹 애플리케이션, API 플랫폼, 데이터 집약적 서비스',
    benefits: [
      '완전 관리형 인프라',
      '자동 확장 및 복구',
      '개발 생산성 극대화'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'Elastic Beanstalk 자동 배포, CloudWatch 통합 모니터링'
      },
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'ElastiCache 인메모리 캐싱, RDS 읽기 전용 복제본'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'Multi-AZ 배포, 자동 백업 및 복구'
      }
    ]
  },

  'ASRV': {
    title: '아키텍처 디자이너',
    description: 'ECS Fargate 기반 마이크로서비스 아키텍처로 확장 가능하고 유지보수가 용이한 현대적 애플리케이션을 구축합니다. 컴테이너화된 서비스들이 독립적으로 배포되고 확장됩니다.',
    expectedResults: [
      'ECS Fargate로 서버리스 컴테이너 운영',
      '마이크로서비스 독립 배포 및 확장',
      'ALB로 트래픽 지능형 라우팅',
      'Auto Scaling으로 비용 최적화'
    ],
    useCase: '마이크로서비스 아키텍처, 컴테이너 기반 애플리케이션, 클라우드 네이티브 서비스',
    benefits: [
      '서비스 독립성 보장',
      '확장성과 유연성',
      '운영 복잡성 최소화'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'ECS 서비스 자동 배포, CloudWatch 컴테이너 인사이트'
      },
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'Fargate 서버리스 컴퓨팅, Application Auto Scaling'
      },
      {
        pillar: 'Cost Optimization',
        description: '비용 최적화',
        implementation: 'Fargate Spot 인스턴스, 리소스 기반 과금'
      }
    ]
  },

  'ACEV': {
    title: '모던 풀스택 웹앱',
    description: '프론트엔드와 백엔드가 분리된 현대적 웹 애플리케이션입니다. 각각 독립적으로 개발하고 배포할 수 있습니다.',
    expectedResults: [
      '프론트엔드 로딩 속도 3초 이내',
      'API 응답 시간 100ms 이하',
      '독립적인 프론트/백엔드 배포',
      '모바일 친화적 반응형 디자인'
    ],
    useCase: 'SPA 애플리케이션, 모바일 웹앱, 대시보드',
    benefits: [
      '개발팀 독립성 확보',
      '빠른 사용자 경험',
      '확장 가능한 구조'
    ]
  },

  'ACEO': {
    title: '배송 엔지니어',
    description: 'CodeCommit, CodeBuild, CodePipeline을 활용한 완전 자동화된 CI/CD 파이프라인입니다. 코드 커밋부터 프로덕션 배포까지 모든 과정이 자동화됩니다.',
    expectedResults: [
      'Git 푸시 후 5분 내 자동 배포',
      'CodeBuild로 병렬 빌드 처리',
      'Elastic Beanstalk 무중단 배포',
      '배포 실패 시 자동 롤백'
    ],
    useCase: '애자일 개발팀, DevOps 환경, 지속적 통합/배포',
    benefits: [
      '완전 자동화된 배포',
      '개발 속도 향상',
      '배포 위험 최소화'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Operational Excellence',
        description: '운영 우수성',
        implementation: 'CodePipeline 자동화, CloudWatch를 통한 배포 모니터링'
      },
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'Elastic Beanstalk 블루/그린 배포, 자동 롤백 메커니즘'
      },
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'IAM 역할 기반 접근 제어, S3 아티팩트 암호화'
      }
    ]
  },

  'ACRV': {
    title: '보안 중심 Auto Scaling 앱',
    description: '보안을 최우선으로 하면서도 자동 확장이 가능한 애플리케이션입니다. 보안 위협을 실시간으로 탐지하고 대응합니다.',
    expectedResults: [
      '보안 위협 실시간 탐지 및 차단',
      '트래픽 증가 시 자동 보안 확장',
      '보안 이벤트 즉시 알림',
      '99.9% 보안 사고 예방'
    ],
    useCase: '금융 앱, 개인정보 처리 시스템, 보안 중요 서비스',
    benefits: [
      '강화된 보안 체계',
      '자동 위협 대응',
      '확장 가능한 보안 아키텍처'
    ]
  },

  'ACRO': {
    title: '엣지 보안 및 인증 서비스',
    description: '사용자 인증과 엣지 레벨 보안을 제공하는 서비스입니다. 전 세계 어디서나 빠르고 안전한 접근을 보장합니다.',
    expectedResults: [
      '글로벌 사용자 인증 100ms 이내',
      '엣지 레벨 보안 필터링',
      '사용자 세션 관리 자동화',
      '지역별 접근 제어 가능'
    ],
    useCase: '글로벌 서비스, 멀티 테넌트 앱, 사용자 포털',
    benefits: [
      '글로벌 사용자 경험',
      '강력한 인증 시스템',
      '엣지 보안 최적화'
    ]
  }
,

  'ISRV': {
    title: '글로벌 CDN 플랫폼',
    description: '전 세계 사용자에게 빠른 콘텐츠 전달을 위한 글로벌 CDN 아키텍처입니다. 지역별 캐싱으로 최적의 사용자 경험을 제공합니다.',
    expectedResults: [
      '전 세계 평균 응답 시간 100ms 이하',
      '99.99% 콘텐츠 가용성',
      '대역폭 비용 60% 절감',
      '글로벌 트래픽 자동 분산'
    ],
    useCase: '글로벌 웹사이트, 미디어 스트리밍, 소프트웨어 배포',
    benefits: [
      '글로벌 성능 최적화',
      '비용 효율적인 콘텐츠 전달',
      '확장 가능한 인프라'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Performance Efficiency',
        description: '성능 효율성',
        implementation: 'CloudFront 글로벌 엣지 로케이션, Route 53 지연 시간 기반 라우팅'
      },
      {
        pillar: 'Cost Optimization',
        description: '비용 최적화',
        implementation: 'S3 스토리지 클래스 최적화, CloudFront 캐싱으로 오리진 부하 감소'
      }
    ]
  },

  'ISRO': {
    title: '백업 및 모니터링 시스템',
    description: '시스템의 안정성과 데이터 보호를 위한 포괄적인 백업 및 모니터링 솔루션입니다. 장애 예방과 빠른 복구를 보장합니다.',
    expectedResults: [
      '자동 백업으로 99.999% 데이터 보호',
      '실시간 시스템 상태 모니터링',
      '평균 복구 시간 15분 이내',
      '규정 준수 자동 검증'
    ],
    useCase: '미션 크리티컬 시스템, 규제 산업, 데이터 보호',
    benefits: [
      '데이터 손실 위험 최소화',
      '규정 준수 자동화',
      '운영 안정성 향상'
    ],
    wellArchitectedPrinciples: [
      {
        pillar: 'Reliability',
        description: '안정성',
        implementation: 'AWS Backup을 통한 자동 백업, CloudWatch 실시간 모니터링'
      },
      {
        pillar: 'Security',
        description: '보안',
        implementation: 'EC2 인스턴스 보안 그룹, 백업 데이터 암호화'
      }
    ]
  }
};

// 나머지 유형들에 기본 Well-Architected 원칙 추가
Object.keys(architectureDescriptions).forEach(type => {
  if (!architectureDescriptions[type].wellArchitectedPrinciples) {
    architectureDescriptions[type].wellArchitectedPrinciples = [
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
  }
});