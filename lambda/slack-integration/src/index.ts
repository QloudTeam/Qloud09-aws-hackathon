import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { WebClient } from '@slack/web-api';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const s3Client = new S3Client({ region: process.env.AWS_REGION });

interface SlackDMRequest {
  userEmail: string;
  message: string;
  attachments: Array<{
    type: 'image' | 'file';
    url?: string;
    content?: string;
    filename?: string;
    title: string;
  }>;
}

/**
 * 슬랙 DM 전송 Lambda 함수
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('슬랙 DM 전송 요청:', JSON.stringify(event, null, 2));

  try {
    const body: SlackDMRequest = JSON.parse(event.body || '{}');
    const { userEmail, message, attachments } = body;

    // 1. 이메일로 슬랙 사용자 ID 찾기
    const userId = await findUserByEmail(userEmail);
    if (!userId) {
      return createResponse(404, { error: '슬랙 워크스페이스에서 사용자를 찾을 수 없습니다.' });
    }

    // 2. 첨부파일 처리
    const processedAttachments = await processAttachments(attachments);

    // 3. DM 채널 열기
    const dmChannel = await slack.conversations.open({
      users: userId
    });

    // 4. 메시지 전송
    await slack.chat.postMessage({
      channel: dmChannel.channel?.id!,
      text: message,
      blocks: createMessageBlocks(message, processedAttachments)
    });

    // 5. 첨부파일 업로드
    for (const attachment of processedAttachments) {
      if (attachment.type === 'file') {
        await slack.files.upload({
          channels: dmChannel.channel?.id!,
          content: attachment.content,
          filename: attachment.filename,
          title: attachment.title
        });
      }
    }

    return createResponse(200, { success: true, message: 'DM 전송 완료' });

  } catch (error) {
    console.error('슬랙 DM 전송 오류:', error);
    return createResponse(500, { error: 'DM 전송 중 오류가 발생했습니다.' });
  }
};

/**
 * 이메일로 슬랙 사용자 찾기
 */
async function findUserByEmail(email: string): Promise<string | null> {
  try {
    const result = await slack.users.lookupByEmail({ email });
    return result.user?.id || null;
  } catch (error) {
    console.error('사용자 검색 오류:', error);
    return null;
  }
}

/**
 * 첨부파일 처리
 */
async function processAttachments(attachments: SlackDMRequest['attachments']) {
  const processed = [];
  
  for (const attachment of attachments) {
    if (attachment.type === 'file' && attachment.content) {
      // S3에 파일 업로드
      const key = `slack-attachments/${Date.now()}-${attachment.filename}`;
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.ATTACHMENTS_BUCKET!,
        Key: key,
        Body: attachment.content,
        ContentType: 'text/plain'
      }));

      processed.push({
        ...attachment,
        s3Key: key
      });
    } else {
      processed.push(attachment);
    }
  }
  
  return processed;
}

/**
 * 슬랙 메시지 블록 생성
 */
function createMessageBlocks(message: string, attachments: any[]) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: message
      }
    }
  ];

  // 이미지 첨부파일 추가
  const imageAttachment = attachments.find(a => a.type === 'image');
  if (imageAttachment) {
    blocks.push({
      type: 'image',
      image_url: imageAttachment.url,
      alt_text: imageAttachment.title
    });
  }

  return blocks;
}

/**
 * API 응답 생성
 */
function createResponse(statusCode: number, body: any): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify(body)
  };
}