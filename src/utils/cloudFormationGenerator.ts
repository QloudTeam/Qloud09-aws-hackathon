import { ArchitectureConfig } from './architectureGenerator';

/**
 * CloudFormation YAML 템플릿 생성
 */
export const generateCloudFormationTemplate = (
  architecture: ArchitectureConfig, 
  cbtiType: string
): string => {
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
const generateServiceResource = (service: string, cbtiType: string): string => {
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

    case 'API Gateway':
      return `
  # API Gateway (프리티어: 1M 요청/월)
  ${cbtiType}ApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: !Sub '${cbtiType.toLowerCase()}-api-\${Environment}'
      Description: 'CBTI ${cbtiType} API'

  ${cbtiType}ApiResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ${cbtiType}ApiGateway
      ParentId: !GetAtt ${cbtiType}ApiGateway.RootResourceId
      PathPart: ${cbtiType.toLowerCase()}

  ${cbtiType}ApiMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref ${cbtiType}ApiGateway
      ResourceId: !Ref ${cbtiType}ApiResource
      HttpMethod: GET
      AuthorizationType: NONE
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub 'arn:aws:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${${cbtiType}LambdaFunction.Arn}/invocations'

  ${cbtiType}ApiDeployment:
    Type: AWS::ApiGateway::Deployment
    DependsOn: ${cbtiType}ApiMethod
    Properties:
      RestApiId: !Ref ${cbtiType}ApiGateway
      StageName: !Ref Environment
`;

    case 'DynamoDB':
      return `
  # DynamoDB 테이블 (프리티어: 25GB + 25 WCU/RCU)
  ${cbtiType}DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub '${cbtiType.toLowerCase()}-table-\${Environment}'
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
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

    case 'EC2':
      return `
  # VPC
  ${cbtiType}VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '${cbtiType}-vpc-\${Environment}'

  # 퍼블릭 서브넷
  ${cbtiType}PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref ${cbtiType}VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true

  # 인터넷 게이트웨이
  ${cbtiType}InternetGateway:
    Type: AWS::EC2::InternetGateway

  ${cbtiType}AttachGateway:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref ${cbtiType}VPC
      InternetGatewayId: !Ref ${cbtiType}InternetGateway

  # EC2 인스턴스 (프리티어: t4g.micro 750시간/월)
  ${cbtiType}EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t4g.micro
      ImageId: ami-0c02fb55956c7d316  # Amazon Linux 2023
      SubnetId: !Ref ${cbtiType}PublicSubnet
      SecurityGroupIds:
        - !Ref ${cbtiType}SecurityGroup
      Tags:
        - Key: Name
          Value: !Sub '${cbtiType}-instance-\${Environment}'

  ${cbtiType}SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for ${cbtiType} instance
      VpcId: !Ref ${cbtiType}VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
`;

    case 'RDS':
      return `
  # RDS 서브넷 그룹
  ${cbtiType}DBSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnet group for ${cbtiType} RDS
      SubnetIds:
        - !Ref ${cbtiType}PublicSubnet
        - !Ref ${cbtiType}PrivateSubnet

  ${cbtiType}PrivateSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref ${cbtiType}VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']

  # RDS 인스턴스 (프리티어: db.t4g.micro 750시간/월)
  ${cbtiType}RDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: !Sub '${cbtiType.toLowerCase()}-db-\${Environment}'
      DBInstanceClass: db.t4g.micro
      Engine: mysql
      EngineVersion: '8.0'
      AllocatedStorage: 20
      StorageType: gp2
      MasterUsername: admin
      MasterUserPassword: !Sub '{{resolve:secretsmanager:${cbtiType}DBPassword:SecretString:password}}'
      DBSubnetGroupName: !Ref ${cbtiType}DBSubnetGroup
      VPCSecurityGroups:
        - !Ref ${cbtiType}DBSecurityGroup
      BackupRetentionPeriod: 0  # 프리티어 최적화
      DeleteAutomatedBackups: true

  ${cbtiType}DBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for ${cbtiType} RDS
      VpcId: !Ref ${cbtiType}VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 3306
          ToPort: 3306
          SourceSecurityGroupId: !Ref ${cbtiType}SecurityGroup

  ${cbtiType}DBPassword:
    Type: AWS::SecretsManager::Secret
    Properties:
      Description: Password for ${cbtiType} RDS instance
      GenerateSecretString:
        SecretStringTemplate: '{"username": "admin"}'
        GenerateStringKey: 'password'
        PasswordLength: 16
        ExcludeCharacters: '"@/\\'
`;

    default:
      return '';
  }
};

/**
 * CloudFormation Outputs 생성
 */
const generateOutputs = (services: string[], cbtiType: string): string => {
  let outputs = `
Outputs:
`;

  services.forEach(service => {
    switch (service) {
      case 'API Gateway':
        outputs += `
  ApiGatewayUrl:
    Description: 'API Gateway URL'
    Value: !Sub 'https://\${${cbtiType}ApiGateway}.execute-api.\${AWS::Region}.amazonaws.com/\${Environment}'
    Export:
      Name: !Sub '\${AWS::StackName}-ApiUrl'
`;
        break;
      case 'S3':
        outputs += `
  S3BucketName:
    Description: 'S3 Bucket Name'
    Value: !Ref ${cbtiType}S3Bucket
    Export:
      Name: !Sub '\${AWS::StackName}-S3Bucket'
`;
        break;
      case 'EC2':
        outputs += `
  EC2InstanceId:
    Description: 'EC2 Instance ID'
    Value: !Ref ${cbtiType}EC2Instance
    Export:
      Name: !Sub '\${AWS::StackName}-EC2Instance'
`;
        break;
    }
  });

  return outputs;
};