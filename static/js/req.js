/*
 * @Description:
 * @Date: 2022-10-08 14:59:13
 * @LastEditors: ranqi
 * @LastEditTime: 2022-10-08 18:20:48
 */

function get_p1_r1() {
  return $http({
    url: "/p1/r1",
    method: "get",
  });
}
function get_p1_r2() {
  return $http({
    url: "/p1/r2",
    method: "get",
  });
}

function get_p1_r3() {
  return $http({
    url: "/p1/r3",
    method: "get",
  });
}

function getMap(code) {
  return $http({
    url: `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}`,
    method: "get",
  });
}
