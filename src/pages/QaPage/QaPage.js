import React, { useState, useEffect } from "react";
import "../../styles/QaPage/QaPage.scss";
import "../MyPage/MyAsk.js";
import QaAll from "./QaAll";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState1, loginModalState } from "../../Data/state";

function QaPage() {
  const user = useRecoilValue(userState1); // Recoil로부터 user 값을 가져옴
  const token = user.token; // user 객체에서 token 값을 가져옴
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (!user.token) {
      // token이 없으면 로그인 상태가 아닌 것으로 판단
      alert("로그인이 필요한 서비스입니다. 로그인 후 다시 시도하세요. "); // 사용자에게 알림
      // 로그인 페이지로 리다이렉션 (예: /login이 로그인 페이지라고 가정)
      setShowLoginModal(true);
    }
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // axios 요청 설정을 정의
      headers: {
        Authorization: "Bearer " + token, // 토큰을 헤더에 첨부
      },
    };
    console.log(config);
    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/api/v1/inquiry",
        {
          title: newPost.title,
          description: newPost.description,
        },
        config
      ); //config를 axios 요청에 추가

      if (response.status >= 200 && response.status < 300) {
        alert("문의글이 성공적으로 등록되었습니다.");
        // console.log(response);
      } else {
        alert("문의글 등록에 실패했습니다. 다시 시도해주세요.");
      }
      setPosts([newPost, ...posts]);
      setNewPost({ title: "", description: "" });
    } catch (error) {
      alert("문의글 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  return (
    <div className="qa-page-container">
      <h1>문의글 남기기</h1>
      <div className="qanda-container">
        <form onSubmit={handleSubmit}>
          <label>
            <span>
              제목
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
              />
            </span>
          </label>
          <br></br>
          <label>
            <span>
              1. 해당 서비스 사용 시 어떤 어려움을 느끼셨는 지 아래에 간략히
              입력해주세요.
            </span>{" "}
            <br></br>
            <textarea
              name="description"
              id="description"
              value={newPost.description}
              onChange={handleChange}
            />
          </label>
          <br></br>

          <label className="qa">
            <span>
              2. 문의글 작성 시 제공되는 회원님의 개인정보 동의여부를
              눌러주세요.
            </span>
            <div>
              <input type="checkbox" id="agree" name="agree" />
              동의
            </div>
          </label>
          <br></br>

          <h5>
            해당 문의글은 NO:ONE이 검토 후 빠르게 안내드릴 수 있도록 할게요!
          </h5>
          <div>
            <button type="submit">작성 완료</button>
            <br></br>
          </div>
        </form>
      </div>

      <div className="myask">
        <QaAll />
      </div>
    </div>
  );
}

export default QaPage;
