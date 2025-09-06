#!/bin/bash

# 슬랙봇 배포 스크립트
set -e

ENVIRONMENT=${1:-production}
STACK_NAME="cbti-slack-bot-${ENVIRONMENT}"

echo "🚀 CBTI 슬랙봇 배포 시작 (환경: ${ENVIRONMENT})"

# Lambda 함수 패키징
echo "📦 Lambda 함수 패키징 중..."
cd lambda/slack-bot
zip -r function.zip index.js package.json node_modules/ 2>/dev/null || true

# CloudFormation 스택 배포
echo "☁️ CloudFormation 스택 배포 중..."
cd ../../

aws cloudformation deploy \
  --template-file lambda/slack-bot/template.yaml \
  --stack-name ${STACK_NAME} \
  --parameter-overrides Environment=${ENVIRONMENT} \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1

# Lambda 함수 코드 업데이트
echo "🔄 Lambda 함수 코드 업데이트 중..."
aws lambda update-function-code \
  --function-name cbti-slack-bot-${ENVIRONMENT} \
  --zip-file fileb://lambda/slack-bot/function.zip \
  --region us-east-1

# 출력값 확인
echo "✅ 배포 완료! Request URL 확인:"
aws cloudformation describe-stacks \
  --stack-name ${STACK_NAME} \
  --query 'Stacks[0].Outputs' \
  --output table \
  --region us-east-1

echo ""
echo "🔗 슬랙 앱 설정에서 다음 URL을 Event Subscriptions Request URL로 설정하세요:"
aws cloudformation describe-stacks \
  --stack-name ${STACK_NAME} \
  --query 'Stacks[0].Outputs[?OutputKey==`EventsUrl`].OutputValue' \
  --output text \
  --region us-east-1