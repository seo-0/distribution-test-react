import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import QaAll from "./QaAll";
import "../../styles/QaPage/QaDetail.scss";

const QaDetail = () => {
  const [ask, setAsk] = useState([]);
  const { inquiryId } = useParams();

  useEffect(() => {
    const fetchAskData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/inquiry/${inquiryId}`
        );
        setAsk(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAskData();
  }, [inquiryId]);

  return (
    <div className="qadetail-container">
      <Link to="/QaPage">
        <button>목록으로</button>
      </Link>
      <div className="ask-container">
        <div className="title-container">
          <h1>
            <span>제목</span>
            {ask.title}
          </h1>
          <p
            className={
              ask.isAnswer === "Y" ? "status-complete" : "status-ongoing"
            }
          >
            {ask.isAnswer === "Y" ? "답변 완료" : "진행 중"}
          </p>
        </div>
        <span className="description-title">내용</span>
        <div className="description-container">
          <p>{ask.description}</p>
        </div>
      </div>
      <QaAll />
    </div>
  );
};

export default QaDetail;
