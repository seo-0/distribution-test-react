// 메인 페이지에 교육 컨텐츠 출력하는 컴포넌트
import { useState } from "react";
import "../../styles/MainPage/MainEdu.scss";
import categories from "../../Data/Category";
import MainEduList from "./MainEduList";

const MainEdu = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체보기");

  const handleClickCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="main-edu-container">
      <div className="main-edu-title">
        <h1>교육 모아보기</h1>
        <span>도움을 받고 싶은 교육 분야를 확인하세요!</span>
      </div>
      <div className="main-edu-category">
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleClickCategory(category.name)}
              className={selectedCategory === category.name ? "active" : ""}
            >
              <img src={category.icon} alt={category.name} />
              <span>{category.name}</span>
            </li>
          ))}
          <img src="/icon/two_arrow.svg" alt="icon" />
        </ul>
      </div>
      <MainEduList selectedCategory={selectedCategory} />
    </div>
  );
};

export default MainEdu;
