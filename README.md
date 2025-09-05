# CBTI (Cloud-Based Type Indicator) 웹 서비스

클라우드 성향을 분석하여 16가지 유형으로 분류하는 MVP 웹 서비스입니다.

## 🏗️ 아키텍처

- **프론트엔드**: React + TypeScript + Vite
- **백엔드**: AWS Lambda (Node.js 20)
- **AI**: Amazon Bedrock Nova Canvas
- **인프라**: AWS (S3, CloudFront, API Gateway, Lambda)
- **배포**: AWS SAM

## 📋 주요 기능

1. **CBTI 테스트**: 12개 질문으로 클라우드 성향 분석
2. **유형 결정**: 4개 차원 조합으로 16가지 유형 분류
3. **개인화 이미지**: Bedrock Nova Canvas로 맞춤 이미지 생성
4. **추천 아키텍처**: MCP 기반 아키텍처 다이어그램 제공

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 20 LTS
- AWS CLI 설정
- AWS SAM CLI

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 배포

```bash
# 개발 환경 배포
./deploy.sh dev

# 프로덕션 환경 배포
./deploy.sh prod
```

## 📁 프로젝트 구조

```
├── src/                    # 프론트엔드 소스
│   ├── components/         # React 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── data/              # JSON 데이터
│   ├── types/             # TypeScript 타입
│   └── utils/             # 유틸리티 함수
├── lambda/                # Lambda 함수
│   ├── bedrock-image/     # Bedrock 이미지 생성
│   └── cbti-api/          # CBTI 계산 API
├── infrastructure/        # AWS SAM 템플릿
└── generated-diagrams/    # 생성된 다이어그램
```

## 🎯 페이지 구성

1. **홈페이지** (`/`): CBTI 소개 및 시작
2. **테스트** (`/test`): 12개 질문 진행
3. **추가 정보** (`/character-info`): 성별/연령대 입력
4. **결과** (`/result`): CBTI 유형 및 추천 서비스

## 🔧 기술 스택

### 프론트엔드
- React 18 + TypeScript
- React Router DOM
- Vite (빌드 도구)
- html2canvas (이미지 다운로드)

### 백엔드
- AWS Lambda (Node.js 20)
- AWS API Gateway
- Amazon Bedrock Nova Canvas
- AWS S3 (정적 호스팅 + 이미지 저장)
- AWS CloudFront (CDN)

### 개발 도구
- ESLint + Prettier
- TypeScript (strict mode)
- AWS SAM (배포)

## 📊 CBTI 유형 체계

### 4개 차원
- **A/B**: 기술 중심 vs 비즈니스 중심
- **S/N**: 현실적 vs 직관적
- **E/I**: 외향적 vs 내향적
- **O/P**: 체계적 vs 유연한

### 16가지 유형 예시
- **ASEO**: 클라우드 아키텍트 (체계적인 설계자)
- **ASIO**: 보안 전문가 (신중한 수호자)
- **ANEO**: 혁신 리더 (미래지향적 개척자)
- **ANIP**: AI/ML 연구자 (지능형 솔루션 개발자)

## 🎨 디자인 시스템

### 색상 팔레트
- 배경: `#f5f7fa` (회색)
- 주요: `#667eea` (파란색)
- 보조: `#764ba2` (보라색)
- 그라데이션: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### UI 컴포넌트
- 부드러운 그라데이션
- 둥근 모서리 (border-radius: 15px)
- 그림자 효과 (box-shadow)
- 호버 애니메이션

## 🔐 보안 고려사항

- 환경 변수로 민감 정보 관리
- CORS 설정으로 도메인 제한
- Bedrock Guardrails 적용
- CloudWatch 로그 모니터링

## 📈 모니터링

### CloudWatch 메트릭
- Lambda 함수 실행 시간
- API Gateway 요청 수
- 오류율 및 응답 시간

### 로그 구조
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "INFO",
  "service": "cbti-api",
  "env": "dev",
  "request_id": "uuid",
  "latency_ms": 150
}
```

## 🚀 배포 프로세스

1. **빌드**: 프론트엔드 + Lambda 함수
2. **인프라**: SAM 템플릿 배포
3. **업로드**: S3에 정적 파일 업로드
4. **검증**: 배포 결과 확인

## 📝 개발 가이드라인

### 코드 품질
- TypeScript strict 모드
- ESLint + Prettier 적용
- 함수당 20줄 이하 권장
- 단일 책임 원칙 준수

### 커밋 메시지
- 한국어 주석 필수
- 기능별 단위 커밋
- 명확한 변경 사항 기술

## 🤝 기여 방법

1. Fork 프로젝트
2. 기능 브랜치 생성
3. 변경 사항 커밋
4. Pull Request 생성

## 📄 라이선스

MIT License