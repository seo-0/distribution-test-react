import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpModalState } from "../../Data/state";
import "../../styles/LoginPage/SignUpModal.scss";
import axios from "axios";

function SignUpModal() {
  const [showModal, setShowModal] = useRecoilState(signUpModalState);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
    phone: "",
    cer: "", //인증번호
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [verificationCodeMatch, setVerificationCodeMatch] = useState(false);

  //서버에서 응답으로 주는 인증번호와 사용자가 입력한 인증번호를 비교
  const [serverVerificationCode, setServerVerificationCode] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    setPasswordMatch(credentials.password === credentials.passwordConfirm);
  }, [credentials]);

  // 인증번호 일치 여부 확인
  useEffect(() => {
    setVerificationCodeMatch(credentials.cer === serverVerificationCode);
  }, [credentials, serverVerificationCode]);

  const handlePhoneVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/api/v1/phone/send-one",
        {
          phone: credentials.phone,
        }
      );
      setServerVerificationCode(response.data.cer); // 서버에서 주는 응답의 필드 이름에 따라 다를 수 있음
      console.log(response.data);
      alert("인증번호가 전송되었습니다.");
    } catch (error) {
      alert("인증번호 전송에 실패했습니다.");
    }
  };
  const handleVerificationCodeCheck = async () => {
    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/api/v1/phone/check",
        {
          phone: credentials.phone,
          cer: credentials.cer,
        }
      );
      console.log("서버로부터의 응답:", response.data);

      if (response.data === "인증되었습니다") {
        setVerificationCodeMatch(true);
        alert("인증이 완료되었습니다.");
        console.log("인증 성공");
      } else {
        setVerificationCodeMatch(false);
        alert("잘못된 인증번호입니다.");
        console.log("인증 실패");
      }
    } catch (error) {
      alert("인증 과정 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 일치 여부 검사
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } //인증번호 일치 여부 검사
    if (!verificationCodeMatch) {
      alert("인증번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/api/v1/user/signup",
        credentials
      );
      // 응답을 처리하는 코드
      // console.log("성공적으로 회원가입이 완료되었습니다.:", response.data);
      alert("성공적으로 회원가입이 완료되었습니다.", response.data);
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받았으나, 2xx의 상태 코드를 받지 못한 경우
        alert(
          error.response.data.message ||
            "회원가입에 실패했습니다. 다시 시도하세요."
        );
        console.log(error);
        console.log(credentials);
      } else if (error.request) {
        // 요청을 보냈지만, 응답을 받지 못한 경우
        alert("서버로부터 응답이 없습니다. 다시 시도하세요.");
        console.log(credentials);
        console.error(error);
      } else {
        // 요청 설정 중 오류 발생 혹은 기타 어떠한 이유로 요청이 설정되지 않은 경우
        alert("요청을 보내는 중에 오류가 발생했습니다.");
      }
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-top">
          <button
            className="modal-close-button"
            onClick={() => setShowModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 51 51"
              fill="none"
            >
              <path
                d="M25.5 3.1875C13.0687 3.1875 3.1875 13.0687 3.1875 25.5C3.1875 37.9313 13.0687 47.8125 25.5 47.8125C37.9313 47.8125 47.8125 37.9313 47.8125 25.5C47.8125 13.0687 37.9313 3.1875 25.5 3.1875ZM25.5 44.625C14.9812 44.625 6.375 36.0187 6.375 25.5C6.375 14.9812 14.9812 6.375 25.5 6.375C36.0187 6.375 44.625 14.9812 44.625 25.5C44.625 36.0187 36.0187 44.625 25.5 44.625Z"
                fill="#D0D0D0"
              />
              <path
                d="M34.1062 36.6562L25.5 28.05L16.8938 36.6562L14.3438 34.1062L22.95 25.5L14.3438 16.8938L16.8938 14.3438L25.5 22.95L34.1062 14.3438L36.6562 16.8938L28.05 25.5L36.6562 34.1062L34.1062 36.6562Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          <h2>회원가입</h2>
        </div>
        <form className="modal-signup-form" onSubmit={handleSubmit}>
          <input
            type="name"
            name="name"
            placeholder="이름"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />
          {credentials.password && credentials.passwordConfirm ? (
            passwordMatch ? (
              <div style={{ color: "green", marginBottom: "10px" }}>
                ✓ 비밀번호가 일치합니다.
              </div>
            ) : (
              <div style={{ color: "red", marginBottom: "10px" }}>
                ✓ 비밀번호가 일치하지 않습니다.
              </div>
            )
          ) : null}

          {/*인증번호 확인 로직 구현 부분 */}
          <div className="phone-verification">
            <input
              type="tel"
              name="phone"
              placeholder="전화번호"
              onChange={handleChange}
            />
            <button type="button" onClick={handlePhoneVerification}>
              인증번호 받기
            </button>
          </div>

          <div className="verify">
            <input
              type="text"
              name="cer"
              placeholder="인증번호"
              onChange={handleChange}
            />
            <button
              className="verify-btn"
              type="button"
              onClick={handleVerificationCodeCheck}
            >
              인증번호 확인
            </button>
          </div>

          {verificationCodeMatch ? (
            <div style={{ color: "green" }}>인증이 완료되었습니다.</div>
          ) : (
            <div style={{ color: "red" }}>인증번호가 일치하지 않습니다.</div>
          )}

          <button className="signup-btn" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
