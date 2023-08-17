import { useState, useEffect } from "react";

const MainClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 10분마다 시간을 업데이트
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = () => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const date = String(currentTime.getDate()).padStart(2, "0");
    let hours = currentTime.getHours();
    let ampm = "오전";
    if (hours >= 12) {
      hours %= 12;
      ampm = "오후";
    }
    hours = String(hours).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const dayOfWeek = weekdays[currentTime.getDay()];

    return `${year}년 ${month}월 ${date}일 ${dayOfWeek}요일 ${ampm} ${hours}:${minutes}`;
  };

  return <p>{formattedTime()}</p>;
};

export default MainClock;
