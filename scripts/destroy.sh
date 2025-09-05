#!/bin/bash

set -e

echo "🧹 Qloud 리소스 정리 시작..."

ENVIRONMENT=${1:-production}
TERRAFORM_DIR="terraform"

echo "📋 환경: $ENVIRONMENT"

cd $TERRAFORM_DIR

# 현재 상태 확인
echo "📊 현재 리소스 상태 확인 중..."
terraform show

echo ""
echo "⚠️  경고: 다음 리소스들이 삭제됩니다:"
terraform plan -destroy -var-file="environments/${ENVIRONMENT}.tfvars"

# 사용자 확인
read -p "정말로 모든 리소스를 삭제하시겠습니까? (yes/N): " confirm
if [[ $confirm != "yes" ]]; then
    echo "❌ 삭제가 취소되었습니다."
    exit 1
fi

# Terraform 삭제
echo "🗑️  리소스 삭제 중..."
terraform destroy -auto-approve -var-file="environments/${ENVIRONMENT}.tfvars"

echo "✅ 모든 리소스가 정리되었습니다!"