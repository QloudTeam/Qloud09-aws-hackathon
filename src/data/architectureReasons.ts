/**
 * CBTI 유형별 아키텍처 추천 이유
 */

export interface ArchitectureReason {
  personalityMatch: string;
  technicalAlignment: string;
  workStyle: string;
  benefits: string[];
}

export const architectureReasons: Record<string, ArchitectureReason> = {
  'ISEV': {
    personalityMatch: '탐험가 성향의 당신은 새로운 기술을 빠르게 시도하고 글로벌 확장을 꿈꾸는 특성을 가지고 있습니다.',
    technicalAlignment: '인프라 기반의 안정성과 서비스 지향적 편의성을 동시에 추구하며, 탄력적 확장과 비전 실현을 중시합니다.',
    workStyle: '나침반처럼 방향을 제시하고 호기심으로 새로운 영역을 개척하는 당신의 스타일',
    benefits: [
      'CloudFront로 전 세계 사용자에게 빠른 서비스 제공',
      'ALB로 트래픽 증가에 유연하게 대응',
      'EC2로 필요에 따라 서버 리소스 조정 가능',
      '글로벌 확장 시 추가 인프라 구축 용이'
    ]
  },

  'ASEV': {
    personalityMatch: '혁신가 성향의 당신은 빠른 실험과 아이디어 구현을 선호하며, 사용자 중심의 서비스 개발에 집중합니다.',
    technicalAlignment: '애플리케이션 중심의 개발과 서비스 지향적 접근을 통해 탄력적이고 비전 있는 솔루션을 추구합니다.',
    workStyle: '로켓처럼 빠르게 아이디어를 실현하고 낙관적으로 도전하는 당신의 스타일',
    benefits: [
      'API Gateway로 빠른 API 개발 및 배포',
      'Lambda로 서버 관리 없이 코드에만 집중',
      'DynamoDB로 확장 가능한 데이터 저장',
      '사용량 기반 과금으로 비용 효율성 극대화'
    ]
  },

  'ISEO': {
    personalityMatch: '안정성 마스터인 당신은 체계적이고 신뢰할 수 있는 시스템 구축을 선호하며, 운영 효율성을 중시합니다.',
    technicalAlignment: '인프라 기반의 견고함과 서비스 지향적 편의성을 결합하여 탄력적이면서도 운영 중심적인 접근을 추구합니다.',
    workStyle: '침대처럼 편안하고 안정적인 환경을 만들며 평온함을 유지하는 당신의 스타일',
    benefits: [
      'RDS로 안정적인 데이터베이스 관리',
      'ElastiCache로 성능 최적화 및 응답 속도 향상',
      'CloudWatch로 실시간 모니터링 및 알림',
      '3계층 아키텍처로 확장성과 유지보수성 확보'
    ]
  },

  'ICRV': {
    personalityMatch: '보안 수호자인 당신은 시스템의 안전성을 최우선으로 하며, 미래를 대비한 보안 설계를 중시합니다.',
    technicalAlignment: '인프라 중심의 제어와 안정성을 바탕으로 비전 있는 보안 아키텍처를 구축하는 것을 선호합니다.',
    workStyle: '자물쇠처럼 견고한 보안을 구축하며 책임감 있게 시스템을 보호하는 당신의 스타일',
    benefits: [
      'WAF로 웹 애플리케이션 레벨 보안 강화',
      'S3 암호화로 데이터 저장 시 보안 보장',
      'CloudFront로 DDoS 공격 방어',
      '다층 보안 구조로 종합적인 위협 대응'
    ]
  },

  'ASRO': {
    personalityMatch: '데이터 오퍼레이터인 당신은 시스템 상태를 세심하게 관찰하고 운영 효율성을 극대화하는 것을 선호합니다.',
    technicalAlignment: '애플리케이션 중심의 서비스 지향적 접근으로 안정적이고 운영 중심적인 모니터링 시스템을 구축합니다.',
    workStyle: '그래프처럼 데이터를 분석하고 세심하게 시스템을 관리하는 당신의 스타일',
    benefits: [
      'CloudWatch로 통합 모니터링 및 메트릭 수집',
      'SNS로 실시간 알림 및 다채널 통지',
      'SQS로 안정적인 메시지 처리',
      '예방적 모니터링으로 장애 사전 감지'
    ]
  },

  'ICEV': {
    personalityMatch: '코드 마법사인 당신은 인프라를 코드로 관리하며 창의적이고 자동화된 솔루션을 선호합니다.',
    technicalAlignment: '인프라 중심의 제어와 탄력성을 바탕으로 비전 있는 자동화 시스템을 구축하는 것을 추구합니다.',
    workStyle: '별처럼 창의적인 아이디어로 인프라를 마법처럼 자동화하는 당신의 스타일',
    benefits: [
      'CloudFormation으로 인프라를 코드로 관리',
      'VPC로 네트워크 환경 완전 제어',
      'EC2로 세밀한 서버 설정 및 관리',
      '버전 관리를 통한 인프라 변경 추적'
    ]
  },

  'ICEO': {
    personalityMatch: '효율 장인인 당신은 비용과 성능의 균형을 추구하며 데이터 기반의 최적화를 선호합니다.',
    technicalAlignment: '인프라 중심의 제어와 탄력성을 통해 운영 효율성을 극대화하는 시스템을 구축합니다.',
    workStyle: '저울처럼 균형감 있게 리소스를 최적화하고 효율성을 추구하는 당신의 스타일',
    benefits: [
      'Auto Scaling으로 수요에 따른 자동 리소스 조정',
      'ALB로 트래픽 분산 및 성능 최적화',
      'CloudWatch 메트릭 기반 스케일링 정책',
      '비용 효율성과 성능 최적화 동시 달성'
    ]
  },

  'ICRO': {
    personalityMatch: '거버넌스 엔지니어인 당신은 체계적인 관리와 규정 준수를 중시하며 안정적인 운영을 선호합니다.',
    technicalAlignment: '인프라 중심의 제어와 안정성을 바탕으로 질서정연한 시스템 관리를 추구합니다.',
    workStyle: '문서처럼 체계적이고 질서정연하게 시스템을 관리하는 당신의 스타일',
    benefits: [
      'Systems Manager로 중앙 집중식 시스템 관리',
      'CloudWatch로 통합 모니터링 및 로깅',
      'VPC로 네트워크 보안 및 접근 제어',
      '규정 준수 및 거버넌스 자동화'
    ]
  },

  'ASEO': {
    personalityMatch: '앱 오퍼레이터인 당신은 애플리케이션의 안정적인 운영과 사용자 경험 최적화를 중시합니다.',
    technicalAlignment: '애플리케이션 중심의 서비스 지향적 접근으로 탄력적이면서도 운영 효율적인 플랫폼을 구축합니다.',
    workStyle: '렌치처럼 헌신적으로 애플리케이션을 관리하고 최적화하는 당신의 스타일',
    benefits: [
      'Elastic Beanstalk으로 애플리케이션 배포 자동화',
      'RDS로 안정적인 데이터베이스 서비스',
      'SES로 이메일 발송 기능 통합',
      '개발자 친화적 환경으로 빠른 개발 및 배포'
    ]
  },

  'ASRV': {
    personalityMatch: '아키텍처 디자이너인 당신은 시스템의 조화로운 설계와 확장 가능한 구조를 추구합니다.',
    technicalAlignment: '애플리케이션 중심의 서비스 지향적 접근으로 안정적이고 비전 있는 아키텍처를 설계합니다.',
    workStyle: '퍼즐처럼 조화롭게 시스템 구성 요소를 연결하는 당신의 스타일',
    benefits: [
      'RDS로 확장 가능한 데이터베이스 아키텍처',
      'CloudWatch로 애플리케이션 성능 모니터링',
      'VPC로 네트워크 아키텍처 설계',
      'Well-Architected 원칙 기반 최적화된 설계'
    ]
  },

  'ACEV': {
    personalityMatch: '풀스택 개척자인 당신은 프론트엔드부터 백엔드까지 전체 스택을 다루며 유연한 개발을 선호합니다.',
    technicalAlignment: '애플리케이션 중심의 제어와 탄력성을 바탕으로 비전 있는 풀스택 솔루션을 구축합니다.',
    workStyle: '열쇠처럼 모든 영역을 연결하고 유연하게 문제를 해결하는 당신의 스타일',
    benefits: [
      'EC2로 백엔드 서버 완전 제어',
      'S3로 프론트엔드 정적 호스팅',
      'CloudFront로 글로벌 콘텐츠 배포',
      '프론트엔드와 백엔드 독립적 개발 및 배포'
    ]
  },

  'ACEO': {
    personalityMatch: '딜리버리 엔지니어인 당신은 체계적인 배포 프로세스와 품질 보장을 중시하며 규율 있는 개발을 선호합니다.',
    technicalAlignment: '애플리케이션 중심의 제어와 탄력성을 통해 운영 효율적인 CI/CD 파이프라인을 구축합니다.',
    workStyle: '박스처럼 규율 있게 배포 프로세스를 관리하고 품질을 보장하는 당신의 스타일',
    benefits: [
      'EC2로 배포 환경 완전 제어',
      'RDS로 안정적인 데이터 관리',
      'API Gateway로 API 버전 관리',
      '자동화된 배포 파이프라인으로 품질 보장'
    ]
  },

  'ACRV': {
    personalityMatch: '보안 개발자인 당신은 애플리케이션 레벨의 보안을 중시하며 원칙에 따른 개발을 선호합니다.',
    technicalAlignment: '애플리케이션 중심의 제어와 안정성을 바탕으로 비전 있는 보안 솔루션을 구축합니다.',
    workStyle: '각도기처럼 원칙주의적으로 정확하고 안전한 시스템을 구축하는 당신의 스타일',
    benefits: [
      'WAF로 애플리케이션 레벨 보안 강화',
      'Auto Scaling으로 보안 확장성 확보',
      'CloudWatch로 보안 이벤트 모니터링',
      '보안 중심의 확장 가능한 아키텍처'
    ]
  },

  'ACRO': {
    personalityMatch: '엣지 수호자인 당신은 사용자와 시스템 간의 접점을 보호하며 글로벌 서비스 운영을 중시합니다.',
    technicalAlignment: '애플리케이션 중심의 제어와 안정성을 통해 운영 효율적인 엣지 보안 시스템을 구축합니다.',
    workStyle: '지구본처럼 보호본능으로 전 세계 사용자를 안전하게 연결하는 당신의 스타일',
    benefits: [
      'Cognito로 사용자 인증 및 권한 관리',
      'WAF로 엣지 레벨 보안 필터링',
      'Route 53으로 글로벌 DNS 관리',
      '사용자 접점에서의 종합적인 보안 및 성능 최적화'
    ]
  },

  'ISRV': {
    personalityMatch: '미래 설계자인 당신은 글로벌 확장성과 장기적 비전을 중시하며 체계적인 콘텐츠 전략을 선호합니다.',
    technicalAlignment: '인프라 중심의 서비스 지향적 접근으로 안정적이고 비전 있는 글로벌 플랫폼을 구축합니다.',
    workStyle: '지도처럼 사려깊게 글로벌 전략을 수립하고 실행하는 당신의 스타일',
    benefits: [
      'CloudFront로 전 세계 콘텐츠 배포 최적화',
      'Route 53으로 지연 시간 기반 라우팅',
      'S3로 확장 가능한 콘텐츠 저장',
      '글로벌 성능 최적화 및 비용 효율성'
    ]
  },

  'ISRO': {
    personalityMatch: '철통 관리자인 당신은 시스템의 안정성과 데이터 보호를 최우선으로 하며 체계적인 백업 전략을 중시합니다.',
    technicalAlignment: '인프라 중심의 서비스 지향적 접근으로 안정적이고 운영 효율적인 백업 시스템을 구축합니다.',
    workStyle: '헬멧처럼 침착하게 시스템을 보호하고 안전을 보장하는 당신의 스타일',
    benefits: [
      'AWS Backup으로 자동화된 백업 관리',
      'CloudWatch로 시스템 상태 실시간 모니터링',
      'EC2로 안정적인 서버 운영',
      '데이터 손실 방지 및 빠른 복구 체계'
    ]
  }
};