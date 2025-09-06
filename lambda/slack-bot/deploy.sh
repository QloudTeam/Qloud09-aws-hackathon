#!/bin/bash

set -e

FUNCTION_NAME="cbti-slack-bot-production"
STACK_NAME="cbti-slack-bot-stack"

echo "🤖 CBTI 슬랙 봇 Lambda 함수 배포 시작..."

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 함수 코드 압축
echo "📦 함수 코드 압축 중..."
zip -r function.zip index.js node_modules/ package.json

# CloudFormation 스택 배포
echo "🚀 CloudFormation 스택 배포 중..."
if aws cloudformation describe-stacks --stack-name "$STACK_NAME" &> /dev/null; then
    echo "📦 기존 스택 업데이트 중..."
    aws cloudformation update-stack \
        --stack-name "$STACK_NAME" \
        --template-body file://template.yaml \
        --capabilities CAPABILITY_NAMED_IAM
else
    echo "🆕 새 스택 생성 중..."
    aws cloudformation create-stack \
        --stack-name "$STACK_NAME" \
        --template-body file://template.yaml \
        --capabilities CAPABILITY_NAMED_IAM
fi

# 스택 배포 완료 대기
echo "⏳ 스택 배포 완료 대기 중..."
aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" 2>/dev/null || \
aws cloudformation wait stack-update-complete --stack-name "$STACK_NAME"

# Lambda 함수 코드 업데이트
echo "🔄 Lambda 함수 코드 업데이트 중..."
aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://function.zip

# 정리
rm -f function.zip

# 결과 출력
echo "✅ 배포 완료!"
EVENTS_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`EventsUrl`].OutputValue' \
    --output text)

MESSAGE_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`MessageUrl`].OutputValue' \
    --output text)

echo "🔗 Slack Events URL: $EVENTS_URL"
echo "💬 Slack Message URL: $MESSAGE_URL"
echo ""
echo "📝 다음 단계:"
echo "1. 슬랙 앱 Event Subscriptions 설정:"
echo "   - Request URL: $EVENTS_URL"
echo "   - Subscribe to bot events: app_mention, message.channels"
echo "2. 프론트엔드에서 Message URL 사용: $MESSAGE_URL"
echo "3. 슬랙 봇 OAuth & Permissions:"
echo "   - chat:write, channels:read 권한 추가"