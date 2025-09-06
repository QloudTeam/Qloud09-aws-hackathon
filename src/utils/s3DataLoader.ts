// S3에서 데이터를 로드하는 유틸리티
const S3_BUCKET_URL = 'https://cbti-data-bucket-1757106101.s3.amazonaws.com';

export const loadCBTIData = async () => {
  try {
    const response = await fetch(`${S3_BUCKET_URL}/data/cbti.json`);
    return await response.json();
  } catch (error) {
    console.error('CBTI 데이터 로드 실패:', error);
    // 로컬 fallback
    return import('../data/cbti.json');
  }
};

export const loadQuestionsData = async () => {
  try {
    const response = await fetch(`${S3_BUCKET_URL}/data/questions.json`);
    return await response.json();
  } catch (error) {
    console.error('질문 데이터 로드 실패:', error);
    // 로컬 fallback
    return import('../data/questions.json');
  }
};

export const getCloudFormationTemplateUrl = (cbtiType: string) => {
  const fileMapping: { [key: string]: string } = {
    'ASEO': 'ASEO-platform-service.yaml',
    'ASEV': 'ASEV-serverless-api.yaml', 
    'ASRO': 'ASRO-monitoring-system.yaml',
    'ASRV': 'ASRV-architecture-designer.yaml',
    'ACEO': 'ACEO-delivery-engineer.yaml',
    'ACEV': 'ACEV-fullstack-pioneer.yaml',
    'ACRO': 'ACRO-edge-guardian.yaml', 
    'ACRV': 'ACRV-security-developer.yaml',
    'ISEO': 'ISEO-enterprise-webapp.yaml',
    'ISEV': 'ISEV-global-web-service.yaml',
    'ISRO': 'ISRO-backup-monitoring.yaml',
    'ISRV': 'ISRV-global-cdn.yaml',
    'ICEO': 'ICEO-auto-scaling.yaml',
    'ICEV': 'ICEV-iac-infrastructure.yaml',
    'ICRO': 'ICRO-governance-infrastructure.yaml',
    'ICRV': 'ICRV-security-website.yaml'
  };
  
  const fileName = fileMapping[cbtiType] || `${cbtiType}-architecture.yaml`;
  return `${S3_BUCKET_URL}/cloudformation-templates/${fileName}`;
};

export const getArchitectureImageUrl = (cbtiType: string) => {
  return `${S3_BUCKET_URL}/images/${cbtiType}-architecture.png`;
};