#!/bin/bash

# CBTI 웹 서비스 배포 스크립트

set -e

ENVIRONMENT=${1:-dev}
STACK_NAME="cbti-stack-${ENVIRONMENT}"

echo "🚀 CBTI 웹 서비스 배포 시작 (환경: ${ENVIRONMENT})"

# 1. 프론트엔드 빌드
echo "📦 프론트엔드 빌드 중..."
npm install
npm run build

# 2. Lambda 함수 빌드
echo "🔧 Lambda 함수 빌드 중..."

# Bedrock 이미지 생성 함수
cd lambda/bedrock-image
npm install
npm run build
cd ../..

# CBTI API 함수
cd lambda/cbti-api
npm install
npm run build
cd ../..

# 3. SAM 배포
echo "☁️ AWS 인프라 배포 중..."
cd infrastructure

sam build
sam deploy \
  --stack-name ${STACK_NAME} \
  --parameter-overrides Environment=${ENVIRONMENT} \
  --capabilities CAPABILITY_IAM \
  --resolve-s3 \
  --confirm-changeset

# 4. 배포 결과 확인
echo "📋 배포 결과 확인 중..."
WEBSITE_BUCKET=$(aws cloudformation describe-stacks \
  --stack-name ${STACK_NAME} \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucketName`].OutputValue' \
  --output text)

API_URL=$(aws cloudformation describe-stacks \
  --stack-name ${STACK_NAME} \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiGatewayURL`].OutputValue' \
  --output text)

WEBSITE_URL=$(aws cloudformation describe-stacks \
  --stack-name ${STACK_NAME} \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
  --output text)

# 5. 프론트엔드 파일 S3 업로드
echo "📤 웹사이트 파일 업로드 중..."
cd ..
aws s3 sync dist/ s3://${WEBSITE_BUCKET}/ --delete

echo "✅ 배포 완료!"
echo ""
echo "📊 배포 정보:"
echo "  - 웹사이트 URL: ${WEBSITE_URL}"
echo "  - API URL: ${API_URL}"
echo "  - S3 버킷: ${WEBSITE_BUCKET}"
echo ""
echo "🎉 CBTI 웹 서비스가 성공적으로 배포되었습니다!"