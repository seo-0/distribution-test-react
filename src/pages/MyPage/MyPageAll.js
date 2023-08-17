import MyProfile from "./MyProfile";
import MyPageAd from "./MyPageAd";
import MyPost from "./MyPost";
import MyAsk from "./MyAsk";

const MyPageAll = () => {
  return (
    <div style={{ width: "80%" }}>
      <MyProfile />
      <MyPageAd />
      <MyPost />
      <MyAsk />
    </div>
  );
};

export default MyPageAll;
