import { ArchitectureConfig } from './architectureGenerator';

/**
 * AWS CDK TypeScript 코드 생성
 */
export const generateCDKCode = (architecture: ArchitectureConfig, cbtiType: string): string => {
  const { services } = architecture;
  
  let imports = `import * as cdk from 'aws-cdk-lib';\nimport { Construct } from 'constructs';\n`;
  let resources = '';
  
  // 서비스별 CDK 코드 생성
  services.forEach(service => {
    switch (service) {
      case 'Lambda':
        imports += `import * as lambda from 'aws-cdk-lib/aws-lambda';\n`;
        resources += `
    // Lambda 함수 (프리티어: 1M 요청/월)
    const lambdaFn = new lambda.Function(this, '${cbtiType}Lambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async () => ({ statusCode: 200, body: "Hello" });'),
      memorySize: 128, // 프리티어 최적화
      timeout: cdk.Duration.seconds(30)
    });`;
        break;
        
      case 'API Gateway':
        imports += `import * as apigateway from 'aws-cdk-lib/aws-apigateway';\n`;
        resources += `
    // API Gateway (프리티어: 1M 요청/월)
    const api = new apigateway.RestApi(this, '${cbtiType}Api', {
      restApiName: '${cbtiType} Service',
      description: 'CBTI ${cbtiType} API'
    });`;
        break;
        
      case 'DynamoDB':
        imports += `import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';\n`;
        resources += `
    // DynamoDB (프리티어: 25GB + 25 WCU/RCU)
    const table = new dynamodb.Table(this, '${cbtiType}Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5, // 프리티어 범위
      writeCapacity: 5
    });`;
        break;
        
      case 'S3':
        imports += `import * as s3 from 'aws-cdk-lib/aws-s3';\n`;
        resources += `
    // S3 버킷 (프리티어: 5GB 표준 스토리지)
    const bucket = new s3.Bucket(this, '${cbtiType}Bucket', {
      bucketName: '${cbtiType.toLowerCase()}-bucket-\${cdk.Aws.ACCOUNT_ID}',
      versioned: false, // 프리티어 최적화
      publicReadAccess: false
    });`;
        break;
        
      case 'EC2':
        imports += `import * as ec2 from 'aws-cdk-lib/aws-ec2';\n`;
        resources += `
    // VPC
    const vpc = new ec2.Vpc(this, '${cbtiType}Vpc', {
      maxAzs: 2,
      natGateways: 0 // 프리티어: NAT Gateway 비용 절약
    });
    
    // EC2 인스턴스 (프리티어: t4g.micro 750시간/월)
    const instance = new ec2.Instance(this, '${cbtiType}Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023()
    });`;
        break;
        
      case 'RDS':
        imports += `import * as rds from 'aws-cdk-lib/aws-rds';\n`;
        resources += `
    // RDS 인스턴스 (프리티어: db.t4g.micro 750시간/월)
    const database = new rds.DatabaseInstance(this, '${cbtiType}Database', {
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      vpc,
      allocatedStorage: 20, // 프리티어 최대
      storageType: rds.StorageType.GP2,
      deleteAutomatedBackups: true
    });`;
        break;
    }
  });

  return `${imports}
export class ${cbtiType}Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    ${resources}
  }
}`;
};

/**
 * Terraform 코드 생성
 */
export const generateTerraformCode = (architecture: ArchitectureConfig, cbtiType: string): string => {
  const { services } = architecture;
  
  let terraform = `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}
`;

  services.forEach(service => {
    switch (service) {
      case 'Lambda':
        terraform += `
# Lambda 함수 (프리티어: 1M 요청/월)
resource "aws_lambda_function" "${cbtiType.toLowerCase()}_lambda" {
  filename         = "lambda.zip"
  function_name    = "${cbtiType}-function"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs20.x"
  memory_size     = 128
  timeout         = 30
}

resource "aws_iam_role" "lambda_role" {
  name = "${cbtiType}-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}`;
        break;
        
      case 'DynamoDB':
        terraform += `
# DynamoDB 테이블 (프리티어: 25GB + 25 WCU/RCU)
resource "aws_dynamodb_table" "${cbtiType.toLowerCase()}_table" {
  name           = "${cbtiType}-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}`;
        break;
        
      case 'S3':
        terraform += `
# S3 버킷 (프리티어: 5GB 표준 스토리지)
resource "aws_s3_bucket" "${cbtiType.toLowerCase()}_bucket" {
  bucket = "${cbtiType.toLowerCase()}-bucket-\${random_id.bucket_suffix.hex}"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}`;
        break;
    }
  });

  return terraform;
};