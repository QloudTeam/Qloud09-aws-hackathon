import React from 'react';
import { useNavigate } from 'react-router-dom';


/**
* 메인 홈페이지 컴포넌트
*/
const HomePage: React.FC = () => {
 const navigate = useNavigate();


 const handleStartTest = () => {
   navigate('/test');
 };


 return (
   <div className="home-container">
     <div className="home-content">
       <div className="hero-section">
         <h1 className="main-title">CBTI</h1>
         <p className="subtitle">Cloud MBTI - 클라우드 성향 진단 ☁️</p>
         <button className="start-button" onClick={handleStartTest}>
           지금 시작하기
         </button>
       </div>
      
       <div className="info-sections">
         <div className="info-section">
           <h2>🤖 CBTI 소개</h2>
             <p>12문제 시나리오형 설문을 통해 클라우드 성향을 총 16가지 유형으로 분류합니다. </p>
             <p>CBTI 결과를 바탕으로 개인화된 프로필 이미지와 AWS 아키텍처 추천을 제공합니다.</p>
             <br></br>
             <p>AWS와 관련해 막히는 부분이 있다면, CBTI Slack 커뮤니티에 합류해 봇과 대화하고 다양한 유형의 회원들과 함께 해결하세요.</p>
         </div>
        
         <div className="info-section">
           <h2>📋 CBTI 성향 소개</h2>
           <div className="cbti-dimensions">
             <div className="dimension">
               <div className="dimension-header">
                 <div className="dimension-scale">
                   <div className="scale-item">
                     <span>I</span>
                     <span>Infra</span>
                   </div>
                   <div className="scale-arrow">↔</div>
                   <div className="scale-item">
                     <span>A</span>
                     <span>App</span>
                   </div>
                 </div>
               </div>
               <div className="dimension-desc">
               </div>
            
               <div className="dimension-header">
                 <div className="dimension-scale">
                   <div className="scale-item">
                     <span>S</span>
                     <span>Service</span>
                   </div>
                   <div className="scale-arrow">↔</div>
                   <div className="scale-item">
                     <span>C</span>
                     <span>Control</span>
                   </div>
                 </div>
               </div>
               <div className="dimension-desc">
               </div>
            
               <div className="dimension-header">
                 <div className="dimension-scale">
                   <div className="scale-item">
                     <span>E</span>
                     <span>Elastic</span>
                   </div>
                   <div className="scale-arrow">↔</div>
                   <div className="scale-item">
                     <span>R</span>
                     <span>Reliable</span>
                   </div>
                 </div>
               </div>
               <div className="dimension-desc">
               </div>
            
               <div className="dimension-header">
                 <div className="dimension-scale">
                   <div className="scale-item">
                     <span>V</span>
                     <span>Visionary</span>
                   </div>
                   <div className="scale-arrow">↔</div>
                   <div className="scale-item">
                     <span>O</span>
                     <span>Operator</span>
                   </div>
                 </div>
               </div>
               <div className="dimension-desc">
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};


export default HomePage;