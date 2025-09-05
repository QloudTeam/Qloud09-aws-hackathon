import { UserInfo } from '../types';

/**
 * CBTI 유형 정보를 기반으로 Bedrock 이미지 생성 프롬프트를 생성
 */
export const generateImagePrompt = (
  userInfo: UserInfo,
  symbol: string,
  character: string
): string => {
  // 해시태그 제거하여 순수 키워드만 추출
  const cleanSymbol = symbol.replace('#', '');
  const cleanCharacter = character.replace('#', '');
  
  // 성별을 영어로 변환
  const genderEn = userInfo.gender === 'male' ? 'man' : 'woman';
  const genderPronoun = userInfo.gender === 'male' ? 'his' : 'her';
  
  return `Keywords (all must appear): ${userInfo.ageGroup} | ${userInfo.gender} | ${cleanSymbol} | ${cleanCharacter}
Rule: Do not create unless all four keywords are represented.

You need a high-quality 3D render of a ${genderEn} in ${genderPronoun} ${userInfo.ageGroup} with a ${cleanCharacter} expression in a Pixar/DreamWorks style. The ${genderEn} must be holding a clear ${cleanSymbol} in ${genderPronoun} right hand, close to ${genderPronoun} face, and clearly visible. The ${cleanSymbol} takes up about 15-25% of the frame and is completely contained within the image. Clean and simple background, profile photo composition, soft shading and attractive color palette.
Main prop: ${cleanSymbol} (should be visible and unobtrusive).

Framing: square 1:1, eye level, medium close-up, centered composition, hands and props in the front frame, soft studio lighting.`;
};

/**
 * Bedrock Nova Canvas를 사용하여 이미지 생성
 */
export const generateBedrockImage = async (
  userInfo: UserInfo,
  symbol: string,
  character: string
): Promise<string> => {
  try {
    const prompt = generateImagePrompt(userInfo, symbol, character);
    
    const response = await fetch('/api/bedrock/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        modelId: 'amazon.nova-canvas-v1:0',
        width: 1024,
        height: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`이미지 생성 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Bedrock 이미지 생성 오류:', error);
    // 개발 환경에서는 플레이스홀더 이미지 반환
    return `https://via.placeholder.com/1024x1024/667eea/ffffff?text=${symbol.replace('#', '')}`;
  }
};