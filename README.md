# CBTI (Cloud-Based Type Indicator) - Amazon Q Developer Hackathon

Amazon Q Developer Hackathon으로 구현하고자 하는 아이디어를 설명합니다.

## 어플리케이션 개요

CBTI(Cloud-Based Type Indicator)는 사용자의 클라우드 성향을 분석하여 16가지 유형으로 분류하는 혁신적인 웹 서비스입니다. 복잡한 클라우드 기술을 친근하고 이해하기 쉬운 성격 유형으로 변환하여, 클라우드 입문자부터 전문가까지 모든 사용자가 자신만의 클라우드 정체성을 발견할 수 있도록 돕습니다.

### 목적 및 핵심 가치

**개인화된 클라우드 여정 제공**
- 사용자의 성향에 맞는 AWS 서비스 학습 경로 제시
- 재미있는 테스트를 통한 클라우드 기술 이해도 향상
- 같은 유형의 사용자들 간의 네트워킹 및 커뮤니티 형성 지원

**과학적 분류 체계**
4개 차원으로 구성된 CBTI 유형 체계:
- **I/A**: 인프라 중심(Infrastructure) vs 애플리케이션 중심(Application)
- **S/C**: 서비스 지향(Service-oriented) vs 제어 중심(Control-focused)
- **E/R**: 탄력적(Elastic) vs 안정적(Reliable)
- **V/O**: 비전형(Visionary) vs 운영형(Operator)

**16가지 클라우드 성격 유형**
- **ISEV**: 클라우드 탐험가 - 새로운 구역을 보면 먼저 나침반부터 꺼내는 탐사형 빌더
- **ASEO**: 앱 오퍼레이터 - 제품을 오래 달리게 하는 숨은 드라이버, 현장감 넘치는 오퍼레이터
- **ICRV**: 보안 수호자 - 의심이 많지만 불편하지 않은, 좋은 보안의 집요한 설계자
- **ACEV**: 풀스택 개척자 - 한 손엔 화면, 다른 손엔 서버를 들고 끝까지 잇는 연결자
- 그 외 12가지 유형

## 주요 기능

### 1. 개인화된 CBTI 테스트
![CBTI 테스트 화면](public/test-screenshot.png)

**12개의 정교한 질문**을 통해 사용자의 클라우드 성향을 분석합니다.

**테스트 구성**:
- 실무 상황 기반 시나리오 질문
- 직관적인 UI/UX로 쉬운 답변 선택
- 실시간 진행률 표시

**예시 질문**:
```
"새로운 프로젝트를 시작할 때 어떤 것부터 하나요?"
A) 튼튼한 기초와 틀부터 만든다 (infra_focused)
B) 무엇을 만들지 아이디어부터 정한다 (app_focused)

"집을 짓는다면 어떤 방식을 선호하나요?"
A) 전문가에게 맡기고 편리하게 이용한다 (service_oriented)
B) 직접 설계하고 세세하게 조절한다 (control_focused)
```

**알고리즘**:
```typescript
// 각 trait별 점수 집계 후 우세한 trait 결정
const dimensions = [
  ['infra_focused', 'app_focused'],
  ['service_oriented', 'control_focused'], 
  ['elastic', 'reliable'],
  ['visionary', 'operator']
];
```

### 2. AI 기반 개인화 캐릭터 이미지 생성
![캐릭터 생성 화면](public/character-screenshot.png)

**Amazon Bedrock Nova Canvas**를 활용한 맞춤형 캐릭터 생성:

**개인화 요소**:
- 사용자 정보(성별, 연령대) 기반 개인화
- CBTI 유형별 특성이 반영된 캐릭터 디자인
- 유형별 고유 심볼과 성격 특성 반영

**기술적 구현**:
```typescript
const generateImagePrompt = (userInfo, symbol, character) => {
  const genderEn = userInfo.gender === 'male' ? 'man' : 'woman';
  
  return `Keywords: ${userInfo.ageGroup} | ${userInfo.gender} | ${symbol} | ${character}
  High-quality 3D render in Pixar/DreamWorks style.
  The ${genderEn} must be holding a clear ${symbol} in their hand.
  Clean background, profile photo composition, 1024x1024 resolution.`;
};
```

