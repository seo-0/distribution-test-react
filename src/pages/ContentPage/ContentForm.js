import { useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import categories from "../../Data/Category";
import { userState1 } from "../../Data/state";
import "../../styles/ContentPage/ContentForm.scss";

const ContentForm = () => {
  const user = useRecoilValue(userState1); //실제 유저 데이터
  const [selectedImage, setSelectedImage] = useState(null); // 기업 로고
  const [isShortEvent, setIsShortEvent] = useState(false); // 단기 이벤트인지
  const [deadlineDate, setDeadlineDate] = useState(""); // 마감 날짜
  const [deadlineTime, setDeadlineTime] = useState(""); // 마감 시간
  const [stepCount, setStepCount] = useState(2); // 초기 단계 수
  const [steps, setSteps] = useState([
    { content: "", file: null, hashtags: [] },
    { content: "", file: null, hashtags: [] },
  ]);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleStepContentChange = (index, key, value) => {
    const newSteps = [...steps];
    newSteps[index][key] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setStepCount(stepCount + 1);
    setStepFiles((prevStepFiles) => [...prevStepFiles, null]);
    setHashTags((prevHashTags) => [...prevHashTags, []]);
    setSteps([...steps, { content: "", file: null, hashtags: [] }]);
  };

  const [stepFiles, setStepFiles] = useState(new Array(stepCount).fill(null));

  const handleStepFileChange = (index, file) => {
    const newStepFiles = [...stepFiles];
    newStepFiles[index] = file;
    setStepFiles(newStepFiles);
  };

  // shortYn 값 설정
  const shortYnValue = isShortEvent ? "Y" : "N";
  let formattedDeadline = null;
  if (isShortEvent && deadlineDate && deadlineTime) {
    // 마감 날짜와 시간을 문자열에서 Date 객체로 변환
    const formattedDeadlineDate = new Date(deadlineDate);
    const formattedDeadlineTime = new Date(`1970-01-01T${deadlineTime}:00`);
    // 마감시간을 "YYYY-MM-DDTHH:MM:SS" 형식으로 조립
    formattedDeadline = `${formattedDeadlineDate
      .toISOString()
      .slice(0, 10)}T${formattedDeadlineTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${formattedDeadlineTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:00`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // FormData 객체 생성

    formData.append("userId", user.userId);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("companyName", e.target.company.value);
    formData.append("category", e.target.category.value);
    formData.append("uploadFile", selectedImage);

    // contentPageList 정보를 FormData에 추가
    steps.forEach((step, index) => {
      formData.append(`contentPageList[${index}].pageOrder`, index + 1);
      formData.append(`contentPageList[${index}].description`, step.content);
      formData.append(`contentPageList[${index}].uploadFile`, stepFiles[index]);
      formData.append(`contentPageList[${index}].tagList`, hashTags[index]);
    });

    formData.append("shortYn", shortYnValue);
    if (isShortEvent && deadlineDate && deadlineTime) {
      formData.append("deadLine", formattedDeadline);
    }

    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/api/v1/content",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("서버 응답:", response.data);
      console.log("제출된 데이터:", formData);
      alert("교육 컨텐츠가 성공적으로 등록되었습니다.");
      navigate("/");
      // 성공적인 응답 처리
    } catch (error) {
      alert(
        "교육 컨텐츠를 등록하지 못했습니다. 입력을 빠짐없이 다시 작성해주세요."
      );
      console.error("데이터 전송 실패", error);
      console.log(formData);
      // 네트워크 또는 처리 오류 처리
    }
  };

  const [hashTags, setHashTags] = useState(new Array(stepCount).fill([]));
  const [inputHashTag, setInputHashTag] = useState(
    new Array(stepCount).fill("")
  );

  const addHashTag = (e, index) => {
    const allowedCommand = ["Comma", "Enter", "Space", "NumpadEnter"];
    if (!allowedCommand.includes(e.code)) return;

    const isEmptyValue = (value) => {
      if (!value.length) {
        return true;
      }
      return false;
    };

    if (isEmptyValue(e.target.value.trim())) {
      return setInputHashTag("");
    }

    let newHashTag = e.target.value.trim();

    setHashTags((prevStepHashTags) => {
      const newStepHashTags = [...prevStepHashTags];
      newStepHashTags[index] = [
        ...new Set([...prevStepHashTags[index], newHashTag]),
      ];
      return newStepHashTags;
    });

    // setInputHashTag("");
    setInputHashTag((prevInputHashTag) => {
      const newInputHashTag = [...prevInputHashTag];
      newInputHashTag[index] = "";
      return newInputHashTag;
    });
  };

  const keyDownHandler = (e) => {
    if (e.code !== "Enter" && e.code !== "NumpadEnter") return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.target.value)) {
      setInputHashTag("");
    }
  };

  const changeHashTagInput = (e, index) => {
    setInputHashTag((prevInputHashTag) => {
      const newInputHashTag = [...prevInputHashTag];
      newInputHashTag[index] = e.target.value;
      return newInputHashTag;
    });
  };

  const isLoggedIn = user && user.userId; // userId 값이 있는지 확인
  if (!isLoggedIn) {
    return (
      <div className="warning-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M60.831 9.7499C63.0754 7.50633 66.1191 6.24624 69.2926 6.24683C72.4661 6.24741 75.5093 7.50863 77.7529 9.75302C79.9965 11.9974 81.2565 15.0411 81.256 18.2146C81.2554 21.3881 79.9942 24.4313 77.7498 26.6749L73.1748 31.2499L56.2498 14.3311L60.831 9.75615V9.7499ZM51.831 18.7499L14.6123 55.9686C13.4822 57.0992 12.6306 58.4772 12.1248 59.9937L6.41226 77.1374C6.2282 77.6879 6.20109 78.2787 6.33396 78.8437C6.46682 79.4087 6.75442 79.9256 7.16452 80.3363C7.57462 80.7471 8.09101 81.0355 8.65581 81.1693C9.22061 81.303 9.81151 81.2768 10.3623 81.0937L27.506 75.3749C29.0248 74.8749 30.3998 74.0186 31.531 72.8874L31.9373 72.4874C30.9414 67.5984 31.0219 62.5511 32.1729 57.6963C33.324 52.8414 35.5181 48.2954 38.6029 44.3738C41.6877 40.4523 45.5892 37.2493 50.0364 34.9872C54.4836 32.7252 59.37 31.4585 64.356 31.2749L51.831 18.7499ZM37.4998 65.6249C37.4998 69.3183 38.2272 72.9756 39.6407 76.3879C41.0541 79.8002 43.1257 82.9006 45.7374 85.5123C48.349 88.1239 51.4495 90.1956 54.8618 91.609C58.2741 93.0224 61.9313 93.7499 65.6248 93.7499C69.3182 93.7499 72.9755 93.0224 76.3877 91.609C79.8 90.1956 82.9005 88.1239 85.5121 85.5123C88.1238 82.9006 90.1955 79.8002 91.6089 76.3879C93.0223 72.9756 93.7498 69.3183 93.7498 65.6249C93.7498 58.1657 90.7866 51.012 85.5121 45.7375C80.2377 40.4631 73.084 37.4999 65.6248 37.4999C58.1655 37.4999 51.0118 40.4631 45.7374 45.7375C40.4629 51.012 37.4998 58.1657 37.4998 65.6249ZM43.7498 65.6249C43.7498 61.5651 44.8795 57.5854 47.0127 54.1312C49.1458 50.6769 52.1981 47.8845 55.828 46.0663C59.4579 44.2481 63.5221 43.4759 67.5659 43.8362C71.6097 44.1964 75.4734 45.6749 78.7248 48.1061L48.0998 78.7312C45.2662 74.9501 43.7394 70.3499 43.7498 65.6249ZM65.6248 87.4999C60.7123 87.4999 56.1748 85.8749 52.5248 83.1437L83.1498 52.5186C85.5831 55.7704 87.0632 59.6353 87.4241 63.6806C87.7851 67.7259 87.0128 71.7919 85.1936 75.4231C83.3745 79.0543 80.5803 82.1073 77.1241 84.2403C73.6679 86.3733 69.6861 87.5019 65.6248 87.4999Z"
            fill="#F24E1E"
          />
        </svg>
        <h1 className="warning-message">로그인 후 이용 가능합니다.</h1>
      </div>
    );
  }

  return (
    <div className="content-form-container">
      <h1>교육 등록 양식</h1>
      <form onSubmit={handleSubmit}>
        <div className="content-basic-info">
          <div className="info">
            <label>
              제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="title" />
            </label>
            <label>
              교육내용
              <input type="text" name="description" />
            </label>
            <label>
              기업명 &nbsp;
              <input type="text" name="company" />
            </label>
            <label>
              카테고리{" "}
              <select name="category">
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
              <img src={URL.createObjectURL(selectedImage)} alt="기업 이미지" />
            )}
          </div>
        </div>
        <div className="content-step-info">
          <div className="sub-title">
            <h2>컨텐츠의 내용을 단계별로 작성해주세요.</h2>
            <p>
              단계별 정보 외에 추가적인 정보가 필요하다면 간단한 카테고리를
              넣어주세요.
            </p>
          </div>
          {Array.from({ length: stepCount }).map((_, index) => (
            <div key={index} className="content-step">
              <h3>Step {index + 1}</h3>
              <div className="content-info">
                <label>
                  <span>내용</span>
                  <input
                    type="text"
                    placeholder={`Step ${index + 1} 내용`}
                    value={steps[index].content}
                    onChange={(e) =>
                      handleStepContentChange(index, "content", e.target.value)
                    }
                  />
                </label>
                <label>
                  <span>첨부 파일</span>
                  <input
                    className="upload-name"
                    value={
                      stepFiles[index] ? stepFiles[index].name : "첨부파일"
                    }
                    placeholder="첨부파일"
                    readOnly
                  />
                  <label htmlFor={`file-${index}`} className="file-choice">
                    파일 선택
                  </label>
                  <input
                    type="file"
                    id={`file-${index}`}
                    className="hidden-input"
                    onChange={(e) =>
                      handleStepFileChange(index, e.target.files[0])
                    }
                  />
                </label>
                <label>
                  <p>
                    추가적으로 교육이 필요한 정보의 간단한 해시태그를
                    입력해주세요. <span>(선택)</span>
                  </p>
                  <div className="hashWraps">
                    <div className="hashWrapOuter">
                      {hashTags[index].length > 0 &&
                        hashTags[index].map((hashTag) => {
                          return (
                            <div key={hashTag} className="hashtag-item">
                              #{hashTag}
                            </div>
                          );
                        })}
                    </div>
                    <input
                      type="text"
                      // value={inputHashTag}
                      value={inputHashTag[index] || ""}
                      onChange={(e) => changeHashTagInput(e, index)}
                      onKeyUp={(e) => addHashTag(e, index)}
                      onKeyDown={keyDownHandler}
                      placeholder="#해시태그를 등록해보세요. (최대 10개)"
                      className="hashTagInput"
                    />
                  </div>
                </label>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddStep}>
            +{" "}
          </button>
        </div>
        <div className="content-deadline">
          <div className="sub-title">
            <h2>마감시간</h2>
            <p>단기성 이벤트인 경우 마감 시간을 설정해주세요</p>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={!isShortEvent}
                onChange={() => setIsShortEvent(false)}
              />
              일반
            </label>
            <label>
              <input
                type="checkbox"
                checked={isShortEvent}
                onChange={() => setIsShortEvent(true)}
              />
              단기성 이벤트
            </label>
            {/* {isShortEvent && <input type="date" name="deadline" />} */}
            {isShortEvent && (
              <div>
                <input
                  type="date"
                  name="deadlineDate"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                />
                <input
                  type="time"
                  name="deadlineTime"
                  value={deadlineTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="content-privacy">
          <p>
            컨텐츠 기능 설명 글 작성시 제공 받는 회원님의 개인 정보에 동의
            여부를 눌러주세요.
          </p>
          <label>
            <input type="checkbox" />
            동의
          </label>
        </div>
        <div className="content-form-bottom">
          <p>
            검토 후 콘텐츠 메인페이지에 등록 시 회원님의{" "}
            <span>포인트 120P</span>가 지급될 예정입니다.
          </p>
          <p>적립된 포인트는 마이페이지에서 확인하세요!</p>
          <button>작성 완료</button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
