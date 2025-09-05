interface CBTIResult {
  type: string;
  name: string;
  architectureImageUrl: string;
  iacCode: string;
  userInfo: {
    gender: string;
    ageGroup: string;
  };
}

/**
 * 슬랙 워크스페이스 가입 및 결과 전송 (로컬 테스트용)
 */
export const handleSlackIntegration = async (cbtiResult: CBTIResult) => {
  const SLACK_INVITE_URL = 'https://join.slack.com/t/the-cbti/shared_invite/zt-3cspruxbq-RZK7pumghk6tiR8Cw~BwsA';
  
  // 로컬 테스트: 결과 다운로드 및 슬랙 링크 열기
  downloadCBTIResults(cbtiResult);
  
  // 슬랙 가입 링크 열기
  window.open(SLACK_INVITE_URL, '_blank');
  
  // 성공 메시지 표시
  setTimeout(() => {
    alert(`🎉 로컬 테스트 모드\n\n실제 배포 시에는 다음이 슬랙 DM으로 전송됩니다:\n\n📋 CBTI 결과: ${cbtiResult.type} - ${cbtiResult.name}\n📊 아키텍처 다이어그램 (PNG)\n📄 CloudFormation 템플릿 (YAML)\n📖 배포 가이드 (Markdown)\n\n지금은 파일들이 자동 다운로드됩니다!`);
  }, 1000);
};

/**
 * CBTI 결과 파일들 다운로드
 */
const downloadCBTIResults = (cbtiResult: CBTIResult) => {
  // 1. CloudFormation 템플릿 다운로드
  downloadFile(cbtiResult.iacCode, `${cbtiResult.type}-infrastructure.yaml`, 'text/yaml');
  
  // 2. 배포 가이드 다운로드
  const deployGuide = createDeploymentGuide(cbtiResult);
  downloadFile(deployGuide, `${cbtiResult.type}-deployment-guide.md`, 'text/markdown');
  
  // 3. 아키텍처 다이어그램은 별도 다운로드 버튼으로 처리
};

/**
 * 배포 가이드 생성
 */
const createDeploymentGuide = (cbtiResult: CBTIResult): string => {
  return `# ${cbtiResult.type} - ${cbtiResult.name} 배포 가이드

## 🚀 AWS CloudFormation 배포

### 1. 사전 준비
\`\`\`bash
# AWS CLI 설정 확인
aws sts get-caller-identity
\`\`\`

### 2. 스택 배포
\`\`\`bash
# CloudFormation 스택 생성
aws cloudformation create-stack \\
  --stack-name ${cbtiResult.type.toLowerCase()}-stack \\
  --template-body file://${cbtiResult.type}-infrastructure.yaml \\
  --capabilities CAPABILITY_IAM
\`\`\`

### 3. 배포 확인
\`\`\`bash
# 스택 상태 확인
aws cloudformation describe-stacks --stack-name ${cbtiResult.type.toLowerCase()}-stack
\`\`\`

## 💰 프리티어 최적화
- 모든 리소스가 AWS 프리티어 범위 내에서 설정됨
- 예상 월 비용: $0 (프리티어 한도 내)

## 📞 지원
슬랙 워크스페이스: https://the-cbti.slack.com
`;
};

/**
 * 파일 다운로드 헬퍼
 */
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