**출력 품질**:
- 고품질 1024x1024 이미지 생성
- Pixar/DreamWorks 스타일 3D 렌더링
- 즉시 다운로드 가능

### 3. 맞춤형 AWS 아키텍처 추천
![아키텍처 다이어그램](public/ISEV-architecture.png)

각 CBTI 유형별로 **최적화된 AWS 아키텍처**를 제공:

**제공 내용**:
- 16가지 유형별 전용 아키텍처 다이어그램
- 실제 구현 가능한 CloudFormation 템플릿
- 상세한 서비스 설명 및 구성 가이드

**ISEV 유형 예시 (클라우드 탐험가)**:
```yaml
# 글로벌 확장 가능한 웹 서비스 아키텍처
Resources:
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
  EC2AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      MinSize: 2
      MaxSize: 10
```

**추천 서비스 매핑**:
- **ISEV (클라우드 탐험가)**: CloudFront, ALB, EC2
- **ACEV (풀스택 개척자)**: EC2, S3, CloudFront
- **ICRV (보안 수호자)**: S3, CloudFront, WAF

### 4. 소셜 공유 및 Slack 통합
![결과 공유 화면](public/result-screenshot.png)

**원클릭 결과 공유** 기능:

**공유 기능**:
- 개인화된 결과 이미지 생성
- Slack 워크스페이스 직접 공유
- 팀원들과 CBTI 유형 비교 가능

**기술적 구현**:
```typescript
// html2canvas를 활용한 고품질 이미지 다운로드
const downloadResultImage = async () => {
  const canvas = await html2canvas(resultRef.current);
  const link = document.createElement('a');
  link.download = `cbti-result-${cbtiType}.png`;
  link.href = canvas.toDataURL();
  link.click();
};
```

### 5. 상세한 유형 분석 리포트

각 사용자에게 제공되는 **개인화된 분석 리포트**:

**리포트 구성**:
- 유형별 강점과 특성 분석
- 추천 AWS 서비스 및 학습 경로
- 커리어 발전 방향 제시
- 같은 유형의 유명 클라우드 전문가 소개

**예시 - ISEV (클라우드 탐험가)**:
```
"새로운 구역을 보면 먼저 나침반부터 꺼내는 탐사형 빌더.
안정된 기반 위에서 빠르게 가설을 세우고, 실패도 수확으로 바꾸는 모험가."

추천 서비스: CloudFront, ALB, EC2
심볼: #나침반 | 성격: #호기심
```

## 리소스 배포하기

### 사전 요구사항

**필수 도구 설치**
```bash
# Node.js 20 LTS
node --version  # v20.x.x 이상

# AWS CLI
aws --version   # aws-cli/2.x.x 이상

# Terraform
terraform --version  # Terraform v1.x.x 이상
```

**AWS 계정 설정**
1. **IAM 권한 설정**
   ```bash
   # 필요한 권한:
   # - AmazonS3FullAccess
   # - AWSElasticBeanstalkFullAccess
   # - CloudFormationFullAccess
   # - IAMFullAccess
   # - AmazonBedrockFullAccess
   # - AmazonSSMFullAccess
   ```

2. **AWS CLI 구성**
   ```bash
   aws configure
   # AWS Access Key ID: [액세스 키]
   # AWS Secret Access Key: [시크릿 키]
   # Default region name: us-east-1
   ```

3. **Bedrock 모델 활성화**
   - AWS 콘솔 → Amazon Bedrock → Model access
   - **Nova Canvas** 모델 활성화 필수

### 배포 방법

**방법 1: 자동 배포 스크립트 (권장)**
```bash
# 프로젝트 클론
git clone https://github.com/your-username/Qloud09-aws-hackathon.git
cd Qloud09-aws-hackathon

# 의존성 설치
npm install

# 프로덕션 환경 배포
bash scripts/deploy.sh production
```

