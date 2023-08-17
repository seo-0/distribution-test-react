import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainApp from "./pages/MainPage/MainApp";
import SearchApp from "./pages/SearchPage/SearchApp";
import LoginModal from "./pages/LoginPage/LoginModal";
import SignUpModal from "./pages/LoginPage/SignUpModal";
import QaPage from "./pages/QaPage/QaPage";
import QaDetail from "./pages/QaPage/QaDetail";
import MyPageApp from "./pages/MyPage/MyPageApp";
import EducationContentPage from "./pages/EduContentPage/EduContentPage";
import ContentApp from "./pages/ContentPage/ContentApp";
import { RecoilRoot } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <RecoilRoot>
      <Container>
        <Header />
        <LoginModal />
        <SignUpModal />
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/search" element={<SearchApp />} />
          <Route path="/QaPage" element={<QaPage />} />
          <Route path="/QaPage/:inquiryId" element={<QaDetail />} />
          <Route path="/mypage/*" element={<MyPageApp />} />
          <Route
            path="/education-content-page/:contentId"
            element={<EducationContentPage />}
          />
          <Route path="/create-content" element={<ContentApp />} />
        </Routes>
        <Footer />
      </Container>
    </RecoilRoot>
  );
}

export default App;
