import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/EduContentPage/EduContentPage.scss";

function EducationContentPage() {
  const [educationContent, setEducationContent] = useState({
    contentPageList: [],
  });
  const { contentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/content/${contentId}`
        );
        setEducationContent(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contentId]);

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

  if (!educationContent || !educationContent.contentPageList.length) {
    return <div>컨텐츠를 읽을 수 없습니다.</div>;
  }

  const prevButtonIcon =
    currentIndex === 0 ? "before.svg" : "before-active.svg";
  const nextButtonIcon =
    currentIndex === educationContent.contentPageList.length - 1
      ? "next.svg"
      : "next-active.svg";

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + educationContent.contentPageList.length) %
        educationContent.contentPageList.length
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % educationContent.contentPageList.length
    );
  };

  const currentPage = educationContent.contentPageList[currentIndex];

  const goSearchApp = (tag) => {
    if (tag.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div className="edu-container">
      <h1>[{educationContent.companyName}]</h1>
      <h3>{educationContent.title}</h3>
      <p>{educationContent.description}</p>
      <div className="image-count">
        <span>
          {currentIndex + 1} / {educationContent.contentPageList.length}
        </span>
        {currentPage.tagList[0].length > 0 && (
          <div className="tag-list">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M1.625 9.5H2.5M9.5 1.625V2.5M16.5 9.5H17.375M3.9 3.9L4.5125 4.5125M15.1 3.9L14.4875 4.5125M7.4875 13.875H11.5125M6.875 13C6.14041 12.4491 5.59779 11.681 5.324 10.8045C5.05022 9.92801 5.05914 8.98762 5.34951 8.1165C5.63988 7.24539 6.19698 6.48772 6.94189 5.95082C7.6868 5.41391 8.58176 5.125 9.5 5.125C10.4182 5.125 11.3132 5.41391 12.0581 5.95082C12.803 6.48772 13.3601 7.24539 13.6505 8.1165C13.9409 8.98762 13.9498 9.92801 13.676 10.8045C13.4022 11.681 12.8596 12.4491 12.125 13C11.7834 13.3382 11.5261 13.752 11.3741 14.208C11.2221 14.6641 11.1796 15.1495 11.25 15.625C11.25 16.0891 11.0656 16.5342 10.7374 16.8624C10.4092 17.1906 9.96413 17.375 9.5 17.375C9.03587 17.375 8.59075 17.1906 8.26256 16.8624C7.93437 16.5342 7.75 16.0891 7.75 15.625C7.8204 15.1495 7.77787 14.6641 7.62586 14.208C7.47385 13.752 7.21663 13.3382 6.875 13Z"
                  stroke="#FFD233"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>{currentPage.tagList[0]} 방법을 모른다면?</p>
            </div>
            {currentPage.tagList.map((tag, index) => (
              <button key={index} onClick={() => goSearchApp(tag)}>
                "{tag}" 바로가기
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="edu-contents">
        <button
          onClick={currentIndex === 0 ? null : handlePrev}
          className="img-button"
          disabled={currentIndex === 0}
        >
          <img src={`/icon/${prevButtonIcon}`} alt="previous" />
        </button>
        <div className="edu-img">
          <div className="image-description">
            <p>{currentPage.description}</p>
            <img
              src={currentPage.url}
              alt={`${currentPage.pageOrder} img`}
              className="content-image"
            />
          </div>
        </div>
        <button
          onClick={
            currentIndex === educationContent.contentPageList.length - 1
              ? null
              : handleNext
          }
          className="img-button"
          disabled={
            currentIndex === educationContent.contentPageList.length - 1
          }
        >
          <img src={`/icon/${nextButtonIcon}`} alt="next" />
        </button>
      </div>
    </div>
  );
}
export default EducationContentPage;
