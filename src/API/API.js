import Axios from "axios";

let http = Axios.create({
    timeout: 3000,   //超时配置 3秒
    responseType: 'json',   // 响应数据格式
    responseEncoding: 'utf8',  // 响应数据编码
});

export default http;