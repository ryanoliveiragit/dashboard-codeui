import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://codeui-api-development.up.railway.app/api/user', 
});

export default instance;