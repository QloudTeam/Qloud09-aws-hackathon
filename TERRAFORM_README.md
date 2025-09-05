# Qloud Terraform Infrastructure

이 프로젝트는 Qloud CBTI 애플리케이션의 AWS 인프라를 Terraform으로 관리합니다.

## 아키텍처

```
사용자 → ALB → Elastic Beanstalk → Parameter Store → Bedrock
```

## 사전 요구사항

- Terraform >= 1.0
- AWS CLI
- Node.js 18+
- 유효한 AWS 자격증명

## 빠른 시작

### 1. 인프라 배포

```bash
./scripts/deploy.sh production
```

### 2. 애플리케이션 배포

```bash
# 애플리케이션 빌드
npm run build

# EB CLI로 배포 (기존 EB 환경이 있는 경우)
eb deploy

# 또는 새로운 애플리케이션 버전 생성
zip -r app.zip . -x "terraform/*" "scripts/*" "node_modules/*"
# AWS 콘솔에서 수동 업로드
```

### 3. 리소스 정리

```bash
./scripts/destroy.sh production
```

## 생성되는 리소스

### Elastic Beanstalk
- Application: `qloud-production`
- Environment: `qloud-production`
- Platform: Node.js 22 on Amazon Linux 2023
- Instance Type: t3.micro

### Parameter Store
- `/qloud/aws/access-key-id` (SecureString)
- `/qloud/aws/secret-access-key` (SecureString)
- `/qloud/aws/region` (String)
- `/qloud/slack/bot-token` (SecureString, 선택사항)

### IAM Roles
- EB Service Role: Elastic Beanstalk 서비스 역할
- EC2 Instance Role: Parameter Store 및 Bedrock 접근 권한

### S3
- EB 버전 저장용 버킷 (암호화 및 버전 관리 활성화)

## 환경별 배포

### 개발 환경
```bash
./scripts/deploy.sh dev
```

### 프로덕션 환경
```bash
./scripts/deploy.sh production
```

## 수동 Terraform 명령어

```bash
cd terraform

# 초기화
terraform init

# 계획 확인
terraform plan -var-file="environments/prod.tfvars" \
  -var="aws_access_key_id=YOUR_KEY" \
  -var="aws_secret_access_key=YOUR_SECRET"

# 적용
terraform apply -var-file="environments/prod.tfvars" \
  -var="aws_access_key_id=YOUR_KEY" \
  -var="aws_secret_access_key=YOUR_SECRET"

# 삭제
terraform destroy -var-file="environments/prod.tfvars"
```

## 주의사항

1. **민감한 정보**: AWS 자격증명은 명령행에서 입력받으며, 코드에 하드코딩되지 않습니다.
2. **Bedrock 권한**: 배포 후 Bedrock 모델 접근 권한을 수동으로 활성화해야 할 수 있습니다.
3. **비용**: 리소스 사용 후 반드시 `destroy.sh`로 정리하세요.

## 트러블슈팅

### Terraform 초기화 실패
```bash
rm -rf terraform/.terraform*
terraform init
```

### 권한 오류
- AWS 자격증명이 올바른지 확인
- IAM 사용자에게 필요한 권한이 있는지 확인

### EB 배포 실패
- 애플리케이션이 빌드되었는지 확인 (`dist/` 폴더 존재)
- Parameter Store에 값이 올바르게 저장되었는지 확인