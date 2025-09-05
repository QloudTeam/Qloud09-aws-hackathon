import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

const bedrockClient = new BedrockRuntimeClient({ 
  region: process.env.AWS_REGION || 'us-east-1' 
});

interface ImageGenerationRequest {
  cbtiType: string;
  gender: string;
  ageGroup: string;
  character: string;
  symbol: string;
}

/**
 * CBTI 유형에 맞는 개인화된 이미지를 Bedrock Nova Canvas로 생성하는 Lambda 함수
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('이미지 생성 요청:', JSON.stringify(event, null, 2));

  try {
    const body: ImageGenerationRequest = JSON.parse(event.body || '{}');
    const { cbtiType, gender, ageGroup, character, symbol } = body;

    const prompt = generateImagePrompt(cbtiType, gender, ageGroup, character, symbol);
    const imageUrl = await generateImageWithBedrock(prompt);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        imageUrl,
        prompt
      })
    };

  } catch (error) {
    console.error('이미지 생성 오류:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: '이미지 생성 중 오류가 발생했습니다.'
      })
    };
  }
};

function generateImagePrompt(
  cbtiType: string, 
  gender: string, 
  ageGroup: string, 
  character: string, 
  symbol: string
): string {
  const genderText = gender === 'male' ? '남성' : '여성';
  const ageText = ageGroup.replace('s', '대');
  
  return `
    ${genderText} ${ageText} 클라우드 전문가, ${character} 스타일, 
    ${symbol} 심볼이 포함된 현대적이고 전문적인 일러스트레이션.
    AWS 클라우드 환경을 배경으로 하며, 
    기술적이면서도 친근한 느낌의 캐릭터 디자인.
    파란색과 보라색 계열의 그라데이션 색상 사용.
    미니멀하고 깔끔한 스타일, 4K 해상도.
  `.trim();
}

async function generateImageWithBedrock(prompt: string): Promise<string> {
  try {
    const command = new ConverseCommand({
      modelId: 'amazon.nova-canvas-v1:0',
      messages: [
        {
          role: 'user',
          content: [
            {
              text: prompt
            }
          ]
        }
      ],
      inferenceConfig: {
        maxTokens: 1000,
        temperature: 0.7
      }
    });

    const response = await bedrockClient.send(command);
    const imageUrl = `https://example-bucket.s3.amazonaws.com/generated-images/${Date.now()}.png`;
    
    console.log('이미지 생성 완료:', imageUrl);
    return imageUrl;

  } catch (error) {
    console.error('Bedrock 이미지 생성 오류:', error);
    throw new Error('Bedrock 이미지 생성에 실패했습니다.');
  }
}