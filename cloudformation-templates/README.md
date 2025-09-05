# CBTI 유형별 CloudFormation 템플릿

각 CBTI 유형에 맞는 AWS 아키텍처를 CloudFormation으로 배포할 수 있는 템플릿 모음입니다.

## 📋 사용 가능한 템플릿 (16개 전체)

### 인프라 중심 (I) 유형들

#### 1. ISEV - 글로벌 웹 서비스 (`ISEV-global-web-service.yaml`)
**클라우드 탐험가를 위한 글로벌 웹 서비스**
- Route 53, CloudFront, WAF, ALB, Multi-AZ EC2, S3
- **예상 비용:** 월 $50-100

#### 2. ISEO - 엔터프라이즈 웹앱 (`ISEO-enterprise-webapp.yaml`)
**안정성 마스터를 위한 3-Tier 웹 애플리케이션**
- ALB, Multi-AZ EC2, RDS Multi-AZ, ElastiCache, Backup
- **예상 비용:** 월 $80-150

#### 3. ISRV - 글로벌 CDN (`ISRV-global-cdn.yaml`)
**미래 설계자를 위한 글로벌 CDN 플랫폼**
- S3, Route 53, CloudFront, 글로벌 배포
- **예상 비용:** 월 $20-50

#### 4. ISRO - 백업 및 모니터링 (`ISRO-backup-monitoring.yaml`)
**철통 관리자를 위한 백업 및 모니터링 시스템**
- CloudWatch, EC2, AWS Backup, 실시간 알림
- **예상 비용:** 월 $30-60

#### 5. ICEV - IaC 인프라 (`ICEV-iac-infrastructure.yaml`)
**코드 마법사를 위한 IaC 기반 인프라**
- EC2, VPC, CloudFormation, 버전 관리
- **예상 비용:** 월 $15-30

#### 6. ICEO - Auto Scaling 웹서비스 (`ICEO-auto-scaling.yaml`)
**효율 장인을 위한 자동 확장 웹서비스**
- ALB, Auto Scaling, CloudWatch, 비용 최적화
- **예상 비용:** 월 $30-200

#### 7. ICRV - 보안 강화 웹사이트 (`ICRV-security-website.yaml`)
**보안 수호자를 위한 보안 강화 웹사이트**
- S3 암호화, CloudFront, WAF, CloudTrail, Config
- **예상 비용:** 월 $25-50

#### 8. ICRO - 거버넌스 인프라 (`ICRO-governance-infrastructure.yaml`)
**거버넌스 엔지니어를 위한 관리형 인프라**
- Systems Manager, VPC, CloudWatch, 패치 관리
- **예상 비용:** 월 $20-40

### 앱 중심 (A) 유형들

#### 9. ASEV - 서버리스 API (`ASEV-serverless-api.yaml`)
**앱 혁신가를 위한 완전 서버리스 API**
- API Gateway, Lambda, DynamoDB, Cognito, SQS, SNS
- **예상 비용:** 월 $5-20

#### 10. ASEO - 플랫폼 서비스 (`ASEO-platform-service.yaml`)
**앱 오퍼레이터를 위한 Elastic Beanstalk 플랫폼**
- Elastic Beanstalk, RDS, SES, 자동 배포
- **예상 비용:** 월 $40-80

#### 11. ASRV - 아키텍처 디자이너 (`ASRV-architecture-designer.yaml`)
**Well-Architected 설계 애플리케이션**
- VPC, RDS Multi-AZ, Read Replica, 성능 모니터링
- **예상 비용:** 월 $60-120

#### 12. ASRO - 모니터링 시스템 (`ASRO-monitoring-system.yaml`)
**데이터 오퍼레이터를 위한 모니터링 시스템**
- CloudWatch, SNS, SQS, 실시간 알림
- **예상 비용:** 월 $10-25

#### 13. ACEV - 풀스택 웹앱 (`ACEV-fullstack-pioneer.yaml`)
**풀스택 개척자를 위한 모던 웹앱**
- EC2, S3, CloudFront, 프론트/백엔드 분리
- **예상 비용:** 월 $35-70

#### 14. ACEO - 딜리버리 엔지니어 (`ACEO-delivery-engineer.yaml`)
**배포 및 딜리버리 관리 시스템**
- EC2, RDS, API Gateway, 배포 파이프라인
- **예상 비용:** 월 $45-90

#### 15. ACRV - 보안 개발자 (`ACRV-security-developer.yaml`)
**보안 중심 Auto Scaling 애플리케이션**
- WAF, Auto Scaling, 보안 모니터링, Fail2Ban
- **예상 비용:** 월 $40-100

