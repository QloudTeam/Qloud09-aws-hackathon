#!/bin/bash

# EC2 배포 스크립트
set -e

echo "🚀 EC2 배포 시작"

# 1. 프론트엔드 빌드
echo "📦 프론트엔드 빌드 중..."
npm install
npm run build

# 2. EC2 인스턴스 생성 (t3.micro)
echo "🖥️ EC2 인스턴스 생성 중..."
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.micro \
  --key-name cbti-key \
  --security-group-ids sg-0123456789abcdef0 \
  --subnet-id subnet-0123456789abcdef0 \
  --user-data file://user-data.sh \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=CBTI-WebServer}]' \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "✅ EC2 인스턴스 생성됨: $INSTANCE_ID"

# 3. 인스턴스 상태 확인
echo "⏳ 인스턴스 시작 대기 중..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# 4. 퍼블릭 IP 가져오기
PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "🌐 퍼블릭 IP: $PUBLIC_IP"

# 5. 배포 완료 메시지
echo "✅ 배포 완료!"
echo "📊 배포 정보:"
echo "  - EC2 인스턴스 ID: $INSTANCE_ID"
echo "  - 퍼블릭 IP: $PUBLIC_IP"
echo "  - 웹사이트 URL: http://$PUBLIC_IP:3000"
echo "  - S3 데이터 버킷: cbti-data-bucket-1757106101"
echo ""
echo "🎉 CBTI 웹 서비스가 성공적으로 배포되었습니다!"