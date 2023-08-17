import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import "../styles/components/Header.scss";
import { useSetRecoilState } from "recoil";
import { loginModalState } from "../Data/state";
import { userState1 } from "../Data/state";
import { useRecoilState } from "recoil";

const StyledLink = styled(Link)`
  text-decoration-line: none;
  color: #000000;
  &:hover {
    color: #6868ff;
  }
  &.selected {
    color: #6868ff;
  }
`;

const Header = () => {
  const location = useLocation();
  const showInputBox = location.pathname !== "/";
  const currentPath = location.pathname.slice(1);
  const setLoginModalShow = useSetRecoilState(loginModalState);

  const [user, setUser] = useRecoilState(userState1); //로그인상태관리

  const [searchKeyword, SetSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchBoxChange = (e) => {
    SetSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Token을 null로 설정하고, 사용자 이름도 null로 설정하여 로그아웃 처리하기
    setUser({ isLoggedIn: false, token: null, username: null });
    console.log("로그아웃 되었습니다.");
  };

  return (
    <div className="header">
      <div className="header-menu">
        <div className="header-menu-top">
          <h1 onClick={goHome}>NO:ONE</h1>
          {showInputBox && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="도움이 필요하면 무엇이든 검색하세요!"
                onChange={handleSearchBoxChange}
              />
              <button type="submit">
                <img
                  src={
                    process.env.PUBLIC_URL + "/icon/material-symbols_search.svg"
                  }
                  alt="search"
                />
              </button>
            </form>
          )}
        </div>
        <div className="header-menu-bottom">
          <ul>
            <StyledLink to="/" className={currentPath === "" ? "selected" : ""}>
              <li>전체보기</li>
            </StyledLink>
            <li>
              <StyledLink
                to="/QaPage"
                className={currentPath === "QaPage" ? "selected" : ""}
              >
                문의글 작성
              </StyledLink>
            </li>
            <StyledLink
              to="create-content"
              className={currentPath === "create-content" ? "selected" : ""}
            >
              <li>컨텐츠 작성</li>
            </StyledLink>
            <li>포인트</li>
          </ul>

          <ul>
            {user.isLoggedIn ? (
              <>
                <StyledLink
                  to="/mypage"
                  className={currentPath === "mypage" ? "selected" : ""}
                >
                  <li>{user.isLoggedIn ? `${user.username} 님` : "로그인"}</li>
                </StyledLink>
                <li onClick={handleLogout}>로그아웃</li>
              </>
            ) : (
              <>
                <li onClick={() => setLoginModalShow(true)}>로그인</li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
