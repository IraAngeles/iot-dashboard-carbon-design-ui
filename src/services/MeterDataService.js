import http from './http-util';

// http://192.168.1.132:3001/api/v1/db/data/2013/07/2013/08

const getAll = () => {
  return http.get('/v1/db/alldata');
};

const getByYearMonth = params => {
  // /v1/db/2013/7/1/2013/7/31
  console.log('===' + params);
  return http.get(params);
  // return http.get("/v1/db/data/2013/07/01/2013/07/31");
  // return http.get("/v1/db/data/2013/07/2013/08");
};

export default {
  getAll,
  getByYearMonth,
};
