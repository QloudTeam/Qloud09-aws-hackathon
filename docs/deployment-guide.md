# CBTI 웹 서비스 배포 가이드

## 🚀 배포 명령어

### 개발 환경 배포
```bash
# 전체 배포 (권장)
./deploy.sh dev

# 단계별 배포
npm install && npm run build
cd lambda/bedrock-image && npm install && npm run build && cd ../..
cd lambda/cbti-api && npm install && npm run build && cd ../..
cd infrastructure && sam build && sam deploy --stack-name cbti-stack-dev --parameter-overrides Environment=dev --capabilities CAPABILITY_IAM --resolve-s3
```

### 프로덕션 환경 배포
```bash
./deploy.sh prod
```

## 📊 로그 및 메트릭 위치

### CloudWatch 로그 그룹
- **Bedrock 이미지 생성**: `/aws/lambda/cbti-bedrock-image-dev`
- **CBTI API**: `/aws/lambda/cbti-calculator-dev`
- **API Gateway**: `/aws/apigateway/cbti-api-dev`

### CloudWatch 메트릭
- **Lambda 함수 실행 시간**: `AWS/Lambda/Duration`
- **API Gateway 요청 수**: `AWS/ApiGateway/Count`
- **오류율**: `AWS/Lambda/Errors`

### 모니터링 대시보드
```bash
# CloudWatch 대시보드 URL 확인
aws cloudformation describe-stacks --stack-name cbti-stack-dev --query 'Stacks[0].Outputs'
```

## 🔧 트러블슈팅

### 일반적인 배포 오류
1. **SAM CLI 권한 오류**: AWS 자격 증명 확인
2. **Lambda 패키지 크기 초과**: node_modules 최적화 필요
3. **Bedrock 모델 접근 오류**: 리전별 모델 가용성 확인

### 성능 최적화
- Lambda 메모리: 512MB → 1024MB (응답 시간 개선)
- CloudFront 캐싱: 24시간 (정적 리소스)
- API Gateway 캐싱: 5분 (동적 콘텐츠)