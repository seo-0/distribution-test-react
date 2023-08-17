import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import categories from "../../Data/Category";
import "../../styles/ContentPage/ContentForm.scss";
import "../../styles/MyPage/MyPostEdit.scss";
import EducationContentPage from "../EduContentPage/EduContentPage";

const MyPostEdit = () => {
  const [educationContent, setEducationContent] = useState({
    title: "",
    description: "",
    companyName: "",
    category: "",
  });
  const { contentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 사용자가 작성한 게시글 불러오는 걸로 api 경로 수정
          `http://13.209.49.229:8080/api/v1/content/${contentId}`
        );
        setEducationContent(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        // 삭제 되었을 때 처리할 로직
        alert("성공적으로 삭제되었습니다.");
        navigate("/");
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contentId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const [selectedImage, setSelectedImage] = useState(
    educationContent.companyImg
  ); // 기업 로고
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting content...");
      await axios.delete(
        // 삭제 요청을 보내는 API 경로
        `http://13.209.49.229:8080/api/v1/content/${contentId}`
      );
      console.log("Deletion successful.");
      // 삭제 성공 시, 리다이렉트 등 필요한 작업 수행
      alert("해당 교육 컨텐츠가 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="mypost-edit-container">
      {/* <h1 className="title">등록된 교육 컨텐츠</h1> */}
      <EducationContentPage />
      <div className="content-form-container">
        <form>
          <h1>교육 등록 양식 요약보기</h1>
          <div className="content-basic-info">
            <div className="info">
              <label>
                제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="title"
                  value={educationContent.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                교육내용
                <input
                  type="text"
                  name="description"
                  value={educationContent.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                기업명 &nbsp;
                <input
                  type="text"
                  name="company"
                  value={educationContent.companyName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                카테고리{" "}
                <select
                  name="category"
                  value={educationContent.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="company-logo">
              {!selectedImage && (
                <label htmlFor="company-logo">
                  <img src="/icon/file.svg" alt="file" />
                  <span>기업 이미지 첨부</span>
                </label>
              )}
              <input
                type="file"
                id="company-logo"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="기업 이미지"
                />
              )}
            </div>
          </div>
          <div className="content-privacy">
            <p>컨텐츠를 수정 or 삭제 동의 여부를 체크해주세요.</p>
            <label>
              <input type="checkbox" />
              동의
            </label>
          </div>
          <div className="button-zip">
            <button onClick={handleDelete}>게시글 삭제</button>
            {/* <button onClick={handleEdit}>수정</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPostEdit;
