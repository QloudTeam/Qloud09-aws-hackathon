# 로컬 테스트 가이드

## 🚀 로컬 실행 방법

### 1. 개발 서버 실행
```bash
# 프로젝트 디렉토리로 이동
cd /Users/mzc01-seoseohii/Documents/Hackerton/Qloud09-aws-hackathon

# 개발 서버 실행 (npm 오류 시 npx 사용)
npx vite
# 또는
npm run dev
```

### 2. 브라우저 접속
- URL: http://localhost:5173 (Vite 기본 포트)
- 자동으로 브라우저가 열립니다

## 🧪 테스트 시나리오

### 전체 플로우 테스트
1. **홈페이지** → "지금 시작하기" 클릭
2. **테스트 진행** → 12개 질문 답변 (이전/다음 네비게이션 테스트)
3. **추가 정보** → 성별/연령대 선택
4. **결과 페이지** → CBTI 유형 확인

### 아키텍처 다이어그램 테스트
1. 결과 페이지에서 **"아키텍처 다이어그램"** 탭 클릭
2. 생성된 다이어그램 이미지 확인
3. **"다이어그램 다운로드"** 버튼 테스트

### IaC 코드 테스트
1. **"AWS CDK 코드"** 탭 클릭 → TypeScript 코드 확인
2. **"Terraform 코드"** 탭 클릭 → HCL 코드 확인
3. **다운로드 버튼** 테스트 → 파일 저장 확인

### 슬랙 연동 테스트 (로컬 시뮬레이션)
1. 결과 페이지에서 **"슬랙으로 이동"** 클릭
2. 다음 파일들이 자동 다운로드됨:
   - `{CBTI유형}-infrastructure.yaml` (CloudFormation 템플릿)
   - `{CBTI유형}-deployment-guide.md` (배포 가이드)
3. 슬랙 가입 링크가 새 탭에서 열림

## 📋 테스트 체크리스트

### ✅ 기본 기능
- [ ] 홈페이지 로딩
- [ ] 테스트 진행 (12개 질문)
- [ ] 진행률 표시 정상 작동
- [ ] 이전/다음 버튼 작동
- [ ] 추가 정보 입력 (성별/연령대)
- [ ] CBTI 유형 계산 및 표시

### ✅ 아키텍처 기능
- [ ] 동적 아키텍처 다이어그램 생성
- [ ] 탭 전환 (다이어그램/CDK/Terraform)
- [ ] 추천 서비스 태그 표시
- [ ] 프리티어 정보 표시

### ✅ 다운로드 기능
- [ ] 다이어그램 PNG 다운로드
- [ ] CDK TypeScript 코드 다운로드
- [ ] Terraform HCL 코드 다운로드
- [ ] CloudFormation YAML 다운로드
- [ ] 배포 가이드 마크다운 다운로드

### ✅ 슬랙 연동 (시뮬레이션)
- [ ] 슬랙 버튼 클릭 시 파일 자동 다운로드
- [ ] 슬랙 가입 링크 새 탭에서 열림
- [ ] 성공 알림 메시지 표시

## 🔧 문제 해결

### npm 권한 오류 시
```bash
# npx 사용
npx vite

# 또는 새 터미널에서 재시도
```

### 포트 충돌 시
```bash
# 다른 포트로 실행
npx vite --port 3001
```

### 이미지 로딩 오류 시
```bash
# public 폴더에 다이어그램 복사 확인
ls public/*.png
```

## 📊 예상 결과

### CBTI 유형별 아키텍처
- **ASEV (앱 혁신가)**: 서버리스 아키텍처 (Lambda + API Gateway + DynamoDB)
- **ISEV (클라우드 탐험가)**: 웹 애플리케이션 (EC2 + ALB + RDS)
- **기타 유형**: 추천 서비스 기반 동적 생성

### 다운로드 파일 예시
```
ASEV-infrastructure.yaml     # CloudFormation 템플릿
ASEV-deployment-guide.md     # 배포 가이드
ASEV-stack.ts               # CDK 코드
ASEV.tf                     # Terraform 코드
```

이제 로컬에서 전체 CBTI 시스템을 테스트할 수 있습니다!