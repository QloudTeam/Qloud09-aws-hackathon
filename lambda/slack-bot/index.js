const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const ssmClient = new SSMClient({ region: process.env.REGION || 'us-east-1' });
const dynamoClient = new DynamoDBClient({ region: process.env.REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const CHANNEL_ID = 'C09DP7K4BRQ';

exports.handler = async (event) => {
  console.log('슬랙 봇 요청:', JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body || '{}');
    
    // URL Verification 처리
    if (body.type === 'url_verification') {
      return {
        statusCode: 200,
        body: body.challenge
      };
    }
    
    // 슬랙 이벤트 처리 (team_join, member_joined_channel 등)
    if (body.type === 'event_callback') {
      console.log('슬랙 이벤트 수신:', body.event?.type);
      return {
        statusCode: 200,
        body: 'OK'
      };
    }
    
    // CBTI 메시지 전송 요청 처리
    const { nickname, cbtiType } = body;

    if (!nickname || !cbtiType) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: '닉네임과 CBTI 유형이 필요합니다.'
        })
      };
    }

    // 슬랙 토큰 가져오기
    const slackToken = await getSlackToken();
    if (!slackToken) {
      throw new Error('슬랙 토큰을 가져올 수 없습니다.');
    }

    // 같은 CBTI 유형의 사용자들 가져오기
    const similarUsers = await getSimilarUsers(cbtiType);

    // 슬랙 메시지 전송
    await sendSlackMessage(slackToken, nickname, similarUsers);

    // 슬랙으로 리디렉션
    return {
      statusCode: 302,
      headers: {
        'Location': 'https://join.slack.com/t/the-cbti/shared_invite/zt-3cspruxbq-RZK7pumghk6tiR8Cw~BwsA',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('슬랙 봇 오류:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: '슬랙 메시지 전송 중 오류가 발생했습니다.'
      })
    };
  }
};

async function getSlackToken() {
  try {
    const command = new GetParameterCommand({
      Name: '/qloud/slack/bot-token',
      WithDecryption: true
    });
    
    const result = await ssmClient.send(command);
    return result.Parameter?.Value || null;
  } catch (error) {
    console.error('Parameter Store에서 토큰 가져오기 실패:', error);
    return null;
  }
}

async function getSimilarUsers(cbtiType) {
  try {
    // 더미 데이터
    const dummyUsers = {
      'ISEV': ['탐험가김씨', '모험가박씨', '개척자이씨', '탐사자정씨', '발견자최씨'],
      'ASEV': ['혁신가김씨', '창조자박씨', '아이디어이씨', '실험가정씨', '개발자최씨'],
      'ICRV': ['보안가김씨', '수호자박씨', '방어자이씨', '안전가정씨', '보호자최씨'],
      'ACEV': ['풀스택김씨', '연결자박씨', '통합자이씨', '개척자정씨', '구현자최씨'],
      'ASEO': ['운영자김씨', '관리자박씨', '유지자이씨', '안정자정씨', '서비스최씨']
    };

    // 실제 DynamoDB 조회 시도
    try {
      const command = new QueryCommand({
        TableName: 'cbti-users',
        IndexName: 'cbtiType-createdAt-index',
        KeyConditionExpression: 'cbtiType = :cbtiType',
        ExpressionAttributeValues: {
          ':cbtiType': cbtiType
        },
        ScanIndexForward: false,
        Limit: 5
      });

      const result = await docClient.send(command);
      const users = result.Items?.map(item => item.nickname).filter(Boolean) || [];
      
      if (users.length > 0) {
        return users.slice(0, 5);
      }
    } catch (dynamoError) {
      console.log('DynamoDB 조회 실패, 더미 데이터 사용:', dynamoError);
    }

    return dummyUsers[cbtiType] || dummyUsers['ASEV'];

  } catch (error) {
    console.error('유사 사용자 조회 오류:', error);
    return ['클라우드전문가1', '클라우드전문가2', '클라우드전문가3'];
  }
}

async function sendSlackMessage(token, nickname, similarUsers) {
  try {
    const userList = similarUsers.length > 0 
      ? similarUsers.slice(0, 5).map(user => `• ${user}`).join('\n')
      : '• 아직 같은 유형의 사용자가 없습니다.';

    const message = {
      channel: CHANNEL_ID,
      text: `안녕하세요 ${nickname} 님! :짠:\n` +
            `지금 만나요:\n${userList}\n` +
            `:전구: 질문이 있을 경우 @Amazon Q ask bot 를 통해 봇을 호출하세요!\n` +
            `예시: @Amazon Q ask bot S3 버킷 생성 방법을 알려주세요`
    };

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error('슬랙 메시지 전송 실패:', result.error);
      throw new Error(`슬랙 메시지 전송 실패: ${result.error}`);
    } else {
      console.log('슬랙 메시지 전송 성공');
    }
  } catch (error) {
    console.error('슬랙 API 호출 오류:', error);
    throw error;
  }
}