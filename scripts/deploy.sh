#!/bin/bash

set -e

echo "🚀 Qloud Terraform 배포 시작..."

# 환경 변수 설정
ENVIRONMENT=${1:-production}
TERRAFORM_DIR="terraform"

echo "📋 환경: $ENVIRONMENT"

# 사전 요구사항 체크
echo "🔍 사전 요구사항 확인 중..."
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform이 설치되지 않았습니다."
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI가 설치되지 않았습니다."
    exit 1
fi

# AWS 자격증명 입력
echo "🔑 AWS 자격증명을 입력해주세요:"
read -p "AWS Access Key ID: " AWS_ACCESS_KEY_ID
read -s -p "AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
echo
read -p "Slack Bot Token (선택사항): " SLACK_BOT_TOKEN

# Terraform 디렉토리로 이동
cd $TERRAFORM_DIR

# Terraform 초기화
echo "🏗️  Terraform 초기화 중..."
terraform init -upgrade

# Terraform 계획
echo "📊 배포 계획 확인 중..."
terraform plan \
  -var-file="environments/${ENVIRONMENT}.tfvars" \
  -var="aws_access_key_id=$AWS_ACCESS_KEY_ID" \
  -var="aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
  -var="slack_bot_token=$SLACK_BOT_TOKEN"

# 사용자 확인
read -p "위 계획으로 배포하시겠습니까? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ 배포가 취소되었습니다."
    exit 1
fi

# Terraform 적용
echo "🚀 인프라 배포 중..."
terraform apply -auto-approve \
  -var-file="environments/${ENVIRONMENT}.tfvars" \
  -var="aws_access_key_id=$AWS_ACCESS_KEY_ID" \
  -var="aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
  -var="slack_bot_token=$SLACK_BOT_TOKEN"

# 출력값 표시
echo "✅ 배포가 완료되었습니다!"
echo "📋 배포 정보:"
terraform output

echo ""
echo "📝 다음 단계:"
echo "1. 종속성을 설치하세요: npm install"
echo "2. 애플리케이션 코드를 빌드하세요: npm run build"
echo "3. EB 초기화를 진행하세요: eb init"
echo "4. EB CLI로 애플리케이션을 배포하세요: eb deploy"

echo ""
echo "🌐 애플리케이션 URL:"
terraform output -raw application_url