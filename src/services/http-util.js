import axios from 'axios';

// http://192.168.1.132:3001/api/v1/db/data/2013/07/2013/08

export default axios.create({
  baseURL: 'http://192.168.1.132:3001/api',
  headers: {
    'Content-type': 'application/json',
  },
});
