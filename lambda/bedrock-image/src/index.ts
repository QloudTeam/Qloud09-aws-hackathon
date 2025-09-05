import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const bedrockClient = new BedrockRuntimeClient({ 
  region: process.env.AWS_REGION || 'us-east-1' 
});

interface ImageGenerationRequest {
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
    const {gender, ageGroup, character, symbol } = body;

    const prompt = generateImagePrompt(gender, ageGroup, character, symbol);
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
  gender: string, 
  ageGroup: string, 
  character: string, 
  symbol: string
): string {
  const cleanSymbol = symbol.replace('#', '');
  const cleanCharacter = character.replace('#', '');
  const genderEn = gender === 'male' ? 'man' : 'woman';
  const genderPronoun = gender === 'male' ? 'his' : 'her';
  
  return `Keywords (all must appear): ${ageGroup} | ${gender} | ${cleanSymbol} | ${cleanCharacter}
Rule: Do not create unless all four keywords are represented.

You need a high-quality 3D render of a ${genderEn} in ${genderPronoun} ${ageGroup} with a ${cleanCharacter} expression in a Pixar/DreamWorks style. The ${genderEn} must be holding a clear ${cleanSymbol} in ${genderPronoun} right hand, close to ${genderPronoun} face, and clearly visible. The ${cleanSymbol} takes up about 15-25% of the frame and is completely contained within the image. Clean and simple background, profile photo composition, soft shading and attractive color palette.
Main prop: ${cleanSymbol} (should be visible and unobtrusive).

Framing: square 1:1, eye level, medium close-up, centered composition, hands and props in the front frame, soft studio lighting.`;
}

async function generateImageWithBedrock(prompt: string): Promise<string> {
  try {
    const requestPayload = {
      taskType: 'TEXT_IMAGE',
      textToImageParams: {
        text: prompt,
        negativeText: 'blurry, low quality, distorted, ugly, bad anatomy, extra limbs'
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

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    const imageBase64 = responseBody.images[0];
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    
    console.log('이미지 생성 완료');
    return imageUrl;

  } catch (error) {
    console.error('Bedrock 이미지 생성 오류:', error);
    throw new Error('Bedrock 이미지 생성에 실패했습니다.');
  }
}