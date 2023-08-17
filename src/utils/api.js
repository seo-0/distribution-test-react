//api 인스턴스 구현- 로그인모달.js에서 사용
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://13.209.49.229:8080/api/v1',
  
});

export default apiInstance;
