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
    ['infra_focused', 'app_focused'], // 인프라 중심 vs 앱 중심
    ['service_oriented', 'control_focused'], // 서비스 지향 vs 제어 중심
    ['elastic', 'reliable'], // 탄력적 vs 안정적
    ['visionary', 'operator']  // 비전형 vs 운영형
  ];

  let resultTraits: string[] = [];
  
  dimensions.forEach(([trait1, trait2]) => {
    const count1 = traitCounts[trait1] || 0;
    const count2 = traitCounts[trait2] || 0;
    
    // 더 많이 선택된 trait을 결과에 추가
    resultTraits.push(count1 >= count2 ? trait1 : trait2);
  });

  // traits 배열과 일치하는 CBTI 유형 찾기
  for (const [typeKey, typeData] of Object.entries(cbtiData.CBTI_TYPES)) {
    if (JSON.stringify(typeData.traits.sort()) === JSON.stringify(resultTraits.sort())) {
      return typeKey;
    }
  }

  // 기본값 반환 (예외 상황)
  return 'ISEV';
};