**방법 2: 수동 배포**
```bash
# 1. 프론트엔드 빌드
npm run build

# 2. Terraform 인프라 배포
cd terraform
terraform init
terraform plan -var-file="environments/production.tfvars" \
  -var="aws_access_key_id=YOUR_KEY" \
  -var="aws_secret_access_key=YOUR_SECRET"
terraform apply -var-file="environments/production.tfvars" \
  -var="aws_access_key_id=YOUR_KEY" \
  -var="aws_secret_access_key=YOUR_SECRET"

# 3. 애플리케이션 배포
cd ..
eb init --platform "Node.js 20" --region us-east-1
eb deploy
```

### AWS 아키텍처

배포 완료 후 생성되는 **AWS 인프라 구조**:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   사용자        │───▶│ Application      │───▶│ Amazon Bedrock  │
│   (브라우저)    │    │ Load Balancer    │    │ Nova Canvas     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ Elastic          │
                       │ Beanstalk        │
                       │ (Node.js 20)     │
                       │ + Express.js     │
                       └──────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ AWS Parameter    │
                       │ Store            │
                       │ (환경변수 관리)   │
                       └──────────────────┘
```

**생성되는 주요 리소스**
- **Elastic Beanstalk**: 애플리케이션 호스팅 (t3.micro)
  - Node.js 20 플랫폼
  - Express.js 서버 (server.js)
  - React SPA 정적 파일 서빙
- **Application Load Balancer**: 트래픽 분산 및 HTTPS 지원
- **S3 Bucket**: EB 버전 저장 (암호화 활성화)
- **Parameter Store**: 민감 정보 보안 저장
  - `/qloud/aws/access-key-id` (SecureString)
  - `/qloud/aws/secret-access-key` (SecureString)
  - `/qloud/aws/region` (String)
- **IAM Roles**: 최소 권한 원칙 적용
- **CloudWatch**: 로그 및 모니터링

**배포 결과 확인**
```bash
cd terraform

# 배포된 리소스 정보 확인
terraform output

# 애플리케이션 URL 확인
terraform output -raw application_url
```

**예상 출력**:
```
application_url = "http://qloud-production.us-east-1.elasticbeanstalk.com"
environment_name = "qloud-production"
parameter_store_parameters = [
  "/qloud/aws/access-key-id",
  "/qloud/aws/secret-access-key",
  "/qloud/aws/region"
]
```

### 리소스 삭제

**자동 삭제 스크립트**
```bash
# 모든 리소스 삭제
bash scripts/destroy.sh production
```

**수동 삭제**
```bash
cd terraform

# Terraform으로 인프라 삭제
terraform destroy -var-file="environments/production.tfvars"

# EB 환경 삭제 (필요시)
eb terminate
```

**주의사항**:
- 삭제 전 중요한 데이터 백업 필수
- Parameter Store의 민감 정보는 별도 삭제 확인
- S3 버킷 내 파일은 수동 삭제 필요할 수 있음

## 프로젝트 기대 효과 및 예상 사용 사례

### 기대 효과

**1. 클라우드 교육 혁신**
- **학습 동기 부여**: 재미있는 성격 테스트로 클라우드 기술에 대한 관심 증대
- **개인화된 학습**: 각자의 성향에 맞는 AWS 서비스 학습 경로 제시
- **지식 정착**: 추상적인 클라우드 개념을 구체적인 성격 유형으로 체화

**2. 조직 내 클라우드 문화 확산**
- **팀 빌딩**: 구성원들의 클라우드 성향 파악을 통한 효율적인 역할 분담
- **의사소통 개선**: 공통된 언어(CBTI 유형)를 통한 원활한 소통
- **채용 및 배치**: 직무별 최적 CBTI 유형 매칭으로 인재 배치 최적화

**3. AWS 생태계 활성화**
- **서비스 인지도 향상**: 게임화된 방식으로 AWS 서비스 소개
- **실습 기회 제공**: CloudFormation 템플릿을 통한 실제 구현 경험
- **커뮤니티 형성**: 같은 유형 사용자들 간의 네트워킹 플랫폼

### 예상 사용 사례

**기업 및 조직**

**IT 교육 기관**
```
사용 시나리오: 클라우드 교육 과정 오리엔테이션
- 수강생들의 CBTI 테스트 실시
- 유형별 맞춤 커리큘럼 제공 (ISEV → 탐험적 학습, ICRO → 체계적 학습)
- 프로젝트 팀 구성 시 유형 고려 (ACEV + ASEO 조합으로 풀스택 팀 구성)
```

**스타트업 및 중소기업**
```
사용 시나리오: 클라우드 전환 프로젝트
- 팀원들의 클라우드 성향 파악
- 역할별 최적 인력 배치 (ICRV → 보안 담당, ASEO → 운영 담당)
- 클라우드 아키텍처 선택 가이드 (팀 구성에 따른 최적 AWS 서비스 조합)
```

**대기업 IT 부서**
```
사용 시나리오: 디지털 트랜스포메이션
- 임직원 클라우드 리터러시 진단
- 부서별 클라우드 도입 전략 수립
- 내부 클라우드 챔피언 발굴 (ISEV, ACEV 유형 중심)
```

**교육 기관**

**대학교 컴퓨터공학과**
```
사용 시나리오: 클라우드 컴퓨팅 수업
- 학기 초 학생들의 성향 파악
- 개인별 맞춤 과제 및 프로젝트 제시
  * ICRV 유형 → 보안 중심 프로젝트
  * ASEV 유형 → 서버리스 애플리케이션 개발
