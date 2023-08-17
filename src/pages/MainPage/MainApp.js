import MainAd from "./MainAd";
import MainSearchBox from "./MainSearchBox";
import MainRanking from "./MainRanking";
import MainEdu from "./MainEdu";
import styled from "styled-components";
import { RecoilRoot } from "recoil";

const MainPageContainer = styled.div`
  width: 100%;
  max-width: 1064px;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MainApp = () => {
  return (
    <MainPageContainer>
      <MainAd />
      <MainSearchBox />
      <MainRanking />
      <RecoilRoot>
        <MainEdu />
      </RecoilRoot>
    </MainPageContainer>
  );
};

export default MainApp;
