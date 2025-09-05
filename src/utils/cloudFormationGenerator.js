/**
 * CloudFormation YAML 템플릿 생성
 */
export const generateCloudFormationTemplate = (architecture, cbtiType) => {
  const { services } = architecture;
  
  let template = `AWSTemplateFormatVersion: '2010-09-09'
Description: 'CBTI ${cbtiType} 아키텍처 - 프리티어 최적화'

Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues: [dev, prod]

Resources:
`;

  // 서비스별 CloudFormation 리소스 생성
  services.forEach(service => {
    template += generateServiceResource(service, cbtiType);
  });

  // Outputs 섹션 추가
  template += generateOutputs(services, cbtiType);

  return template;
};

/**
 * 서비스별 CloudFormation 리소스 생성
 */
const generateServiceResource = (service, cbtiType) => {
  switch (service) {
    case 'Lambda':
      return `
  # Lambda 함수 (프리티어: 1M 요청/월)
  ${cbtiType}LambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Sub '${cbtiType.toLowerCase()}-function-\${Environment}'
      Runtime: nodejs20.x
      Handler: index.handler
      MemorySize: 128
      Timeout: 30
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            return {
              statusCode: 200,
              body: JSON.stringify({ message: 'Hello from ${cbtiType}!' })
            };
          };
      Role: !GetAtt ${cbtiType}LambdaRole.Arn

  ${cbtiType}LambdaRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
`;

    case 'S3':
      return `
  # S3 버킷 (프리티어: 5GB 표준 스토리지)
  ${cbtiType}S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${cbtiType.toLowerCase()}-bucket-\${AWS::AccountId}-\${Environment}'
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      VersioningConfiguration:
        Status: Suspended
`;

    default:
      return '';
  }
};

/**
 * CloudFormation Outputs 생성
 */
const generateOutputs = (services, cbtiType) => {
  let outputs = `
Outputs:
`;

  services.forEach(service => {
    switch (service) {
      case 'S3':
        outputs += `
  S3BucketName:
    Description: 'S3 Bucket Name'
    Value: !Ref ${cbtiType}S3Bucket
    Export:
      Name: !Sub '\${AWS::StackName}-S3Bucket'
`;
        break;
    }
  });

  return outputs;
};