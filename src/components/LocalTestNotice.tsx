import React from 'react';

/**
 * 로컬 테스트 안내 컴포넌트
 */
const LocalTestNotice: React.FC = () => {
  return (
    <div className="local-test-notice">
      <div className="notice-header">
        <span className="notice-icon">🧪</span>
        <h4>로컬 테스트 모드</h4>
      </div>
      <div className="notice-content">
        <p><strong>현재 로컬 환경에서 실행 중입니다.</strong></p>
        <ul>
          <li>✅ CBTI 테스트 및 결과 확인</li>
          <li>✅ 아키텍처 다이어그램 생성</li>
          <li>✅ IaC 코드 다운로드</li>
          <li>⚠️ 슬랙 DM은 파일 다운로드로 시뮬레이션</li>
        </ul>
        <div className="deployment-info">
          <strong>실제 배포 시:</strong> 슬랙 워크스페이스에 자동 DM 전송
        </div>
      </div>
    </div>
  );
};

export default LocalTestNotice;