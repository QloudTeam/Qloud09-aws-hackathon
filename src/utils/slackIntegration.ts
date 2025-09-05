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
  await downloadCBTIResults(cbtiResult);
  
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
const downloadCBTIResults = async (cbtiResult: CBTIResult) => {
  try {
    // 1. CloudFormation 템플릿 다운로드 (실제 YAML 파일)
    const yamlContent = await fetchCloudFormationTemplate(cbtiResult.type);
    downloadFile(yamlContent, `${cbtiResult.type}-cloudformation.yaml`, 'text/yaml');
    
    // 2. 배포 가이드 다운로드
    const deployGuide = createDeploymentGuide(cbtiResult);
    downloadFile(deployGuide, `${cbtiResult.type}-deployment-guide.md`, 'text/markdown');
    
    // 3. 아키텍처 다이어그램은 별도 다운로드 버튼으로 처리
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
    alert('파일 다운로드 중 오류가 발생했습니다.');
  }
};

/**
 * CloudFormation 템플릿 파일 가져오기
 */
const fetchCloudFormationTemplate = async (cbtiType: string): Promise<string> => {
  // CBTI 유형에 맞는 CloudFormation 템플릿 파일명 매핑
  const templateMap: Record<string, string> = {
    'ISEV': 'ISEV-global-web-service.yaml',
    'ISEO': 'ISEO-enterprise-webapp.yaml', 
    'ISRV': 'ISRV-global-cdn.yaml',
    'ISRO': 'ISRO-backup-monitoring.yaml',
    'ICEV': 'ICEV-iac-infrastructure.yaml',
    'ICEO': 'ICEO-auto-scaling.yaml',
    'ICRV': 'ICRV-security-website.yaml',
    'ICRO': 'ICRO-governance-infrastructure.yaml',
    'ASEV': 'ASEV-serverless-api.yaml',
    'ASEO': 'ASEO-platform-service.yaml',
    'ASRV': 'ASRV-architecture-designer.yaml',
    'ASRO': 'ASRO-monitoring-system.yaml',
    'ACEV': 'ACEV-fullstack-pioneer.yaml',
    'ACEO': 'ACEO-delivery-engineer.yaml',
    'ACRV': 'ACRV-security-developer.yaml',
    'ACRO': 'ACRO-edge-guardian.yaml'
  };
  
  const templateFile = templateMap[cbtiType];
  if (!templateFile) {
    throw new Error(`${cbtiType}에 해당하는 CloudFormation 템플릿을 찾을 수 없습니다.`);
  }
  
  // GitHub raw URL 또는 로컬 파일에서 템플릿 가져오기
  const templateUrl = `/cloudformation-templates/${templateFile}`;
  
  try {
    const response = await fetch(templateUrl);
    if (!response.ok) {
      throw new Error(`템플릿 파일을 가져올 수 없습니다: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    // 로컬 개발 환경에서는 기본 템플릿 반환
    console.warn('템플릿 파일 로드 실패, 기본 템플릿 사용:', error);
    return getDefaultTemplate(cbtiType, templateFile);
  }
};

/**
 * 기본 CloudFormation 템플릿 생성 (로컬 개발용)
 */
const getDefaultTemplate = (cbtiType: string, templateFile: string): string => {
  return `AWSTemplateFormatVersion: '2010-09-09'
Description: '${cbtiType} - CBTI 맞춤 아키텍처'

# 실제 배포용 템플릿은 다음 파일을 사용하세요:
# ${templateFile}

Parameters:
  Environment:
    Type: String
    Default: dev
    Description: 배포 환경

Resources:
  # ${cbtiType} 아키텍처 리소스들
  # 실제 리소스는 ${templateFile}에서 확인하세요
  
  DummyResource:
    Type: AWS::CloudFormation::WaitConditionHandle
    
Outputs:
  Message:
    Description: 배포 메시지
    Value: !Sub '${cbtiType} 아키텍처가 성공적으로 배포되었습니다!'
    
# 실제 템플릿 위치: /cloudformation-templates/${templateFile}`;
};

/**
 * 배포 가이드 생성
 */
const createDeploymentGuide = (cbtiResult: CBTIResult): string => {
  // CBTI 유형별 특화 정보
  const typeInfo: Record<string, {keyPair: boolean, cost: string, description: string}> = {
    'ISEV': { keyPair: true, cost: '$50-100', description: '글로벌 웹 서비스 (Route53 + CloudFront + WAF + ALB + Multi-AZ EC2)' },
    'ASEV': { keyPair: false, cost: '$5-20', description: '서버리스 API 플랫폼 (API Gateway + Lambda + DynamoDB)' },
    'ICEO': { keyPair: true, cost: '$30-200', description: 'Auto Scaling 웹서비스 (ALB + ASG + CloudWatch)' },
    'ACRV': { keyPair: true, cost: '$40-100', description: '보안 중심 Auto Scaling 앱 (WAF + ASG + 보안 모니터링)' },
    'ACRO': { keyPair: false, cost: '$30-60', description: '엣지 보안 서비스 (Cognito + WAF + Route53)' }
  };
  
  const info = typeInfo[cbtiResult.type] || { keyPair: true, cost: '$20-50', description: 'AWS 클라우드 서비스' };
  
  const keyPairSection = info.keyPair ? `
### 0. EC2 키페어 생성 (필요시)
\`\`\`bash
# 키페어 생성
aws ec2 create-key-pair --key-name ${cbtiResult.type.toLowerCase()}-keypair --query 'KeyMaterial' --output text > ${cbtiResult.type.toLowerCase()}-keypair.pem
chmod 400 ${cbtiResult.type.toLowerCase()}-keypair.pem
\`\`\`
` : '';
  
  const deployCommand = info.keyPair ? 
    `aws cloudformation create-stack \\
  --stack-name ${cbtiResult.type.toLowerCase()}-stack \\
  --template-body file://${cbtiResult.type}-cloudformation.yaml \\
  --parameters ParameterKey=KeyPairName,ParameterValue=${cbtiResult.type.toLowerCase()}-keypair \\
  --capabilities CAPABILITY_NAMED_IAM` :
    `aws cloudformation create-stack \\
  --stack-name ${cbtiResult.type.toLowerCase()}-stack \\
  --template-body file://${cbtiResult.type}-cloudformation.yaml \\
  --capabilities CAPABILITY_NAMED_IAM`;

  return `# ${cbtiResult.type} - ${cbtiResult.name} 배포 가이드

## 📋 아키텍처 개요
${info.description}

## 🚀 AWS CloudFormation 배포

### 1. 사전 준비
\`\`\`bash
# AWS CLI 설정 확인
aws sts get-caller-identity

# 필요한 권한 확인
# - CloudFormation 전체 권한
# - EC2, VPC, IAM 생성 권한
# - 해당 템플릿의 모든 AWS 서비스 권한
\`\`\`
${keyPairSection}
### 2. 스택 배포
\`\`\`bash
# CloudFormation 스택 생성
${deployCommand}
\`\`\`

### 3. 배포 상태 확인
\`\`\`bash
# 스택 상태 확인
aws cloudformation describe-stacks --stack-name ${cbtiResult.type.toLowerCase()}-stack

# 리소스 목록 확인
aws cloudformation list-stack-resources --stack-name ${cbtiResult.type.toLowerCase()}-stack

# 출력값 확인
aws cloudformation describe-stacks --stack-name ${cbtiResult.type.toLowerCase()}-stack --query 'Stacks[0].Outputs'
\`\`\`

### 4. 배포 완료 후 접속
배포가 완료되면 CloudFormation Outputs에서 접속 URL을 확인할 수 있습니다.

## 💰 예상 비용
- **월 예상 비용**: ${info.cost}
- **프리티어 적용**: 대부분의 리소스가 프리티어 범위 내 설정
- **비용 모니터링**: CloudWatch 대시보드에서 실시간 확인 가능

## 🗑️ 리소스 정리
\`\`\`bash
# 스택 삭제 (모든 리소스 제거)
aws cloudformation delete-stack --stack-name ${cbtiResult.type.toLowerCase()}-stack

# 삭제 상태 확인
aws cloudformation describe-stacks --stack-name ${cbtiResult.type.toLowerCase()}-stack
\`\`\`

## ⚠️ 주의사항
1. **비용 관리**: 배포 후 불필요한 리소스는 즉시 삭제하세요
2. **보안**: 기본 보안 그룹 설정을 프로덕션 환경에 맞게 수정하세요
3. **백업**: 중요한 데이터는 별도 백업을 설정하세요
4. **모니터링**: CloudWatch 알람을 설정하여 비용과 성능을 모니터링하세요

## 📞 지원
- **슬랙 워크스페이스**: https://the-cbti.slack.com
- **GitHub 리포지토리**: https://github.com/your-repo/cbti-templates
- **AWS 공식 문서**: https://docs.aws.amazon.com/cloudformation/

---

**생성일**: ${new Date().toLocaleDateString('ko-KR')}
**CBTI 유형**: ${cbtiResult.type} - ${cbtiResult.name}
**사용자 정보**: ${cbtiResult.userInfo.gender}, ${cbtiResult.userInfo.ageGroup}
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