- 취업 진로 상담 자료로 활용
```

**온라인 교육 플랫폼**
```
사용 시나리오: 개인화된 학습 경험
- 회원가입 시 CBTI 테스트 제공
- 유형별 추천 강의 및 학습 경로
  * ICEO 유형 → Auto Scaling, Cost Optimization 강의
  * ASRV 유형 → Architecture Design, Database 강의
- 학습자 간 스터디 그룹 매칭
```

**개인 사용자**

**클라우드 입문자**
```
사용 시나리오: 클라우드 학습 시작점
- 자신의 클라우드 성향 발견
- 적합한 AWS 서비스부터 학습 시작
  * ASEO 유형 → Elastic Beanstalk부터 시작
  * ICEV 유형 → EC2, VPC부터 시작
- 같은 유형의 전문가 멘토링 연결
```

**클라우드 전문가**
```
사용 시나리오: 커리어 발전 및 네트워킹
- 자신의 전문 분야 재확인
- 새로운 기술 영역 탐색 (유형별 추천 서비스 확장)
- 동료들과의 성향 비교 및 협업 개선
```

**이벤트 및 컨퍼런스**

**AWS 사용자 그룹 밋업**
```
사용 시나리오: 아이스브레이킹 활동
- 참가자들의 CBTI 테스트 진행
- 유형별 테이블 구성으로 네트워킹
  * 보안 테이블: ICRV, ACRV 유형
  * 운영 테이블: ISRO, ASRO 유형
- 발표 주제 선정 시 유형 고려
```

**기술 컨퍼런스**
```
사용 시나리오: 부스 운영 및 참가자 참여
- 실시간 CBTI 테스트 체험
- 결과 공유를 통한 SNS 확산
- 참가자 데이터 수집 및 분석 (클라우드 트렌드 파악)
```

### 장기적 비전

**1단계: 개인화된 클라우드 성향 진단 (현재)**
- CBTI 테스트 및 결과 제공
- 기본적인 AWS 아키텍처 추천
- AI 기반 캐릭터 이미지 생성

**2단계: 학습 경로 및 커뮤니티 (6개월 후)**
- 유형별 상세 학습 로드맵 제공
- 같은 유형 사용자들의 온라인 커뮤니티
- 전문가 멘토링 매칭 시스템
- 기업별 팀 구성 최적화 도구

**3단계: AI 기반 개인화 서비스 (1년 후)**
- 학습 진도에 따른 동적 추천 시스템
- 실시간 클라우드 트렌드 반영
- 기업별 맞춤 CBTI 솔루션 제공
- AWS 자격증 취득 가이드 연동

---

**🎉 CBTI로 당신만의 클라우드 여정을 시작하세요!**

*"모든 클라우드 전문가는 고유한 성향을 가지고 있습니다. CBTI가 당신의 클라우드 정체성을 찾아드립니다."*