/**
 * CBTI 유형별 호환성 분석 데이터
 */

export interface CompatibilityAnalysis {
  bestMatches: {
    type: string;
    name: string;
    reason: string;
  }[];
  worstMatches: {
    type: string;
    name: string;
    reason: string;
  }[];
}

export const cbtiCompatibility: Record<string, CompatibilityAnalysis> = {
  'ISEV': {
    bestMatches: [
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '인프라와 애플리케이션을 모두 이해하며, 탐험적 성향과 개척 정신이 잘 맞습니다.'
      },
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '비전형 성향과 혁신적 사고방식이 유사하여 함께 새로운 아이디어를 실현할 수 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRO',
        name: '거버넌스 엔지니어',
        reason: '탐험적이고 유연한 성향과 체계적이고 규칙 중심적인 접근 방식이 상충될 수 있습니다.'
      },
      {
        type: 'ASRO',
        name: '데이터 오퍼레이터',
        reason: '새로운 시도를 선호하는 성향과 안정적인 운영을 중시하는 관점에서 차이가 있습니다.'
      }
    ]
  },

  'ASEV': {
    bestMatches: [
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '혁신적이고 비전 지향적인 성향이 유사하여 함께 새로운 기술을 탐구할 수 있습니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '애플리케이션 중심의 사고와 유연한 개발 방식이 서로 보완됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRO',
        name: '거버넌스 엔지니어',
        reason: '빠른 실험과 혁신을 추구하는 성향과 체계적인 관리를 중시하는 접근이 충돌할 수 있습니다.'
      },
      {
        type: 'ISRO',
        name: '철통 관리자',
        reason: '서버리스와 혁신을 선호하는 성향과 안정성과 백업을 중시하는 관점이 다릅니다.'
      }
    ]
  },

  'ISEO': {
    bestMatches: [
      {
        type: 'ASEO',
        name: '앱 오퍼레이터',
        reason: '안정적인 운영과 서비스 지향적 접근 방식이 유사하여 협업이 원활합니다.'
      },
      {
        type: 'ISRO',
        name: '철통 관리자',
        reason: '인프라 중심의 안정성과 체계적인 관리 방식이 잘 맞습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정성을 중시하는 성향과 빠른 실험과 변화를 추구하는 접근이 상충됩니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '체계적인 운영을 선호하는 성향과 유연하고 실험적인 개발 방식이 다릅니다.'
      }
    ]
  },

  'ICRV': {
    bestMatches: [
      {
        type: 'ACRV',
        name: '보안 개발자',
        reason: '보안을 최우선으로 하는 공통된 가치관과 원칙 중심적 접근이 일치합니다.'
      },
      {
        type: 'ICRO',
        name: '거버넌스 엔지니어',
        reason: '체계적인 관리와 규정 준수를 중시하는 성향이 보안 관점과 잘 맞습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '보안과 안정성을 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 충돌합니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '엄격한 보안 통제를 선호하는 성향과 유연한 개발 방식이 상충될 수 있습니다.'
      }
    ]
  },

  'ASRO': {
    bestMatches: [
      {
        type: 'ISRO',
        name: '철통 관리자',
        reason: '안정적인 운영과 모니터링을 중시하는 공통된 관점을 가지고 있습니다.'
      },
      {
        type: 'ASEO',
        name: '앱 오퍼레이터',
        reason: '애플리케이션 운영과 서비스 안정성에 대한 유사한 접근 방식을 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '안정적인 모니터링을 중시하는 성향과 새로운 기술 탐험을 선호하는 접근이 다릅니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '체계적인 모니터링을 선호하는 성향과 유연하고 실험적인 개발이 상충할 수 있습니다.'
      }
    ]
  },

  'ICEV': {
    bestMatches: [
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '코드 중심적 사고와 창의적인 문제 해결 방식이 서로 보완됩니다.'
      },
      {
        type: 'ICEO',
        name: '효율 장인',
        reason: '인프라 자동화와 효율성 추구라는 공통된 목표를 가지고 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASRO',
        name: '데이터 오퍼레이터',
        reason: '자동화와 코드 중심 접근과 수동적인 모니터링 방식이 상충될 수 있습니다.'
      },
      {
        type: 'ISRO',
        name: '철통 관리자',
        reason: '창의적이고 실험적인 인프라 관리와 안정성 중심의 접근이 다릅니다.'
      }
    ]
  },

  'ICEO': {
    bestMatches: [
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '효율성과 자동화를 추구하는 공통된 목표와 기술적 접근이 일치합니다.'
      },
      {
        type: 'ACEO',
        name: '딜리버리 엔지니어',
        reason: '효율적인 배포와 운영 최적화에 대한 유사한 관심사를 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '비용 효율성을 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 충돌할 수 있습니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '효율성과 최적화를 중시하는 성향과 탐험적이고 실험적인 접근이 다릅니다.'
      }
    ]
  },

  'ICRO': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '체계적인 관리와 규정 준수를 중시하는 공통된 접근 방식을 가지고 있습니다.'
      },
      {
        type: 'ISRO',
        name: '철통 관리자',
        reason: '안정적이고 체계적인 인프라 관리에 대한 유사한 철학을 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적인 거버넌스를 중시하는 성향과 빠른 혁신과 실험을 추구하는 접근이 상충됩니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '규칙과 절차를 중시하는 성향과 유연하고 자유로운 개발 방식이 충돌할 수 있습니다.'
      }
    ]
  },

  'ASEO': {
    bestMatches: [
      {
        type: 'ISEO',
        name: '안정성 마스터',
        reason: '안정적인 서비스 운영과 사용자 경험 최적화에 대한 공통된 관심사를 가지고 있습니다.'
      },
      {
        type: 'ASRO',
        name: '데이터 오퍼레이터',
        reason: '애플리케이션 운영과 모니터링에 대한 유사한 접근 방식을 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '플랫폼 서비스를 선호하는 성향과 직접적인 인프라 제어를 추구하는 접근이 다릅니다.'
      },
      {
        type: 'ACRV',
        name: '보안 개발자',
        reason: '편의성을 중시하는 성향과 엄격한 보안 통제를 선호하는 접근이 상충할 수 있습니다.'
      }
    ]
  },

  'ASRV': {
    bestMatches: [
      {
        type: 'ISRV',
        name: '미래 설계자',
        reason: '아키텍처 설계와 장기적 비전에 대한 공통된 관심사와 접근 방식을 가지고 있습니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '체계적인 설계와 안정성을 중시하는 유사한 철학을 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적인 아키텍처 설계를 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 충돌합니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '조화로운 설계를 선호하는 성향과 유연하고 실험적인 개발 방식이 다릅니다.'
      }
    ]
  },

  'ACEV': {
    bestMatches: [
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '개척 정신과 새로운 기술에 대한 호기심이 서로 보완되어 혁신적인 솔루션을 만들 수 있습니다.'
      },
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '풀스택 개발과 인프라 자동화가 결합되어 완전한 솔루션을 구축할 수 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRO',
        name: '거버넌스 엔지니어',
        reason: '유연하고 실험적인 개발을 선호하는 성향과 체계적인 규칙과 절차를 중시하는 접근이 상충됩니다.'
      },
      {
        type: 'ASRO',
        name: '데이터 오퍼레이터',
        reason: '빠른 개발과 배포를 추구하는 성향과 안정적인 모니터링과 운영을 중시하는 접근이 다릅니다.'
      }
    ]
  },

  'ACEO': {
    bestMatches: [
      {
        type: 'ICEO',
        name: '효율 장인',
        reason: '배포 효율성과 운영 최적화에 대한 공통된 목표와 체계적인 접근을 공유합니다.'
      },
      {
        type: 'ASEO',
        name: '앱 오퍼레이터',
        reason: '애플리케이션 배포와 운영에 대한 유사한 관심사와 실용적 접근을 가지고 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '규율 있는 배포 프로세스를 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 충돌합니다.'
      },
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '체계적인 배포 관리를 선호하는 성향과 창의적이고 실험적인 인프라 접근이 다릅니다.'
      }
    ]
  },

  'ACRV': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '보안을 최우선으로 하는 공통된 가치관과 원칙 중심적 접근이 완벽하게 일치합니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '애플리케이션 보안과 사용자 보호에 대한 유사한 관심사와 접근을 공유합니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '보안과 원칙을 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 근본적으로 충돌합니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '엄격한 보안 원칙을 선호하는 성향과 유연하고 실험적인 개발 방식이 상충됩니다.'
      }
    ]
  },

  'ACRO': {
    bestMatches: [
      {
        type: 'ACRV',
        name: '보안 개발자',
        reason: '사용자 보안과 접근 제어에 대한 공통된 관심사와 보호 중심적 접근을 공유합니다.'
      },
      {
        type: 'ISRV',
        name: '미래 설계자',
        reason: '글로벌 서비스와 사용자 경험에 대한 유사한 비전과 체계적 접근을 가지고 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정적인 사용자 보호를 중시하는 성향과 빠른 실험과 변화를 추구하는 접근이 충돌합니다.'
      },
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '체계적인 접근 제어를 선호하는 성향과 창의적이고 실험적인 인프라 관리가 다릅니다.'
      }
    ]
  },

  'ISRV': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '장기적 비전과 체계적인 설계에 대한 공통된 철학과 접근 방식을 공유합니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '글로벌 서비스와 사용자 경험 최적화에 대한 유사한 관심사를 가지고 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '장기적이고 체계적인 계획을 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 상충됩니다.'
      },
      {
        type: 'ICEV',
        name: '코드 마법사',
        reason: '안정적인 글로벌 전략을 선호하는 성향과 창의적이고 실험적인 접근이 다릅니다.'
      }
    ]
  },

  'ISRO': {
    bestMatches: [
      {
        type: 'ICRO',
        name: '거버넌스 엔지니어',
        reason: '체계적인 관리와 안정성을 중시하는 공통된 접근 방식과 철학을 공유합니다.'
      },
      {
        type: 'ASRO',
        name: '데이터 오퍼레이터',
        reason: '안정적인 운영과 모니터링에 대한 유사한 관심사와 체계적 접근을 가지고 있습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정성과 백업을 중시하는 성향과 빠른 실험과 혁신을 추구하는 접근이 근본적으로 다릅니다.'
      },
      {
        type: 'ACEV',
        name: '풀스택 개척자',
        reason: '체계적인 백업과 관리를 선호하는 성향과 유연하고 실험적인 개발 방식이 충돌합니다.'
      }
    ]
  }
};