/**
 * DynamoDB 서비스 유틸리티
 */

export interface CBTIUser {
  nickname: string;
  cbtiType: string;
  createdAt: string;
}

export interface CBTIMatchResult {
  bestMatches: CBTIUser[];
  worstMatches: CBTIUser[];
}

/**
 * CBTI 결과를 DynamoDB에 저장
 */
export const saveCBTIResult = async (nickname: string, cbtiType: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/cbti-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        cbtiType,
        createdAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`CBTI 결과 저장 실패: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('CBTI 결과 저장 오류:', error);
    return false;
  }
};

/**
 * 호환되는 CBTI 유형의 사용자들을 조회
 */
export const getCompatibleUsers = async (
  bestMatchTypes: string[], 
  worstMatchTypes: string[]
): Promise<CBTIMatchResult> => {
  try {
    const response = await fetch('/api/cbti-matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bestMatchTypes,
        worstMatchTypes
      }),
    });

    if (!response.ok) {
      throw new Error(`호환 사용자 조회 실패: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      bestMatches: result.bestMatches || [],
      worstMatches: result.worstMatches || []
    };
  } catch (error) {
    console.error('호환 사용자 조회 오류:', error);
    return {
      bestMatches: [],
      worstMatches: []
    };
  }
};