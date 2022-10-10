function randomWord() {
  var str = '',
      range = 10,
      arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  // 随机产生
  //range = Math.round(Math.random() * 4) + 5;
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
//格式化时间
 function formatTime(time) {
  let newTime = ''
  let year = time.substring(0, 4)
  let month = time.substring(4)
  newTime = year + '-' + month
  return newTime
}

//截取汉字
function cut_string(str, len = 2) {
  if (!str) return ''
  return str.substring(0, len)
}
//批量截取汉字
function cut_arr_str(arr, len = 2) {
  let t = []
  for (let a of arr) {
    t.push(a.substring(0, len))
  }
  return t
}
function isString(str){
    return str instanceof String || typeof str=='string';
}
//是否是数字
function isNumber(val) {
    if (parseFloat(val).toString() == "NaN") {
        return false;
    } else {
        return true;
    }
}
function in_array(par,arr) {
    if(!Array.isArray(arr)) return false;
    let ind = arr.findIndex((v)=>{
        return v == par;
    })
    if(ind != -1){
        return true
    }else{
        return false;
    }

}
function num_f(num){
    return isNumber(num) ? num : '--';
}
// 传 type == 10 暂无数据
// 传 type == 1  常规数字  加单位
// 传 type == 23  百分数  直接拼接百分号
// 传 type == 21 百分数  保留一位   拼接百分号
// 传 type == 22 百分数  保留两位   拼接百分号
// 传 type == 41 大数加工加单位并保留一位小数
// 传 type == 42 大数加工加单位并保留两位小数
function num_b(num, type = 1, unit_c = 'num_sp') {
    let t = 0
    let unit = ''
    if (num == '--' || num === '' || num == null) return '--'
    if (type == 1) {
        if (unit_c) {
            t = num_unit(num, unit_c)
        } else {
            let c = num_t(num)
            t = c[0] + c[1]
        }
    }else if(type == 11) {

      let c = num_t(num)
      t = c[0] + c[1]

  }else if(type == 3){
        t = filter_q(num)
    } else if (type == 2) {
        t = num;
        unit = '%'
    }else if (type == 23) {
        t = (Math.round(num * 1000) / 10).toFixed(1)
        unit = '%'
    } else if (type == 200) {
        t = (Math.round(num * 1000) / 10).toFixed(2)
        unit = '%'
    } else if (type == 21) {
        t = (Math.round(num * 10) / 10).toFixed(1)
        unit = '%'
    } else if (type == 22) {
        t = (Math.round(num * 100) / 100).toFixed(2)
        unit = '%'
    } else if (type == 10) {
        t = num;
    } else if (type == 41) {
        //保留一位小数
        let c = num_t(num * 10)
        t = (c[0] / 10).toFixed(1)
        unit = c[1]
    } else if (type == 42) {
        //保留一位小数
        let c = num_t(num * 10)
        t = (c[0] / 10).toFixed(2)
        unit = c[1]
    }
    return t + unit
}

//数字带单位
 function num_unit(num, unit_class = '') {
    let n = num_t(num)
    return n[0] + "<span class='" + unit_class + "'>" + n[1] + '</span>'
}

//数字单位加工    需要调用  filter_q()    返回一个数组[数字，单位]
 function num_t(vt) {
    let unit = ''
    let t = 0
    let abs_v = Math.abs(vt)
    if (abs_v < 10000 && abs_v > 1000) {
        t = filter_q(vt)
    } else if (abs_v < 100000000 && abs_v >= 10000) {
        t = Math.round(vt / 1000) / 10
        t = t.toFixed(1);
        t = filter_q(t)
        unit = ' 万'
    } else if (abs_v >= 1000000000000) {
        t = (Math.round((vt / 1000000000000) * 10) / 10).toFixed(1)
        unit = ' 万亿'
    } else if (abs_v >= 100000000000) {
        t = (Math.round((vt / 100000000000) * 10) / 10).toFixed(1)
        unit = ' 千亿'
    } else if (abs_v >= 100000000) {
        t = (Math.round((vt / 100000000) * 10) / 10).toFixed(1)
        unit = ' 亿'
    } else {
        t = vt
    }
    return [t, unit]
}

 function filter_q(num) {
    return (num || 0).toString().replace(/\d+/, function(n) {
        var len = n.length
        if (len % 3 === 0) {
            return n.replace(/(\d{3})/g, ',$1').slice(1)
        } else {
            return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1')
        }
    })
}
 function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function back_gridId(tid){
    let d = {1:999,24:580,4:573,7:576,8:577,25:570,3:572,10:579,9:578,2:571,6:575,5:574,54:5761,52:5756,50:5755,48:5753,81:5786,83:5798,21401:5804,5713:5713,20:5746,35:5733,5718:5718,30:5721,95:5701,19:5749,5719:5719,637585631251437:'571A',637585649304126:'571D',96:5703,5716:5716,49:5752,10102044:'577A',75:5784,10102046:'577B',79:5785,14:5742,11:'574C',28:5724,86:5791,77:5788,17:5745,13:5741,36:5734,33:5736,26:5725,29:5723,637585643776062:'571C',97:5705,37:5732,18:5747,82:5797,60:5766,89:5792,78:5787,21399:5802,21400:5803,5712:5712,18078:5777,18073:5774,18074:5779,186:5731,32:5735,47:5751,15:5743,12:5748,18076:5776,18071:5771,18077:5775,18072:5772,57:5767,51:5754,76:5783,80:5789,90:5796,56:5762,61:5764,27:5722,5717:5717,99:5706,58:5768,5714:5714,21398:5801,84:5799,74:5782,637585637870581:'571B',28063:'578B',85:5793,88:5795,53:5763,87:5794,100:5702,98:5704,73:5781,16:5744,5711:5711,5715:5715,18075:5773,59:5765,5770201:5778,55:5769}
    return  d[tid]? d[tid]:tid;
}



//生成弧线
function tool_hx(lng_start,lng_end,count=40,ctype = 'left'){
  var start = {"lng":lng_start[0],"lat":lng_start[1]};
  var end = {"lng":lng_end[0],"lat":lng_end[1]};
  var options = {};
  options.ctype = ctype;
  options.count = count;
  let t = getCurvePoints([start,end],options);
  let t2 = t.map((v)=>{
    return v[0]+','+v[1];
  })
  return t2;
}

function getCurvePoints(points, options) {
  options = options || {};
  var curvePoints = [];
  for (var i = 0; i < points.length - 1; i++) {
    var p = getCurveByTwoPoints(points[i], points[i + 1], options.count,options.ctype);
    if (p && p.length > 0) {
      curvePoints = curvePoints.concat(p);
    }
  }
  return curvePoints;
}

function getCurveByTwoPoints(obj1, obj2, count,type='left') {
  if (!obj1 || !obj2) {
    return null;
  }

  var B1 = function B1(x) {
    return 1 - 2 * x + x * x;
  };
  var B2 = function B2(x) {
    return 2 * x - 2 * x * x;
  };
  var B3 = function B3(x) {
    return x * x;
  };

  var curveCoordinates = [];

  var count = count || 40; // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
  var isFuture = false;
  var t, h, h2, lat3, lng3, j, t2;
  var LnArray = [];
  var i = 0;
  var inc = 0;

  if (typeof obj2 == "undefined") {
    if (typeof curveCoordinates != "undefined") {
      curveCoordinates = [];
    }
    return;
  }

  var lat1 = parseFloat(obj1.lat);
  var lat2 = parseFloat(obj2.lat);
  var lng1 = parseFloat(obj1.lng);
  var lng2 = parseFloat(obj2.lng);

  // 计算曲线角度的方法
  if (lng2 > lng1) {
    if (parseFloat(lng2 - lng1) > 180) {
      if (lng1 < 0) {
        lng1 = parseFloat(180 + 180 + lng1);
        lng2 = parseFloat(180 + 180 + lng2);
      }
    }
  }
  // 此时纠正了 lng1 lng2
  j = 0;
  t2 = 0;
  // 纬度相同
  if (lat2 == lat1) {
    t = 0;
    h = lng1 - lng2;
    // 经度相同
  } else if (lng2 == lng1) {
    t = Math.PI / 2;
    h = lat1 - lat2;
  } else {
    t = type == 'right' ? Math.atan((lat2 + lat1) / (lng2 + lng1)) : Math.atan((lat2 - lat1) / (lng2 - lng1));
    h = (lat2 - lat1) / Math.sin(t);
  }
  if (t2 == 0) {
    t2 = t + Math.PI / 5;
  }
  h2 = h / 2;
  lng3 = h2 * Math.cos(t2) + lng1;
  lat3 = h2 * Math.sin(t2) + lat1;

  for (i = 0; i < count + 1; i++) {
    var x = lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc);
    var y = lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc);
    var lng1_src = obj1.lng;
    var lng2_src = obj2.lng;

    curveCoordinates.push([lng1_src < 0 && lng2_src > 0 ? x - 360 : x, y]);
    inc = inc + 1 / count;
  }
  return curveCoordinates;
}
