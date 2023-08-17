// 마이 페이지의 메뉴바
import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "../../styles/MyPage/MyPageMenu.scss";

import { useRecoilValue } from "recoil";
import { userState1 } from "../../Data/state";

const StyledLink = styled(Link)`
  text-decoration-line: none;
  list-style: none;
  color: #777777;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;

  &.selected {
    color: black;
    font-weight: bold;
  }
`;

const MyPageMenu = () => {
  const user = useRecoilValue(userState1);

  const location = useLocation();
  const currentPath = location.pathname.slice("/mypage".length + 1);

  return (
    <div className="mypage-container">
      <div className="mypage-menubar">
        <h1>{user.username}님 안녕하세요!</h1>
        <ul className="mypage-menu-top">
          <StyledLink to="" className={currentPath === "" ? "selected" : ""}>
            <li>전체보기</li>
          </StyledLink>
          <li className="mypage-menu-title">
            <p>내정보</p>
            <ul>
              <StyledLink
                to="profile"
                className={currentPath === "profile" ? "selected" : ""}
              >
                <li>프로필</li>
              </StyledLink>
              <StyledLink to="">
                <li>포인트 사용내역</li>
              </StyledLink>
              <StyledLink to="">
                <li>개인 정보 수정</li>
              </StyledLink>
            </ul>
          </li>
          <li className="mypage-menu-title">
            <p>게시글 관리</p>
            <ul>
              <StyledLink
                to="post"
                className={currentPath === "post" ? "selected" : ""}
              >
                <li>작성한 게시글</li>
              </StyledLink>
              <StyledLink
                to="ask"
                className={currentPath === "ask" ? "selected" : ""}
              >
                <li>작성한 문의글</li>
              </StyledLink>
            </ul>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageMenu;
