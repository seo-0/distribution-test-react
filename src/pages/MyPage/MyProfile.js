import { useRecoilValue } from "recoil";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/MyPage/MyProfile.scss";
import { userState1, asksState } from "../../Data/state";
import { userInfoState } from "../../Data/User";

const MyProfile = () => {
  const user = useRecoilValue(userState1); //실제 유저 데이터
  const [numberOfPosts, setNumberOfPosts] = useState(0); // 추가된 state
  const userInfo = useRecoilValue(userInfoState); //임시 데이터
  const asks = useRecoilValue(asksState);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://13.209.49.229:8080/api/v1/content/user?userId=${user.userId}`,
          config
        );
        console.log(response.data); // API 응답 자체를 확인
        setNumberOfPosts(response.data.result.length);
      } catch (error) {
        console.error("Error fetching user's posts:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className="profile-container">
      <div className="profile-top">
        <img src="/icon/user.svg" alt="user" />
        <div className="profile-top-info">
          <h1>{user.username}님</h1>
          <div className="profile-top-info-email">
            <img src="/icon/email.svg" alt="email-icon" />
            <p>{user.email}</p>
          </div>
          <div className="profile-top-info-point">
            <img src="/icon/point.svg" alt="point-icon" />
            <p>{userInfo.points}P</p>
            <div className="point-usage">
              <p>포인트 사용내역</p>
              <img src="/icon/arrow-grey.svg" alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      <p className="profile-bottom">
        작성한 게시글 <span>{numberOfPosts}</span>
      </p>
      <p className="profile-bottom">
        작성한 문의글 <span>{asks.length}</span>
      </p>
      <p className="profile-bottom">
        스크랩 <span>24</span>
      </p>
    </div>
  );
};

export default MyProfile;
