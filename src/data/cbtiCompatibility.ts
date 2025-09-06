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
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '글로벌 탐험 정신과 사용자 보호 의식이 조화를 이룹니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '새로운 기술 탐험과 보안 원칙이 균형을 이룹니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '빠른 탐험을 선호하는 성향과 체계적 설계를 중시하는 접근이 상충됩니다.'
      }
    ]
  },

  'ASEV': {
    bestMatches: [
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '혁신적 애플리케이션과 사용자 경험 최적화가 잘 맞습니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '비전형 성향과 탐험 정신이 시너지를 만듭니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '빠른 혁신과 엄격한 보안 통제가 충돌할 수 있습니다.'
      },
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '실험적 접근과 체계적 설계 철학이 다릅니다.'
      }
    ]
  },

  'ISEO': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '안정적 인프라와 체계적 설계가 완벽하게 조화됩니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '운영 안정성과 보안 원칙이 서로 보완됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정성 중시와 빠른 실험이 상충됩니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '체계적 운영과 유연한 엣지 관리가 다릅니다.'
      }
    ]
  },

  'ICRV': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '보안 원칙과 체계적 설계가 완벽하게 일치합니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '보안 중심 사고와 사용자 보호 의식이 조화됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '엄격한 보안과 빠른 혁신이 근본적으로 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '보안 통제와 자유로운 탐험이 상충됩니다.'
      }
    ]
  },

  'ASRO': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '안정적 모니터링과 체계적 설계가 서로 보완됩니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '운영 안정성과 보안 모니터링이 잘 맞습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '안정적 모니터링과 탐험적 접근이 상충됩니다.'
      },
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적 운영과 빠른 실험이 충돌합니다.'
      }
    ]
  },

  'ICEV': {
    bestMatches: [
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '인프라 자동화와 엣지 최적화가 시너지를 만듭니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '코드 중심 사고와 탐험 정신이 혁신을 만듭니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '실험적 코딩과 체계적 설계가 충돌할 수 있습니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '창의적 자동화와 엄격한 보안이 상충됩니다.'
      }
    ]
  },

  'ICEO': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '효율성 추구와 체계적 설계가 완벽하게 조화됩니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '비용 최적화와 사용자 경험이 균형을 이룹니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '효율성 중시와 빠른 실험이 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '비용 최적화와 탐험적 접근이 상충됩니다.'
      }
    ]
  },

  'ICRO': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '체계적 거버넌스와 보안 원칙이 완벽하게 일치합니다.'
      },
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '규정 준수와 체계적 설계가 서로 보완됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적 관리와 빠른 혁신이 근본적으로 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '규칙 중심과 자유로운 탐험이 상충됩니다.'
      }
    ]
  },

  'ASEO': {
    bestMatches: [
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '안정적 서비스와 사용자 경험이 조화를 이룹니다.'
      },
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '플랫폼 운영과 체계적 설계가 잘 맞습니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '편의성 중시와 엄격한 보안이 충돌할 수 있습니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '안정적 운영과 탐험적 접근이 다릅니다.'
      }
    ]
  },

  'ASRV': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '체계적 설계와 보안 원칙이 완벽하게 조화됩니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '아키텍처 비전과 사용자 경험이 시너지를 만듭니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적 설계와 빠른 실험이 근본적으로 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '장기적 계획과 즉흥적 탐험이 상충됩니다.'
      }
    ]
  },

  'ACEV': {
    bestMatches: [
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '풀스택 개발과 탐험 정신이 혁신을 만듭니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '유연한 개발과 사용자 중심 사고가 조화됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '실험적 개발과 엄격한 보안이 충돌합니다.'
      },
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '유연한 접근과 체계적 설계가 상충됩니다.'
      }
    ]
  },

  'ACEO': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '효율적 배포와 체계적 설계가 완벽하게 조화됩니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '배포 최적화와 사용자 경험이 시너지를 만듭니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '체계적 배포와 빠른 실험이 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '규율적 접근과 자유로운 탐험이 상충됩니다.'
      }
    ]
  },

  'ACRV': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '애플리케이션 보안과 인프라 보안이 완벽하게 일치합니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '보안 개발과 사용자 보호가 조화를 이룹니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '보안 원칙과 빠른 혁신이 근본적으로 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '엄격한 보안과 자유로운 탐험이 상충됩니다.'
      }
    ]
  },

  'ACRO': {
    bestMatches: [
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '사용자 보호와 보안 원칙이 완벽하게 조화됩니다.'
      },
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '엣지 최적화와 체계적 설계가 시너지를 만듭니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정적 보호와 빠른 실험이 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '체계적 관리와 자유로운 탐험이 상충됩니다.'
      }
    ]
  },

  'ISRV': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '글로벌 비전과 체계적 설계가 완벽하게 일치합니다.'
      },
      {
        type: 'ACRO',
        name: '엣지 수호자',
        reason: '미래 설계와 사용자 경험이 조화를 이룹니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '장기적 계획과 빠른 실험이 상충됩니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '체계적 전략과 즉흥적 탐험이 충돌합니다.'
      }
    ]
  },

  'ISRO': {
    bestMatches: [
      {
        type: 'ASRV',
        name: '아키텍처 디자이너',
        reason: '안정적 관리와 체계적 설계가 완벽하게 조화됩니다.'
      },
      {
        type: 'ICRV',
        name: '보안 수호자',
        reason: '백업 관리와 보안 원칙이 서로 보완됩니다.'
      }
    ],
    worstMatches: [
      {
        type: 'ASEV',
        name: '앱 혁신가',
        reason: '안정성 중시와 빠른 혁신이 근본적으로 충돌합니다.'
      },
      {
        type: 'ISEV',
        name: '클라우드 탐험가',
        reason: '체계적 백업과 자유로운 탐험이 상충됩니다.'
      }
    ]
  }
};