/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'

// 超时时间
axios.defaults.timeout = 60000;
// axios.defaults.withCredentials=true;

export default axios;
