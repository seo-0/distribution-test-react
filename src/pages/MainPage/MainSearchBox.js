// 메인 페이지에 검색창을 출력하는 컴포넌트
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage/MainSearchBox.scss";

const MainSearchBox = () => {
  const [searchKeyword, SetSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchBoxChange = (e) => {
    SetSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
    }
  };

  return (
    <div>
      <form className="main-search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="도움이 필요하면 무엇이든 검색하세요!"
          onChange={handleSearchBoxChange}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 70 70"
            fill="none"
          >
            <path
              d="M57.1667 61.25L38.7917 42.875C37.3333 44.0417 35.6562 44.9653 33.7604 45.6458C31.8646 46.3264 29.8472 46.6667 27.7083 46.6667C22.4097 46.6667 17.9258 44.8311 14.2567 41.16C10.5875 37.4889 8.75194 33.005 8.75 27.7083C8.75 22.4097 10.5856 17.9258 14.2567 14.2567C17.9278 10.5875 22.4117 8.75194 27.7083 8.75C33.0069 8.75 37.4908 10.5856 41.16 14.2567C44.8292 17.9278 46.6647 22.4117 46.6667 27.7083C46.6667 29.8472 46.3264 31.8646 45.6458 33.7604C44.9653 35.6562 44.0417 37.3333 42.875 38.7917L61.25 57.1667L57.1667 61.25ZM27.7083 40.8333C31.3542 40.8333 34.4536 39.5568 37.0067 37.0038C39.5597 34.4507 40.8353 31.3522 40.8333 27.7083C40.8333 24.0625 39.5568 20.9631 37.0038 18.41C34.4507 15.8569 31.3522 14.5814 27.7083 14.5833C24.0625 14.5833 20.9631 15.8599 18.41 18.4129C15.8569 20.966 14.5814 24.0644 14.5833 27.7083C14.5833 31.3542 15.8599 34.4536 18.4129 37.0067C20.966 39.5597 24.0644 40.8353 27.7083 40.8333Z"
              fill="white"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MainSearchBox;
