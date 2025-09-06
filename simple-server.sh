#!/bin/bash
yum update -y
yum install -y nodejs npm

cat > /home/ec2-user/server.js << 'EOF'
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>CBTI Server Working!</h1><p>Time: ' + new Date() + '</p>');
});
server.listen(3000, '0.0.0.0');
EOF

cd /home/ec2-user
nohup node server.js &