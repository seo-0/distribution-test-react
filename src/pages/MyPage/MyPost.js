// 내가 작성한 게시글
import { useRecoilValue } from "recoil";
// import { postsState } from "../../Data/User";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MyPage/MyPost.scss";
import { userState1 } from "../../Data/state";

const MyPost = () => {
  const user = useRecoilValue(userState1); // Recoil로부터 user 값을 가져옵니다.
  const userId = user.userId; // user 객체에서 userId 값을 가져옵니다.

  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/content/user?userId=${userId}` // userId를 URL에 추가합니다.
        );
        console.log(response.data);
        setEducationList(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]); // userId가 변경될 때만 API를 다시 요청합니다.

  const navigate = useNavigate();
  const goContentEdit = (contentId) => {
    navigate(`post-edit/${contentId}`);
  };

  return (
    <div className="mypost-container">
      <div className="mypost-top">
        <h1>{user.username}님이 작성한 게시글</h1>
        <Link to="/create-content">
          <button>게시글 작성하기</button>
        </Link>
      </div>
      <div className="post-items">
        {educationList.map((post) => (
          <div
            key={post.contentId}
            className="post-item"
            onClick={() => goContentEdit(post.contentId)}
          >
            <img className="logo" src={post.companyImg} alt="logo" />
            <div>
              <p>[ {post.companyName} ]</p>
              <p>{post.title}</p>
              <span className="link">
                컨텐츠 확인 및 삭제
                <img src="/icon/arrow-right.svg" alt="arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
