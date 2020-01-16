import axios from 'axios';

export default axios.create({
  baseURL: 'http://10.0.11.10:8080/'
});