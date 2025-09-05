import { TestAnswer } from '../types';
import cbtiData from '../data/cbti.json';

/**
 * 테스트 답변을 기반으로 CBTI 유형을 계산하는 함수
 * @param answers 사용자의 테스트 답변 배열
 * @returns 계산된 CBTI 유형 문자열
 */
export const calculateCBTIType = (answers: TestAnswer[]): string => {
  // 각 trait별 점수 집계
  const traitCounts: Record<string, number> = {};
  
  answers.forEach(answer => {
    traitCounts[answer.selectedTrait] = (traitCounts[answer.selectedTrait] || 0) + 1;
  });

  // 각 차원별로 우세한 trait 결정
  const dimensions = [
    ['A', 'B'], // 기술 중심 vs 비즈니스 중심
    ['S', 'N'], // 현실적 vs 직관적
    ['E', 'I'], // 외향적 vs 내향적
    ['O', 'P']  // 체계적 vs 유연한
  ];

  let resultType = '';
  
  dimensions.forEach(([trait1, trait2]) => {
    const count1 = traitCounts[trait1] || 0;
    const count2 = traitCounts[trait2] || 0;
    
    // 더 많이 선택된 trait을 결과에 추가
    resultType += count1 >= count2 ? trait1 : trait2;
  });

  // 계산된 유형이 존재하는지 확인
  if (cbtiData.CBTI_TYPES[resultType as keyof typeof cbtiData.CBTI_TYPES]) {
    return resultType;
  }

  // 기본값 반환 (예외 상황)
  return 'ASEO';
};