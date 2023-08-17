// 메인 페이지에 실시간 인기 순위를 출력하는 컴포넌트
import "../../styles/MainPage/MainRanking.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import MainClock from "./MainClock";

const iconImages = ["ranking-same.svg", "ranking-down.svg", "ranking-up.svg"];

const MainRanking = () => {
  const [rankingData, setRankingData] = useState([]);
  const [rankingKeyWords, setRankingKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.209.49.229:8080/api/v1/content/realtime"
        );
        setRankingData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const keyWords = rankingData.map((item) => item.title);
    const topKeywords = keyWords.slice(0, 10);
    setRankingKeywords(topKeywords);
  }, [rankingData]);

  const frontKeyWords = rankingKeyWords.slice(0, 5);
  const backKeyWords = rankingKeyWords.slice(5);

  const getRandomIcon = () => {
    return iconImages[Math.floor(Math.random() * iconImages.length)];
  };
  return (
    <div className="main-ranking-container">
      <div>
        <h1>실시간 인기순위</h1>
        <span>현재 시간 기준 사용자가 가장 많이 조회한 키워드입니다.</span>
      </div>
      <MainClock />
      <div className="ranking-container">
        <ul className="ranking-left">
          {frontKeyWords.map((keyword, index) => (
            <li key={index}>
              <div>
                <p>{index + 1}</p>
                <p>{keyword}</p>
              </div>
              <img
                src={`/icon/${getRandomIcon()}`}
                alt="icon"
                className="ranking-icon"
              />
            </li>
          ))}
        </ul>
        <ul className="ranking-right">
          {backKeyWords.map((keyword, index) => (
            <li key={index}>
              <div>
                <p>{index + 6}</p>
                <p>{keyword}</p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/icon/${getRandomIcon()}`}
                alt="icon"
                className="ranking-icon"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainRanking;
