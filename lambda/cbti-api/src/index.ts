import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface TestAnswer {
  questionId: number;
  selectedTrait: string;
}

interface CalculateRequest {
  answers: TestAnswer[];
}

const CBTI_TYPES = {
  "ASEO": {
    "name": "클라우드 아키텍트",
    "character": "체계적인 설계자",
    "description": "복잡한 시스템을 체계적으로 설계하고 최적화하는 능력이 뛰어납니다",
    "symbol": "🏗️",
    "traits": ["A", "S", "E", "O"],
    "recommendedServices": ["EC2", "VPC", "CloudFormation", "Systems Manager"]
  },
  "ASIO": {
    "name": "보안 전문가",
    "character": "신중한 수호자",
    "description": "보안과 안정성을 최우선으로 하며 체계적인 접근을 선호합니다",
    "symbol": "🛡️",
    "traits": ["A", "S", "I", "O"],
    "recommendedServices": ["IAM", "KMS", "GuardDuty", "Security Hub"]
  }
};

/**
 * CBTI 유형을 계산하는 Lambda 함수
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('CBTI 계산 요청:', JSON.stringify(event, null, 2));

  try {
    const body: CalculateRequest = JSON.parse(event.body || '{}');
    const { answers } = body;

    if (!answers || answers.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: '테스트 답변이 필요합니다.'
        })
      };
    }

    const cbtiType = calculateCBTIType(answers);
    const cbtiData = CBTI_TYPES[cbtiType as keyof typeof CBTI_TYPES] || CBTI_TYPES.ASEO;

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
        type: cbtiType,
        data: cbtiData
      })
    };

  } catch (error) {
    console.error('CBTI 계산 오류:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'CBTI 계산 중 오류가 발생했습니다.'
      })
    };
  }
};

/**
 * 테스트 답변을 기반으로 CBTI 유형을 계산
 */
function calculateCBTIType(answers: TestAnswer[]): string {
  const traitCounts: Record<string, number> = {};
  
  answers.forEach(answer => {
    traitCounts[answer.selectedTrait] = (traitCounts[answer.selectedTrait] || 0) + 1;
  });

  const dimensions = [
    ['A', 'B'],
    ['S', 'N'],
    ['E', 'I'],
    ['O', 'P']
  ];

  let resultType = '';
  
  dimensions.forEach(([trait1, trait2]) => {
    const count1 = traitCounts[trait1] || 0;
    const count2 = traitCounts[trait2] || 0;
    resultType += count1 >= count2 ? trait1 : trait2;
  });

  return resultType;
}