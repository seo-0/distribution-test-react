import { atom } from "recoil";

const userInfoState = atom({
  key: "userState",
  default: {
    name: "장현정",
    email: "jjanghj3624@gmail.com",
    points: 1000,
  },
});

// 가상의 게시글 데이터
const postsState = atom({
  key: "postsState",
  default: [
    {
      id: 1,
      company: "배달의 민족",
      title: "배달의 민족 어플로 배달 주문 시켜 먹는 방법",
      logo: "https://www.dailypop.kr/news/photo/201810/35546_58614_2549.jpg",
    },
    {
      id: 2,
      category: "SNS",
      company: "카카오톡",
      title: "카카오톡 어플을 다운받아 가족에게 메시지 보내기",
      logo: "https://mblogthumb-phinf.pstatic.net/MjAyMDA3MTRfMjI5/MDAxNTk0NzI5NzcyMDMz.X2YVWOeE6fwrOSnUiARthmNM9a4mfRnneetw1hTtyHIg.1Tqwf_4qgAqc1v3jE6xbzobcrV3X6yN8JVUVwjlRGkog.JPEG.xuni1021/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EB%A1%9C%EA%B3%A0-ai-3.jpg?type=w800",
    },
    {
      id: 3,
      category: "공공서비스",
      company: "국민은행",
      title: "공인 인증서 발급 받기",
      logo: "https://beautifulfund.org/wp-content/uploads/2017/09/fund_9_1.jpg",
    },
    {
      id: 4,
      category: "송금하기",
      company: "토스",
      title: "토스 어플 다운받아 카드 등록하기",
      deadline: "2023-08-10 23:00:00",
      logo: "https://mobiinsidecontent.s3.ap-northeast-2.amazonaws.com/kr/wp-content/uploads/2020/11/10114744/BI_L.png",
    },
  ],
});

export { userInfoState, postsState };
