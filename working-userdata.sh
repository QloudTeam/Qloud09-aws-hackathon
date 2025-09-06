#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

yum update -y

# Amazon Linux Extras로 Node.js 설치
amazon-linux-extras install nodejs18 -y

mkdir -p /opt/cbti-app
cd /opt/cbti-app

cat > server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <h1>🚀 CBTI 웹 서비스</h1>
    <p>✅ EC2 배포 성공!</p>
    <p>📊 서버 시간: ${new Date().toISOString()}</p>
    <p>🌐 요청 URL: ${req.url}</p>
    <p>🔗 S3 데이터: <a href="https://cbti-data-bucket-1757106101.s3.amazonaws.com/data/cbti.json">CBTI 데이터</a></p>
  `);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('CBTI Server running on port 3000');
});
EOF

nohup node server.js > /var/log/cbti-app.log 2>&1 &
echo "User-data script completed"