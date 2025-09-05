# AWS 아키텍처 자동 생성 가이드

## 🏗️ 구현된 기능

### 1. **동적 아키텍처 생성**
- CBTI 유형별 프리티어 최적화 아키텍처 자동 매핑
- AWS Well-Architected Framework 준수
- 16가지 CBTI 유형별 맞춤 설계

### 2. **MCP 다이어그램 생성**
- AWS Diagram MCP 서버 활용
- 실시간 다이어그램 생성 및 PNG 변환
- 프리티어 정보 포함된 시각적 표현

### 3. **IaC 코드 자동 생성**
- **AWS CDK (TypeScript)**: 완전한 스택 코드
- **Terraform**: HCL 형식 인프라 코드
- 프리티어 범위 내 리소스 크기 최적화

## 📊 CBTI 유형별 아키텍처 매핑

### 서버리스 중심 유형
- **ASEV (앱 혁신가)**: API Gateway + Lambda + DynamoDB + S3 + CloudFront
- **ASEO (앱 오퍼레이터)**: Elastic Beanstalk + RDS + S3 + CloudWatch

### 인프라 중심 유형  
- **ISEV (클라우드 탐험가)**: CloudFront + ALB + EC2 + S3
- **ISEO (안정성 마스터)**: ELB + EC2 + RDS + Auto Scaling

### 데이터 분석 유형
- **ASRV (아키텍처 디자이너)**: S3 + Glue + Athena + QuickSight

### 보안 중심 유형
- **ICRV (보안 수호자)**: WAF + CloudFront + ALB + EC2 + VPC + CloudTrail

## 💰 프리티어 최적화 전략

### 컴퓨팅 서비스
- **Lambda**: 1M 요청/월 무료
- **EC2**: t4g.micro 인스턴스 750시간/월
- **Elastic Beanstalk**: 추가 비용 없음 (EC2 비용만)

### 스토리지 서비스
- **S3**: 5GB 표준 스토리지 무료
- **EBS**: 30GB 범용 SSD 무료

### 데이터베이스 서비스
- **DynamoDB**: 25GB 스토리지 + 25 WCU/RCU 무료
- **RDS**: db.t4g.micro 750시간/월 + 20GB 스토리지

### 네트워킹 서비스
- **CloudFront**: 50GB 데이터 전송 + 2M 요청 무료
- **API Gateway**: 1M 요청/월 무료
- **ALB**: 750시간/월 무료

## 🔧 사용 방법

### 1. 결과 페이지에서 확인
```typescript
// CBTI 결과 페이지에서 자동 생성
<ArchitectureDiagram 
  cbtiType="ASEV" 
  recommendedServices={["Lambda", "API Gateway", "DynamoDB"]}
/>
```

### 2. 다이어그램 다운로드
- PNG 형식으로 다운로드 가능
- 프리티어 정보 포함된 시각적 표현

### 3. IaC 코드 다운로드
- **AWS CDK**: `{cbtiType}-stack.ts` 파일
- **Terraform**: `{cbtiType}.tf` 파일

## 📋 배포 가능한 IaC 코드 예시

### AWS CDK 배포
```bash
# CDK 프로젝트 초기화
cdk init app --language typescript

# 생성된 스택 파일 복사
cp ASEV-stack.ts lib/

# 배포
cdk deploy
```

### Terraform 배포
```bash
# Terraform 초기화
terraform init

# 계획 확인
terraform plan

# 배포
terraform apply
```

## 🎯 확장 가능성

### 추가 예정 기능
1. **실시간 비용 계산**: 프리티어 초과 시 예상 비용
2. **보안 체크리스트**: 아키텍처별 보안 권장사항
3. **성능 최적화 가이드**: 각 서비스별 튜닝 포인트
4. **모니터링 설정**: CloudWatch 대시보드 자동 생성

이 시스템을 통해 CBTI 결과에 따른 맞춤형 AWS 아키텍처를 즉시 확인하고, 실제 배포 가능한 코드까지 제공받을 수 있습니다.