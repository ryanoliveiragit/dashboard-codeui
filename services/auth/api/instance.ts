import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://codeui-api-prodction.up.railway.app/api/user', 
});

export default instance;