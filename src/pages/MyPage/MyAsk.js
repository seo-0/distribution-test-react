// 내가 작성한 문의글 보기
import { useRecoilValue, useRecoilState } from "recoil";
import { userState1 } from "../../Data/state";
import { asksState } from "../../Data/state";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/MyPage/MyAsk.scss";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>진행 상황</th>
      </tr>
    </thead>
  );
};

const TableRow = ({ id, title, content, status, onClick }) => {
  const statusColor = status === "진행 중" ? "#F24E1E" : "#699BF7";
  return (
    <tr onClick={onClick}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td style={{ color: statusColor }}>{status}</td>
    </tr>
  );
};

const MyAsk = () => {
  const user = useRecoilValue(userState1); // Recoil로부터 user 값을 가져옴
  const token = user.token; // user 객체에서 token 값을 가져옴
  const [asks, setAsks] = useRecoilState(asksState);

  useEffect(() => {
    const config = {
      // axios 요청 설정을 정의
      headers: {
        Authorization: "Bearer " + token, // 토큰을 헤더에 첨부
      },
    };
    // console.log(config);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 사용자가 작성한 게시글 불러오는 걸로 api 경로 수정
          "http://13.209.49.229:8080/api/v1/inquiry/user",
          config
        );
        console.log(response.data)
;        setAsks(response.data);
      } catch (error) {
        alert("회원 문의글 가져오기 실패");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [showAll, setShowAll] = useState(false);
  const displayedAsks = showAll ? asks : asks.slice(0, 5);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const navigate = useNavigate();
  const goDetail = (inquiryId) => {
    navigate(`/QaPage/${inquiryId}`);
  };

  return (
    <div className="myask-container">
      <h1>{user.username}님이 작성한 문의글</h1>
      <table>
        <TableHeader />
        <tbody>
          {displayedAsks.map((ask) => (
            <TableRow
              key={ask.inquiryId}
              id={ask.inquiryId}
              title={ask.title}
              content={ask.description}
              status={ask.isAnswer === "Y" ? "답변 완료" : "진행 중"}
              onClick={() => goDetail(ask.inquiryId)}
            />
          ))}
        </tbody>
      </table>
      {asks.length > 5 && (
        <button onClick={handleToggleShowAll}>
          {showAll ? "간략히 보기" : "전체보기"}
        </button>
      )}
    </div>
  );
};

export default MyAsk;
