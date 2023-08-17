import { Routes, Route } from "react-router-dom";
import MyPageMenu from "./MyPageMenu";
import MyProfile from "./MyProfile";
import MyPost from "./MyPost";
import MyAsk from "./MyAsk";
import MyPageAll from "./MyPageAll";
import MyPostEdit from "./MyPostEdit";

const MyPageApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyPageMenu />}>
          <Route index element={<MyPageAll />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/post" element={<MyPost />} />
          <Route path="/ask" element={<MyAsk />} />
        </Route>
        <Route path="/post-edit/:contentId" element={<MyPostEdit />} />
      </Routes>
    </div>
  );
};

export default MyPageApp;
