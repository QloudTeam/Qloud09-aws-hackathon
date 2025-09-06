#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "Starting user-data script"

yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

mkdir -p /opt/cbti-app
cd /opt/cbti-app

cat > server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>CBTI Server Running</h1>');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server started on port 3000');
});
EOF

echo "Starting Node.js server"
node server.js &
echo "User-data script completed"