#!/bin/bash
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

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
  `);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
EOF

nohup node server.js > /var/log/cbti-app.log 2>&1 &