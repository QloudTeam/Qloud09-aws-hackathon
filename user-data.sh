#!/bin/bash

# EC2 인스턴스 초기 설정 스크립트
yum update -y

# Node.js 20 설치
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# Git 설치
yum install -y git

# PM2 글로벌 설치
npm install -g pm2

# 애플리케이션 디렉토리 생성
mkdir -p /opt/cbti-app
cd /opt/cbti-app

# GitHub에서 코드 클론 (실제 배포 시 수정 필요)
# git clone https://github.com/your-repo/cbti-app.git .

# 임시로 로컬 파일 복사 (실제 배포에서는 S3나 CodeDeploy 사용)
# 여기서는 수동으로 파일을 업로드해야 함

# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# PM2로 애플리케이션 시작
pm2 start server.js --name "cbti-app"
pm2 startup
pm2 save

# Nginx 설치 및 설정 (선택사항)
yum install -y nginx
systemctl start nginx
systemctl enable nginx

# 방화벽 설정
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

echo "EC2 인스턴스 설정 완료"