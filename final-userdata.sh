#!/bin/bash
yum update -y
yum install -y nodejs npm

mkdir -p /home/ec2-user/cbti-app
cd /home/ec2-user/cbti-app

cat > server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <h1>🚀 CBTI 웹 서비스</h1>
    <p>✅ EC2 배포 성공!</p>
    <p>📊 서버 시간: ${new Date().toISOString()}</p>
    <p>🌐 요청 URL: ${req.url}</p>
    <p>🔗 <a href="https://cbti-data-bucket-1757106101.s3.amazonaws.com/data/cbti.json">CBTI 데이터</a></p>
    <p>🔗 <a href="https://cbti-data-bucket-1757106101.s3.amazonaws.com/data/questions.json">질문 데이터</a></p>
  `);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('CBTI Server running on port 3000');
});
EOF

chown ec2-user:ec2-user server.js
sudo -u ec2-user nohup node server.js > /var/log/cbti-app.log 2>&1 &