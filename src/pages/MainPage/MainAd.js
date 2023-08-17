// 메인 페이지 상단에 이벤트 광고 출력하는 컴포넌트
import { useState, useEffect } from "react";
import "../../styles/MainPage/MainAd.scss";

const ads = [
  "/img/1.png",
  "/img/2.png",
  "/img/7.png",
  "/img/8.png",
  "/img/LIKELION.png",
  "/img/1.png",
];

const MainAd = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-ad-container">
      <div className="main-ad-slider">
        {ads.map((ad, index) => (
          <img
            key={index}
            src={ad}
            alt={`Ad ${index + 1}`}
            style={{
              left: `${100 * (index - currentAd)}%`,
            }}
          />
        ))}
      </div>
      <div className="main-ad-dots">
        {ads.map((_, index) => (
          <span
            key={index}
            className={currentAd === index ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MainAd;
