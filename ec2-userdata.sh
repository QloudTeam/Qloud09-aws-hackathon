#!/bin/bash
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git
npm install -g pm2

mkdir -p /opt/cbti-app
cd /opt/cbti-app

cat > package.json << 'EOF'
{
  "name": "cbti-web-service",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "cors": "^2.8.5"
  }
}
EOF

cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// S3 데이터 프록시 엔드포인트
app.get('/api/data/:file', async (req, res) => {
  try {
    const file = req.params.file;
    const s3Url = `https://cbti-data-bucket-1757106101.s3.amazonaws.com/data/${file}`;
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(s3Url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// CloudFormation 템플릿 프록시
app.get('/api/cloudformation/:file', async (req, res) => {
  try {
    const file = req.params.file;
    const s3Url = `https://cbti-data-bucket-1757106101.s3.amazonaws.com/cloudformation-templates/${file}`;
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(s3Url);
    const data = await response.text();
    res.set('Content-Type', 'application/x-yaml');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 CBTI 웹 서비스</h1>
    <p>✅ EC2 배포 성공!</p>
    <p>📊 S3 데이터 연동 완료</p>
    <ul>
      <li><a href="/api/data/cbti.json">CBTI 데이터</a></li>
      <li><a href="/api/data/questions.json">질문 데이터</a></li>
    </ul>
  `);
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`CBTI 서버가 포트 ${port}에서 실행 중입니다.`);
});
EOF

npm install
npm install node-fetch
pm2 start server.js --name "cbti-app"
pm2 startup
pm2 save
EOF