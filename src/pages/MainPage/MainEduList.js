import { useState, useEffect } from "react";
import "../../styles/MainPage/MainEduList.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainEduList = ({ selectedCategory }) => {
  const [educationList, setEducationList] = useState([]);
  const [selectedEducationList, setSelectedEducationList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.209.49.229:8080/api/v1/content"
        );
        setEducationList(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "전체보기") {
      setSelectedEducationList(educationList);
    } else {
      const filteredData = educationList.filter(
        (edu) => edu.category === selectedCategory
      );
      setSelectedEducationList(filteredData);
    }
  }, [selectedCategory, educationList]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    const filteredData = educationList.filter(
      (edu) => edu.title.toLowerCase().includes(searchText.toLowerCase()) // 검색어로 필터링
    );
    setSelectedEducationList(filteredData);
  };

  const goEduContent = (contentId) => {
    navigate(`/education-content-page/${contentId}`);
  };

  return (
    <div>
      <div className="main-edu-list-top">
        <p>총 {selectedEducationList.length}건</p>
        <div>
          <form>
            <select>
              <option value="등록순">등록순</option>
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
            </select>
          </form>
          <form onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="텍스트를 입력하세요."
              onChange={handleSearchChange}
            />
            <button type="submit">
              <img src={"/icon/material-symbols_search.svg"} alt="search" />
            </button>
          </form>
        </div>
      </div>
      <div className="main-edu-list-container">
        {selectedEducationList.map((content) => (
          <div
            className="main-edu-content"
            onClick={() => goEduContent(content.contentId)}
            key={content.contentId}
          >
            <img src={content.companyImg} alt="logo" />
            <p>[ {content.companyName} ]</p>
            <p>{content.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainEduList;
