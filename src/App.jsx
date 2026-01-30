import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Copy, Check, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

const WeddingInvitation = () => {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 예시 이미지 (실제로는 본인 사진으로 교체)
  const galleryImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
  ];

  const weddingInfo = {
    bride: { name: '신부 이름', parent: '아버지 ○○○ · 어머니 ○○○' },
    groom: { name: '신랑 이름', parent: '아버지 ○○○ · 어머니 ○○○' },
    date: '2026년 5월 30일 토요일 오후 5시',
    venue: '○○웨딩홀 3층 그랜드볼룸',
    address: '서울특별시 강남구 테헤란로 123',
  };

  const accounts = [
    { type: '신랑', bank: '카카오뱅크', number: '3333-12-3456789', name: '신랑이름' },
    { type: '신랑 아버지', bank: '국민은행', number: '123-456-789012', name: '아버지이름' },
    { type: '신부', bank: '토스뱅크', number: '1000-1234-5678', name: '신부이름' },
    { type: '신부 어머니', bank: '신한은행', number: '110-123-456789', name: '어머니이름' },
  ];

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(index);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const addToCalendar = () => {
    const event = {
      text: `${weddingInfo.groom.name} ❤ ${weddingInfo.bride.name} 결혼식`,
      dates: '20260315T140000/20260315T160000',
      details: `${weddingInfo.venue}에서 결혼식이 진행됩니다.`,
      location: weddingInfo.address,
    };
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: '모바일 청첩장',
        text: `${weddingInfo.groom.name}❤${weddingInfo.bride.name}의 결혼식에 초대합니다`,
        url: window.location.href,
      });
    } else {
      copyToClipboard(window.location.href, 'share');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="wedding-invitation">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Noto+Serif+KR:wght@300;400;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --cream: #faf8f5;
          --warm-beige: #f5ebe0;
          --soft-brown: #d4a373;
          --rose-gold: #b87a5c;
          --deep-brown: #6b4423;
          --text-primary: #3a2a1a;
          --text-secondary: #7a6a5a;
        }

        body {
          background: var(--cream);
          color: var(--text-primary);
          font-family: 'Noto Serif KR', serif;
          line-height: 1.8;
          overflow-x: hidden;
        }

        .wedding-invitation {
          max-width: 500px;
          margin: 0 auto;
          background: var(--cream);
          position: relative;
        }

        /* 헤더 섹션 */
        .header {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, var(--warm-beige) 0%, var(--cream) 100%);
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(216, 163, 115, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 122, 92, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .main-image {
          width: 280px;
          height: 380px;
          object-fit: cover;
          border-radius: 200px 200px 20px 20px;
          margin-bottom: 40px;
          box-shadow: 0 20px 60px rgba(107, 68, 35, 0.15);
          animation: fadeInScale 1.2s ease-out;
          position: relative;
          z-index: 1;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .names {
          font-family: 'Noto Serif KR', serif;
          font-size: 2.8rem;
          font-weight: 400;
          letter-spacing: 2px;
          margin-bottom: 20px;
          animation: fadeInUp 1s ease-out 0.3s backwards;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heart-icon {
          color: var(--rose-gold);
          margin: 0 12px;
          animation: heartbeat 2s ease-in-out infinite;
          display: flex;
          align-items: center;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wedding-date {
          font-size: 1rem;
          color: var(--text-secondary);
          letter-spacing: 1px;
          animation: fadeInUp 1s ease-out 0.5s backwards;
          position: relative;
          z-index: 1;
        }

        /* 섹션 공통 스타일 */
        .section {
          padding: 80px 30px;
          animation: fadeInUp 0.8s ease-out;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          letter-spacing: 1px;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--soft-brown), transparent);
        }

        /* 초대 메시지 */
        .invitation-text {
          text-align: center;
          line-height: 2.2;
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 400px;
          margin: 0 auto 60px;
          font-weight: 300;
        }

        .couple-info {
          display: flex;
          justify-content: space-around;
          margin: 50px 0;
          gap: 30px;
        }

        .person {
          flex: 1;
          text-align: center;
        }

        .person-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--deep-brown);
        }

        .person-parent {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* 갤러리 */
        .gallery {
          position: relative;
          max-width: 450px;
          margin: 0 auto;
          aspect-ratio: 4/5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(107, 68, 35, 0.15);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease;
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--deep-brown);
        }

        .gallery-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .gallery-nav.prev { left: 15px; }
        .gallery-nav.next { right: 15px; }

        .gallery-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .dot.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }

        /* 날짜 및 장소 */
        .event-info {
          background: var(--warm-beige);
          padding: 50px 30px;
          border-radius: 12px;
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .event-detail {
          margin: 25px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .event-detail svg {
          color: var(--rose-gold);
          flex-shrink: 0;
        }

        .calendar-btn {
          margin-top: 30px;
          padding: 14px 35px;
          background: var(--deep-brown);
          color: white;
          border: none;
          border-radius: 30px;
          font-family: 'Noto Serif KR', serif;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .calendar-btn:hover {
          background: var(--rose-gold);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(107, 68, 35, 0.2);
        }

        /* 지도 */
        .map-container {
          width: 100%;
          height: 350px;
          border-radius: 12px;
          overflow: hidden;
          margin: 30px 0;
          box-shadow: 0 10px 40px rgba(107, 68, 35, 0.1);
        }

        /* 계좌번호 */
        .account-list {
          max-width: 420px;
          margin: 0 auto;
        }

        .account-item {
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 15px rgba(107, 68, 35, 0.06);
          transition: all 0.3s ease;
        }

        .account-item:hover {
          box-shadow: 0 8px 25px rgba(107, 68, 35, 0.12);
          transform: translateY(-2px);
        }

        .account-info {
          flex: 1;
        }

        .account-type {
          font-size: 0.85rem;
          color: var(--rose-gold);
          margin-bottom: 5px;
          font-weight: 600;
        }

        .account-detail {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-family: 'Courier New', monospace;
        }

        .copy-btn {
          padding: 10px 18px;
          background: var(--warm-beige);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--deep-brown);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
        }

        .copy-btn:hover {
          background: var(--soft-brown);
          color: white;
        }

        .copy-btn.copied {
          background: #5a9f7a;
          color: white;
        }

        /* 공유 버튼 */
        .share-section {
          text-align: center;
          padding: 60px 30px;
        }

        .share-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, var(--soft-brown), var(--rose-gold));
          color: white;
          border: none;
          border-radius: 30px;
          font-family: 'Noto Serif KR', serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(184, 122, 92, 0.3);
        }

        .share-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(184, 122, 92, 0.4);
        }

        /* 푸터 */
        .footer {
          text-align: center;
          padding: 50px 30px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: var(--warm-beige);
        }

        .footer-heart {
          color: var(--rose-gold);
          margin: 0 5px;
        }

        /* 반응형 */
        @media (max-width: 480px) {
          .names {
            font-size: 2.2rem;
          }
          
          .main-image {
            width: 240px;
            height: 320px;
          }

          .section {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 1.6rem;
          }
        }
      `}</style>

      {/* 헤더 */}
      <div className="header">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800"
          alt="Wedding"
          className="main-image"
        />
        <h1 className="names">
          {weddingInfo.groom.name}
          <Heart className="heart-icon" size={28} fill="currentColor" />
          {weddingInfo.bride.name}
        </h1>
        <p className="wedding-date">{weddingInfo.date}</p>
      </div>

      {/* 초대 메시지 */}
      <div className="section">
        <h2 className="section-title">Invitation</h2>
        <p className="invitation-text">
          평생 사랑하며 함께 하겠습니다.<br />
          귀한 걸음 하시어<br />
          저희 두 사람의 앞날을<br />
          축복해 주시면 감사하겠습니다.
        </p>
        <div className="couple-info">
          <div className="person">
            <div className="person-name">{weddingInfo.groom.name}</div>
            <div className="person-parent">{weddingInfo.groom.parent}</div>
          </div>
          <div className="person">
            <div className="person-name">{weddingInfo.bride.name}</div>
            <div className="person-parent">{weddingInfo.bride.parent}</div>
          </div>
        </div>
      </div>

      {/* 갤러리 */}
      <div className="section">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery">
          <img
            src={galleryImages[currentImageIndex]}
            alt={`Gallery ${currentImageIndex + 1}`}
            className="gallery-image"
          />
          <button className="gallery-nav prev" onClick={prevImage}>
            <ChevronLeft size={24} />
          </button>
          <button className="gallery-nav next" onClick={nextImage}>
            <ChevronRight size={24} />
          </button>
          <div className="gallery-dots">
            {galleryImages.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 날짜 및 장소 */}
      <div className="section">
        <h2 className="section-title">When & Where</h2>
        <div className="event-info">
          <div className="event-detail">
            <Calendar size={20} />
            <span>{weddingInfo.date}</span>
          </div>
          <div className="event-detail">
            <MapPin size={20} />
            <div>
              <div>{weddingInfo.venue}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '5px', color: 'var(--text-secondary)' }}>
                {weddingInfo.address}
              </div>
            </div>
          </div>
          <button className="calendar-btn" onClick={addToCalendar}>
            <Calendar size={18} />
            캘린더에 저장
          </button>
        </div>
      </div>

      {/* 지도 */}
      <div className="section">
        <h2 className="section-title">Location</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4165893834985!2d127.02768631531353!3d37.498993379812026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca157cdf0f31d%3A0xd634d3c7263cb32!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDsl7Drn7nroZwgMTIz!5e0!3m2!1sko!2skr!4v1643234567890!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Wedding Venue Location"
          />
        </div>
      </div>

      {/* 마음 전하실 곳 */}
      <div className="section">
        <h2 className="section-title">마음 전하실 곳</h2>
        <p className="invitation-text" style={{ marginBottom: '40px', fontSize: '0.9rem' }}>
          참석이 어려우신 분들을 위해<br />
          계좌번호를 기재하였습니다.
        </p>
        <div className="account-list">
          {accounts.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-info">
                <div className="account-type">{account.type}</div>
                <div className="account-detail">
                  {account.bank} {account.number}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                  {account.name}
                </div>
              </div>
              <button
                className={`copy-btn ${copiedAccount === index ? 'copied' : ''}`}
                onClick={() => copyToClipboard(account.number, index)}
              >
                {copiedAccount === index ? (
                  <>
                    <Check size={16} />
                    복사완료
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    복사
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 공유하기 */}
      <div className="share-section">
        <button className="share-btn" onClick={shareInvitation}>
          <Share2 size={20} />
          청첩장 공유하기
        </button>
      </div>

      {/* 푸터 */}
      <div className="footer">
        <p>
          {weddingInfo.groom.name}
          <Heart className="footer-heart" size={14} fill="currentColor" />
          {weddingInfo.bride.name}
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>
          Thank you for celebrating with us
        </p>
      </div>
    </div>
  );
};

export default WeddingInvitation;