# 슬랙 워크스페이스 연동 설정 가이드

## 🔧 필요한 슬랙 설정

### 1. **슬랙 앱 생성**

#### A. 슬랙 앱 생성
1. https://api.slack.com/apps 접속
2. "Create New App" → "From scratch" 선택
3. App Name: `CBTI Bot`
4. Workspace: `the-cbti` 선택

#### B. 봇 토큰 스코프 설정
**OAuth & Permissions** 메뉴에서 다음 스코프 추가:
```
Bot Token Scopes:
- users:read.email        # 이메일로 사용자 검색
- users:read             # 사용자 정보 읽기
- im:write               # DM 전송
- files:write            # 파일 업로드
- chat:write             # 메시지 전송
- conversations.open     # DM 채널 열기
```

#### C. 앱 설치
1. "Install to Workspace" 클릭
2. 권한 승인
3. **Bot User OAuth Token** 복사 (xoxb-로 시작)

### 2. **환경 변수 설정**

#### A. Lambda 환경 변수
```bash
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_WORKSPACE_ID=T1234567890
ATTACHMENTS_BUCKET=cbti-slack-attachments
AWS_REGION=us-east-1
```

#### B. 프론트엔드 환경 변수
```bash
# .env
VITE_SLACK_WORKSPACE_URL=https://the-cbti.slack.com
VITE_SLACK_INVITE_URL=https://join.slack.com/t/the-cbti/shared_invite/zt-3cspruxbq-RZK7pumghk6tiR8Cw~BwsA
VITE_API_URL=https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev
```

### 3. **AWS 리소스 설정**

#### A. S3 버킷 생성 (첨부파일용)
```bash
aws s3 mb s3://cbti-slack-attachments
```

#### B. Lambda 함수 배포
```bash
cd lambda/slack-integration
npm install
npm run build
npm run package
```

#### C. API Gateway 엔드포인트
- `/slack/send-dm` - DM 전송
- `/slack/check-membership` - 멤버십 확인

### 4. **슬랙 워크스페이스 설정**

#### A. 채널 생성
```
#general          # 일반 대화
#cbti-results     # 결과 공유 채널
#architecture     # 아키텍처 토론
#help            # 도움말 및 질문
```

#### B. 환영 메시지 설정
**Workflow Builder**에서 신규 멤버 환영 메시지:
```
🎉 CBTI 워크스페이스에 오신 것을 환영합니다!

여기서 할 수 있는 것들:
• CBTI 결과 및 아키텍처 자동 수신
• 다른 사용자들과 클라우드 아키텍처 토론
• AWS 프리티어 활용 팁 공유

곧 CBTI Bot이 개인 맞춤 결과를 DM으로 보내드릴 예정입니다! 🚀
```

## 🔄 전체 플로우

### 1. **사용자 액션**
```
CBTI 결과 페이지 → "슬랙으로 이동" 클릭 → 이메일 입력
```

### 2. **멤버십 확인**
```javascript
// 슬랙 API로 사용자 확인
const user = await slack.users.lookupByEmail({ email });
if (!user) {
  // 가입 링크로 리디렉트
  window.open(SLACK_INVITE_URL);
}
```

### 3. **자동 DM 전송**
```javascript
// DM 채널 열기
const dmChannel = await slack.conversations.open({ users: userId });

// 메시지 + 첨부파일 전송
await slack.chat.postMessage({
  channel: dmChannel.channel.id,
  text: cbtiMessage,
  blocks: messageBlocks
});

await slack.files.upload({
  channels: dmChannel.channel.id,
  content: cloudFormationYaml,
  filename: `${cbtiType}-infrastructure.yaml`
});
```

## 📋 전송되는 콘텐츠

### A. **DM 메시지 내용**
```
🎉 CBTI 검사 결과가 도착했습니다!

당신의 클라우드 유형: ASEV - 앱 혁신가

추천 아키텍처와 배포 코드를 확인해보세요:
• 아키텍처 다이어그램 (첨부 이미지)
• CloudFormation 템플릿 (첨부 파일)

프리티어 최적화된 설계로 무료로 시작할 수 있습니다!

배포 방법:
aws cloudformation create-stack \
  --stack-name asev-stack \
  --template-body file://ASEV-infrastructure.yaml \
  --capabilities CAPABILITY_IAM
```

### B. **첨부파일**
1. **아키텍처 다이어그램**: PNG 이미지
2. **CloudFormation 템플릿**: YAML 파일
3. **배포 가이드**: 텍스트 파일

## 🚀 배포 명령어

### 1. **슬랙 연동 Lambda 배포**
```bash
# SAM 템플릿에 추가
SlackIntegrationFunction:
  Type: AWS::Serverless::Function
  Properties:
    CodeUri: ../lambda/slack-integration/
    Handler: dist/index.handler
    Environment:
      Variables:
        SLACK_BOT_TOKEN: !Ref SlackBotToken
        ATTACHMENTS_BUCKET: !Ref AttachmentsBucket
```

### 2. **전체 시스템 배포**
```bash
./deploy.sh dev
```

### 3. **슬랙 봇 테스트**
```bash
# 테스트 DM 전송
curl -X POST https://your-api.execute-api.us-east-1.amazonaws.com/dev/slack/send-dm \
  -H "Content-Type: application/json" \
  -d '{
    "userEmail": "test@example.com",
    "message": "테스트 메시지",
    "attachments": []
  }'
```

## ⚠️ 주의사항

1. **봇 토큰 보안**: AWS Secrets Manager 사용 권장
2. **API 제한**: 슬랙 API 호출 제한 고려
3. **파일 크기**: 슬랙 파일 업로드 제한 (10MB)
4. **사용자 프라이버시**: 이메일 수집 시 동의 필요

이 설정을 통해 CBTI 결과와 함께 실제 배포 가능한 아키텍처를 슬랙으로 자동 전송할 수 있습니다!