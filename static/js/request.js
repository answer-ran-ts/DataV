/*
 * @Description: 
 * @Date: 2022-10-08 14:59:13
 * @LastEditors: ranqi
 * @LastEditTime: 2022-10-08 18:19:10
 */
const $http = axios.create({
  baseURL: '/lbs/',
  timeout: 20000

})
$http.interceptors.request.use(
    config => {
      config.headers['Content-Type'] ="application/x-www-form-urlencoded";
      if(config.method == 'post'){
        config.data = qs.stringify(config.data);
      }
      return config;
    },
    error => {
      return Promise.reject(err);
    }
);
$http.interceptors.response.use(
    response => {
      const res = response.data;
      return Promise.resolve(res);
    },
    error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
)
