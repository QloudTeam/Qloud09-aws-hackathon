#!/bin/bash
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs python3 python3-pip git

# Python 패키지 설치
pip3 install diagrams

# MCP 서버 설치
npm install -g @modelcontextprotocol/server-everything

# CBTI 앱 디렉토리 생성
mkdir -p /opt/cbti-app
cd /opt/cbti-app

# 간단한 웹 서버 생성
cat > server.js << 'EOF'
const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.url === '/generate-diagram' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        generateDiagram(data.code, res);
      } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Invalid JSON'}));
      }
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <h1>🚀 CBTI 웹 서비스 + MCP Server</h1>
      <p>✅ EC2 배포 성공!</p>
      <p>🎨 AWS Diagram MCP Server 설치됨</p>
      <p>📊 서버 시간: ${new Date().toISOString()}</p>
      <p>🌐 요청 URL: ${req.url}</p>
    `);
  }
});

function generateDiagram(code, res) {
  const python = spawn('python3', ['-c', code]);
  let output = '';
  let error = '';
  
  python.stdout.on('data', (data) => {
    output += data.toString();
  });
  
  python.stderr.on('data', (data) => {
    error += data.toString();
  });
  
  python.on('close', (code) => {
    if (code === 0) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({success: true, output: output}));
    } else {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: error}));
    }
  });
}

server.listen(3000, '0.0.0.0', () => {
  console.log('CBTI Server with MCP running on port 3000');
});
EOF

nohup node server.js > /var/log/cbti-app.log 2>&1 &