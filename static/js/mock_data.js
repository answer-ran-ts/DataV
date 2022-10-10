/*
 * @Description:
 * @Date: 2022-10-08 15:17:11
 * @LastEditors: ranqi
 * @LastEditTime: 2022-10-09 10:47:37
 */

var Random = Mock.Random;
//大屏
const out_data_t = [
  {
    url: "/p1/r1",
    method: "get",
    data: {
      responseData: {
        datax: ["测试001", "测试002", "测试003", "测试004","测试005","测试006"],
        datay1: [100, 51, 43, 43, 48, 15],
        datay2: [28, 39, 36, 36, 31, 21],
      },
      responseCode: "0",
    },
  },
  {
    url: "/p1/r2",
    method: "get",
    data: {
      responseData: {
        datax: ["测试001", "测试002", "测试003", "测试004", "测试005"],
        datay: ["200", "100", "300", "400", "200"],
        RETURN_KEY: "RETURN_SUCCESS",
      },
    },
  },
  {
    url: "/p1/r3",
    method: "get",
    data: {
      responseData: {
        datax:  ["测试001", "测试002", "测试003", "测试004","测试005","测试006","测试007"],
        datay: [100, 200, 300, 400, 300, 200, 100],
        RETURN_KEY: "RETURN_SUCCESS",
      },
    },
  },
 
];

for (let m of out_data_t) {
  Mock.mock(RegExp(".*" + m.url + ".*"), m.data);
}
