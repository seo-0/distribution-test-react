import { Outlet } from 'react-router-dom';
import "../styles/components/Footer.scss";

const Footer = () => {
    return(
        <div className="footer">
            <Outlet />
            <div className="footer-info">
                <div className="footer-left">
                    <ul>
                        <li>개인정보 처리방침</li>
                        <li>NO:ONE 소개</li>
                    </ul>
                    <ul>
                        <li>사업자 등록 번호 : 000-00-0000</li>
                        <li>대표자명 : 테크커넥션</li>
                        <li>주소 : 경기도 성남시 분당구 판교로</li>
                        <li>전화번호 : 070-1234-1234</li>
                        <li>이메일 : aaaa@likelion@org</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h1>NO:ONE</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer;