// 마이 페이지에서 광고 이벤트 배너 출력하는 컴포넌트
import styled from "styled-components";

const AdContainer = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 10px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 40px 0;
`;

const MyPageAd = () => {
  return (
    <AdContainer>
      <Img src="/img/1.png" alt="광고" />
    </AdContainer>
  );
};

export default MyPageAd;
