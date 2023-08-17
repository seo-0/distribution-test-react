import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const QaAll = () => {
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const fetchAskData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/inquiry`
        );
        setAsks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAskData();
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
      <h1>전체 문의글</h1>
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

export default QaAll;
