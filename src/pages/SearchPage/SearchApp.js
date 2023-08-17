import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/SearchPage/SearchApp.scss";

const SearchApp = () => {
  const [educationList, setEducationList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/content/search?keyword=${searchKeyword}`
        );
        setEducationList(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchKeyword]);

// 마감 시간까지 남은 시간을 계산하는 함수
  const getTimeRemaining = (deadline) => {
    const timeLeft = new Date(deadline) - new Date();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
    const minutes = Math.floor(
      (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
  );

    return { days, hours, minutes };
};

  // 마감 시간이 지났는지 확인하는 함수
  const isPastDeadline = (deadline) => {
    return new Date() > new Date(deadline);
  };

  const goEduContent = (contentId) => {
    navigate(`/education-content-page/${contentId}`);
  };

  return (
    <div className="search-page-container">
      <div className="search-info">
        <p>검색 결과 약 {educationList.length}개</p>
        <div>
          <h1>" {searchKeyword} " 검색 결과</h1>
          <form>
            <select>
              <option value="관련도 높은순">관련도 높은순</option>
              <option value="조회수 높은순">조회수 높은순</option>
            </select>
          </form>
        </div>
      </div>
      <div className="search-items">
        {educationList.map((content) => (
          <div
            key={content.contentId}
            onClick={() => goEduContent(content.contentId)}
            className={`search-edu-content ${
              !!content.deadline ? "event" : ""
            }`}
          >
            <img src={content.companyImg} alt="logo" />
            <div>
              {!!content.deadLine && !isPastDeadline(content.deadLine) && (
                <span className="event">단기 이벤트</span>
              )}
              {isPastDeadline(content.deadLine) && (
                <span className="event-closed">* 본 이벤트는 마감된 이벤트입니다.</span>
              )}
              <p className="content-company">[ {content.companyName} ]</p>
              <p className="content-title">{content.title}</p>
              {!!content.deadLine && !isPastDeadline(content.deadLine) && (
                <span className="content-time">
                  마감까지 약 {getTimeRemaining(content.deadLine).days}일{" "}
                  {getTimeRemaining(content.deadLine).hours}시간 남음
                </span>
              )}
              <span className="content-link">
                바로가기
                <img src="icon/arrow-right.svg" alt="arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchApp;