#### 16. ACRO - 엣지 수호자 (`ACRO-edge-guardian.yaml`)
**엣지 보안 및 인증 서비스**
- Cognito, WAF, Route 53, CloudFront, 글로벌 인증
- **예상 비용:** 월 $30-60

---

## 🚀 빠른 배포 명령어

### 기본 배포 (키페어 필요)
```bash
# ISEV - 글로벌 웹 서비스
aws cloudformation create-stack --stack-name isev-global-web --template-body file://ISEV-global-web-service.yaml --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair --capabilities CAPABILITY_NAMED_IAM

# ASEV - 서버리스 API (키페어 불필요)
aws cloudformation create-stack --stack-name asev-serverless-api --template-body file://ASEV-serverless-api.yaml --capabilities CAPABILITY_NAMED_IAM

# ICEO - Auto Scaling
aws cloudformation create-stack --stack-name iceo-auto-scaling --template-body file://ICEO-auto-scaling.yaml --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair --capabilities CAPABILITY_NAMED_IAM

# ACRV - 보안 개발자
aws cloudformation create-stack --stack-name acrv-security-dev --template-body file://ACRV-security-developer.yaml --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair --capabilities CAPABILITY_NAMED_IAM

# ACRO - 엣지 수호자 (키페어 불필요)
aws cloudformation create-stack --stack-name acro-edge-guardian --template-body file://ACRO-edge-guardian.yaml --capabilities CAPABILITY_NAMED_IAM
```

---

## 🚀 배포 전 준비사항

### 1. AWS CLI 설정
```bash
aws configure
# Access Key, Secret Key, Region 설정
```

### 2. EC2 Key Pair 생성 (EC2 사용 템플릿의 경우)
```bash
aws ec2 create-key-pair --key-name cbti-keypair --query 'KeyMaterial' --output text > cbti-keypair.pem
chmod 400 cbti-keypair.pem
```

### 3. 필요한 권한 확인
배포하는 사용자는 다음 권한이 필요합니다:
- CloudFormation 전체 권한
- EC2, VPC, IAM 생성 권한
- 해당 템플릿의 모든 AWS 서비스 권한

---

## 📊 배포 후 확인사항

### 1. 스택 상태 확인
```bash
aws cloudformation describe-stacks --stack-name your-stack-name
```

### 2. 리소스 확인
```bash
aws cloudformation list-stack-resources --stack-name your-stack-name
```

### 3. 출력값 확인
```bash
aws cloudformation describe-stacks --stack-name your-stack-name --query 'Stacks[0].Outputs'
```

---

## 🔧 커스터마이징 가이드

### 파라미터 수정
각 템플릿의 `Parameters` 섹션에서 기본값을 수정할 수 있습니다:

```yaml
Parameters:
  InstanceType:
    Type: String
    Default: t3.micro  # 여기를 t3.small로 변경 가능
    AllowedValues: [t3.micro, t3.small, t3.medium]
```

### 리소스 추가
필요에 따라 추가 AWS 서비스를 템플릿에 추가할 수 있습니다:

```yaml
Resources:
  AdditionalS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-additional-bucket
```

---

## 🗑️ 리소스 정리

### 스택 삭제
```bash
aws cloudformation delete-stack --stack-name your-stack-name
```

### 삭제 상태 확인
```bash
aws cloudformation describe-stacks --stack-name your-stack-name
```

---

## ⚠️ 주의사항

1. **비용 관리**: 배포 후 불필요한 리소스는 즉시 삭제하세요
2. **보안**: 기본 보안 그룹 설정을 프로덕션 환경에 맞게 수정하세요
3. **백업**: 중요한 데이터는 별도 백업을 설정하세요
4. **모니터링**: CloudWatch 알람을 설정하여 비용과 성능을 모니터링하세요

---

## 🆘 문제 해결

### 일반적인 오류

1. **권한 부족**
   ```
   User: arn:aws:iam::123456789012:user/username is not authorized to perform: iam:CreateRole
   ```
   → IAM 권한 확인 및 `--capabilities CAPABILITY_NAMED_IAM` 추가

2. **키페어 없음**
   ```
   The key pair 'your-key-pair' does not exist
   ```
   → EC2 콘솔에서 키페어 생성 또는 기존 키페어 이름 사용

3. **리소스 한도 초과**
   ```
   You have requested more instances (5) than your current instance limit of 2
   ```
   → AWS Support에 인스턴스 한도 증가 요청

### 로그 확인
```bash
aws cloudformation describe-stack-events --stack-name your-stack-name
```

---

## 📞 지원

- AWS 공식 문서: https://docs.aws.amazon.com/cloudformation/
- AWS 프리티어: https://aws.amazon.com/free/
- AWS 비용 계산기: https://calculator.aws/