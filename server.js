const express = require('express');
const path = require('path');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Parameter Store에서 값 가져오기
const getParameter = async (name) => {
  const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const command = new GetParameterCommand({ Name: name, WithDecryption: true });
  const response = await ssmClient.send(command);
  return response.Parameter.Value;
};

// Bedrock 이미지 생성 API
app.post('/api/bedrock-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const accessKeyId = await getParameter('/qloud/aws/access-key-id');
    const secretAccessKey = await getParameter('/qloud/aws/secret-access-key');
    const region = await getParameter('/qloud/aws/region');
    
    const client = new BedrockRuntimeClient({
      region,
      credentials: { accessKeyId, secretAccessKey }
    });

    const requestPayload = {
      taskType: 'TEXT_IMAGE',
      textToImageParams: {
        text: prompt,
        negativeText: 'blurry, low quality, distorted, ugly, bad anatomy, extra limbs, deformed'
      },
      imageGenerationConfig: {
        numberOfImages: 1,
        height: 1024,
        width: 1024,
        cfgScale: 8.0,
        seed: Math.floor(Math.random() * 1000000)
      }
    };

    const command = new InvokeModelCommand({
      modelId: 'amazon.nova-canvas-v1:0',
      body: JSON.stringify(requestPayload),
      contentType: 'application/json',
      accept: 'application/json'
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    if (responseBody.images && responseBody.images.length > 0) {
      res.json({ success: true, image: `data:image/png;base64,${responseBody.images[0]}` });
    } else {
      res.json({ success: false, error: 'No image generated' });
    }
  } catch (error) {
    console.error('Bedrock API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// SPA를 위한 fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});