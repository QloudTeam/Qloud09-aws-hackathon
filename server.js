const express = require('express');
const path = require('path');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
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

// CBTI 결과 저장 API
app.post('/api/cbti-result', async (req, res) => {
  try {
    const { nickname, cbtiType, createdAt } = req.body;
    
    const accessKeyId = await getParameter('/qloud/aws/access-key-id');
    const secretAccessKey = await getParameter('/qloud/aws/secret-access-key');
    const region = await getParameter('/qloud/aws/region');
    
    const dynamoClient = new DynamoDBClient({
      region,
      credentials: { accessKeyId, secretAccessKey }
    });

    const item = {
      nickname,
      cbtiType,
      createdAt,
      ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30일 후 만료
    };

    const command = new PutItemCommand({
      TableName: 'cbti-users',
      Item: marshall(item)
    });

    await dynamoClient.send(command);
    res.json({ success: true });
  } catch (error) {
    console.error('DynamoDB save error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DynamoDB 테스트 API
app.get('/api/test-dynamodb', async (req, res) => {
  try {
    const accessKeyId = await getParameter('/qloud/aws/access-key-id');
    const secretAccessKey = await getParameter('/qloud/aws/secret-access-key');
    const region = await getParameter('/qloud/aws/region');
    
    const dynamoClient = new DynamoDBClient({
      region,
      credentials: { accessKeyId, secretAccessKey }
    });

    // 간단한 스캔 테스트
    const command = new ScanCommand({
      TableName: 'cbti-users',
      Limit: 5
    });

    const response = await dynamoClient.send(command);
    const items = response.Items?.map(item => unmarshall(item)) || [];
    
    res.json({ success: true, items, count: items.length });
  } catch (error) {
    console.error('DynamoDB test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 호환 사용자 조회 API
app.post('/api/cbti-matches', async (req, res) => {
  try {
    const { bestMatchTypes, worstMatchTypes } = req.body;
    
    const accessKeyId = await getParameter('/qloud/aws/access-key-id');
    const secretAccessKey = await getParameter('/qloud/aws/secret-access-key');
    const region = await getParameter('/qloud/aws/region');
    
    const dynamoClient = new DynamoDBClient({
      region,
      credentials: { accessKeyId, secretAccessKey }
    });

    // 모든 사용자 조회
    const getBestMatches = async () => {
      const results = [];
      for (const cbtiType of bestMatchTypes) {
        try {
          const command = new QueryCommand({
            TableName: 'cbti-users',
            IndexName: 'cbtiType-createdAt-index',
            KeyConditionExpression: 'cbtiType = :cbtiType',
            ExpressionAttributeValues: marshall({
              ':cbtiType': cbtiType
            }),
            ScanIndexForward: false // 최신순
          });
          
          const response = await dynamoClient.send(command);
          console.log(`Query response for ${cbtiType}:`, response);
          const items = response.Items?.map(item => {
            const unmarshalled = unmarshall(item);
            console.log(`Unmarshalled item:`, unmarshalled);
            return unmarshalled;
          }) || [];
          results.push(...items);
        } catch (error) {
          console.error(`Error querying ${cbtiType}:`, error);
        }
      }
      console.log('Best matches results:', results);
      return results; // 제한 없음
    };

    const getWorstMatches = async () => {
      const results = [];
      for (const cbtiType of worstMatchTypes) {
        try {
          const command = new QueryCommand({
            TableName: 'cbti-users',
            IndexName: 'cbtiType-createdAt-index',
            KeyConditionExpression: 'cbtiType = :cbtiType',
            ExpressionAttributeValues: marshall({
              ':cbtiType': cbtiType
            }),
            ScanIndexForward: false // 최신순
          });
          
          const response = await dynamoClient.send(command);
          console.log(`Query response for ${cbtiType}:`, response);
          const items = response.Items?.map(item => {
            const unmarshalled = unmarshall(item);
            console.log(`Unmarshalled item:`, unmarshalled);
            return unmarshalled;
          }) || [];
          results.push(...items);
        } catch (error) {
          console.error(`Error querying ${cbtiType}:`, error);
        }
      }
      console.log('Worst matches results:', results);
      return results; // 제한 없음
    };

    const [bestMatches, worstMatches] = await Promise.all([
      getBestMatches(),
      getWorstMatches()
    ]);

    res.json({ 
      success: true, 
      bestMatches: bestMatches || [], 
      worstMatches: worstMatches || [] 
    });
  } catch (error) {
    console.error('DynamoDB query error:', error);
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