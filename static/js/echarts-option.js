function echarts_bar2(data) {
  let option = {
    color: ["#0C65F6", "#00BFF3"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#15ecf4",
        },
      },
      backgroundColor: "rgba(0,0,0,.8)",
      extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "10%",
      top: "20%",
      containLabel: true,
    },
    legend: {
      icon: "rect",
      orient: "horizontal",
      left: "right",
      itemWidth: 12,
      itemHeight: 12,
      formatter: ["{a|{name}}"].join("\n"),
      textStyle: {
        fontSize: 12,
        color: "#6A93B9",
        height: 8,
        rich: {
          a: {
            verticalAlign: "bottom",
          },
        },
      },
      data: ["已完成", "未完成"],
    },
    xAxis: {
      type: "category",
      data: data.datax,
      axisLine: {
        lineStyle: {
          color: "#3C9AEA",
        },
      },
      axisLabel: {
        fontSize: 12,
        color: "#6A93B9",
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        minInterval: 1,
        splitArea: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(60, 154, 234, 0.2)",
            type: "dotted",
          },
        },
        axisLabel: {
          fontSize: 12,
          color: "#6A93B9",
          fontFamily: "Bebas",
        },
      },
      {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          formatter: "{value}%", // 右侧Y轴文字显示
          fontFamily: "Bebas",
          color: "#6A93B9",
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 10,
        itemStyle: { barBorderRadius: [15, 15, 0, 0] },
        name: "已完成",
        data: data.datay1,
      },
      {
        type: "bar",
        barWidth: 10,
        itemStyle: { barBorderRadius: [15, 15, 0, 0] },
        name: "未完成",
        data: data.datay2,
      },
    ],
  };
  return option;
}
// 渐变
function echarts_legend(data) {
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#15ecf4",
        },
      },
      backgroundColor: "rgba(0,0,0,.8)",
      extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
    },
    grid: {
      right: "5%",
      top: "20%",
      left: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: data.datax,
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        //	margin:15,
        textStyle: {
          color: "#6A93B9",
          fontStyle: "normal",
          fontSize: 12,
        },
      },
      axisTick: {
        //坐标轴刻度相关设置。
        show: false,
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: "#3C9AEA",
        },
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false,
      },
    },
    yAxis: [
      {
        name: "单位（次）",
        nameTextStyle: {
          color: "#6A93B9",
          padding: [20, 20, 20, 0],
        },
        type: "value",
        splitNumber: 3,
        axisLabel: {
          textStyle: {
            color: "#6A93B9",
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(60, 154, 234, 0.2)",
            type: "dotted",
          },
        },
      },
    ],
    series: [
      {
        name: "正常",
        type: "pictorialBar",
        // barWidth: "120%",
        barCategoryGap: "12%",
        stack: "数量",
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#6A93B9",
              fontSize: 12,
            },
          },
        },
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(60, 154, 234, 1)", // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: "rgba(60, 154, 234, 0.1)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            }, //渐变颜色
          },
        },
        symbol:
          "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

        data: data.datay,
      },
    ],
  };
  return option;
}
// 立方柱状图
function echarts_cube(data) {
  const offsetX = 10;
  const offsetY = 5;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      // console.log(shape);
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape("CubeLeft", CubeLeft);
  echarts.graphic.registerShape("CubeRight", CubeRight);
  echarts.graphic.registerShape("CubeTop", CubeTop);

  const VALUE = data.datay;

  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#6A93B9",
        },
      },
      backgroundColor: "rgba(0,0,0,.8)",
      extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
      formatter: function (params, ticket, callback) {
        const item = params[1];
        return item.name + " : " + item.value;
      },
    },
    grid: {
      right: "5%",
      top: "20%",
      left: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.datax,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "#6A93B9",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
        lineStyle: {
          width: 2,
          color: "#6A93B9",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(60, 154, 234, 0.2)",
          type: "dotted",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#6A93B9",
          fontStyle: "normal",
          fontSize: 12,
        },
      },
      // boundaryGap: ['20%', '20%'],
    },
    series: [
      {
        type: "custom",
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#33BCEB",
                    },
                    {
                      offset: 1,
                      color: "#337CEB",
                    },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#28A2CE",
                    },
                    {
                      offset: 1,
                      color: "#1A57B7",
                    },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#43C4F1",
                    },
                    {
                      offset: 1,
                      color: "#28A2CE",
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: VALUE,
      },
      {
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: (e) => {
              return e.value + "次";
              /*console.log(e)
              switch (e.name) {
                  case '1001':
                      return e.value;
                  case '1002':
                      return VALUE[1];
                  case '1003':
                      return VALUE[2];
              }*/
            },
            fontSize: 12,
            color: "#43C4F1",
            offset: [0, -25],
          },
        },
        itemStyle: {
          color: "transparent",
        },
        tooltip: {},
        data: VALUE,
      },
    ],
  };
  return option;
}
// 雷达图
function echarts_radar(data) {
  var dataTime = [
    "杭州市",
    "宁波市",
    "温州市",
    "嘉兴市",
    "湖州市",
    "绍兴市",
    "金华市",
    "衢州市",
    "舟山市",
    "台州市",
    "丽水市",
  ];

  var dataname = [
    "测试001",
    "测试002",
    "测试003",
    "测试004",
    "测试005",
    "测试006",
    "测试007",
    "测试008",
    "测试009",
  ];
  var datamax = [20, 20, 20, 20, 20, 20, 20, 20, 20];
  var datavaule = [
    { name: "测试001", value: "20" },
    { name: "测试002", value: "16" },
    { name: "测试003", value: "20" },
    { name: "测试004", value: "15" },
    { name: "测试005", value: "12" },
    { name: "测试006", value: "18" },
    { name: "测试007", value: "15" },
    { name: "测试008", value: "17" },
    { name: "测试009", value: "16" },
  ];
  var datavaule2 = [
    { name: "测试001", value: "15" },
    { name: "测试002", value: "14" },
    { name: "测试003", value: "13" },
    { name: "测试004", value: "14" },
    { name: "测试005", value: "14" },
    { name: "测试006", value: "18" },
    { name: "测试007", value: "12" },
    { name: "测试008", value: "13" },
    { name: "测试009", value: "14" },
  ];

  let indicator = [];
  for (let i = 0; i < dataname.length; i++) {
    indicator.push({
      name: dataname[i],
      max: datamax[i],
    });
  }
  function contains(arrays, obj) {
    let i = arrays.length;
    while (i--) {
      if (arrays[i] === obj) {
        return i;
      }
    }
    return false;
  }

  var buildSeries = function (data) {
    var helper = data.map((item, index) => {
      var arr = new Array(data.length);
      arr.splice(index, 1, item);
      return arr;
    });

    return [data, ...helper].map((item, index) => {
      return {
        type: "radar",
        name: "分指数分析",
        // 折线拐点标志样式
        itemStyle: {
          opacity: index === 0 ? "#01B7D8" : 0,
          color: index === 0 ? "#01B7D8" : "transparent",
        },
        // 线条样式
        lineStyle: {
          color: index === 0 ? "#01B7D8" : "transparent",
        },
        // 区域填充样式
        // areaStyle: {
        //     color: index === 0 ? '#01B7D8' : 'transparent',
        //     opacity: 0.6
        // },
        // 提示框内容
        tooltip: {
          backgroundColor: "rgba(0,0,0,.8)",
          extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
          confine: true, // 提示框显示在canvas以内
          show: index === 0 ? false : true,
          formatter: function () {
            return (
              indicator[index - 1].name +
              "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#01B7D8'></span>" +
              "分指数分析 : " +
              data[index - 1]
            );
          },
        },
        z: index === 0 ? 1 : 2,
        data: [item],
      };
    });
  };

  var buildSeries2 = function (data) {
    var helper = data.map((item, index) => {
      var arr = new Array(data.length);
      arr.splice(index, 1, item);
      return arr;
    });

    return [data, ...helper].map((item, index) => {
      return {
        type: "radar",
        name: "关联指数分析",
        // 折线拐点标志样式
        itemStyle: {
          opacity: index === 0 ? "#F7DA6D" : 0,
          color: index === 0 ? "#F7DA6D" : "transparent",
        },
        // 线条样式
        lineStyle: {
          color: index === 0 ? "#F7DA6D" : "transparent",
        },
        // 区域填充样式
        // areaStyle: {
        //     color: index === 0 ? '#F7DA6D' : 'transparent',
        //     opacity: 0.6
        // },
        // 提示框内容
        tooltip: {
          backgroundColor: "rgba(0,0,0,.8)",
          extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
          confine: true, // 提示框显示在canvas以内
          show: index === 0 ? false : true,
          formatter: function () {
            return (
              indicator[index - 1].name +
              "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#F7DA6D'></span>" +
              "关联指数分析 : " +
              data[index - 1]
            );
          },
        },
        z: index === 0 ? 1 : 2,
        data: [item],
      };
    });
  };

  let option = {
    tooltip: {
      show: false,
      trigger: "item",
    },
    radar: {
      indicator: indicator,
      center: ["50%", "50%"],
      radius: "65%",
      startAngle: 240,
      splitNumber: 5,
      splitArea: {
        areaStyle: {
          color: [
            "rgba(1, 183, 216, 0.1)",
            "rgba(1, 183, 216, 0.2)",
            "rgba(1, 183, 216, 0.4)",
            "rgba(1, 183, 216, 0.6)",
            "rgba(1, 183, 216, 0.8)",
            "rgba(1, 183, 216, 1)",
          ].reverse(),
        },
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "transparent",
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "transparent",
        },
      },
      name: {
        formatter: function (value) {
          let i = contains(dataname, value);
          let percent = datavaule[i];
          let ret = ""; //拼接加\n返回的类目项
          let maxLength = 6; //每项显示文字个数
          let valLength = value.length; //X轴类目项的文字个数
          let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于6,
            let temp = ""; //每次截取的字符串
            let start = 0; //开始截取的位置
            let end = maxLength; //结束截取的位置
            temp =
              value.substring(start, end) +
              "\n" +
              value.substring(end, valLength);
            ret += temp; //凭借最终的字符串
            // return '{a|' + percent + '}\n' + '{b|' + ret + '}'
            return "{b|" + ret + "}";
          } else {
            // return '{a|' + percent + '}\n' + '{b|' + value + '}'
            return "{b|" + value + "}";
          }
        },
        textStyle: {
          rich: {
            a: {
              color: "#6A93B9",
              fontSize: 12,
              padding: [0, 0],
              // lineHeight: 20,
            },
            b: {
              color: "#CAEEFF",
              fontSize: 12,
              padding: [0, 0],
              // lineHeight: 20,
            },
          },
        },
      },
    },
    series: [
      ...buildSeries(datavaule.map((item) => item.value)),
      ...buildSeries2(datavaule2.map((item) => item.value)),
    ],
  };

  return option;
}
// 折线图
function echarts_horizontal() {
  // 统计百分比
  var data1 = [14, 15, 65, 24, 75, 23, 24, 43, 27, 72, 12, 53];
  var data2 = [45, 65, 24, 74, 75, 23, 42, 54, 13, 32, 52, 13];
  var json = {
    chart0: {
      xcategory: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      low: data1,
      lowLine: [],
    },
  };
  var json2 = {
    chart0: {
      xcategory: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      low: data2,
      lowLine: [],
    },
  };
  var datacoords = [
    {
      coords: [],
    },
  ];
  var datacoords2 = [
    {
      coords: [],
    },
  ];
  for (var i = 0; i < json.chart0.xcategory.length; i++) {
    datacoords[0].coords.push([json.chart0.xcategory[i], data1[i]]);
  }
  for (var i = 0; i < json.chart0.xcategory.length; i++) {
    datacoords2[0].coords.push([json2.chart0.xcategory[i], data2[i]]);
  }

  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#6A93B9",
        },
      },
      backgroundColor: "rgba(0,0,0,.8)",
      extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
      formatter: function (params) {
        var result = params[0].name + "<br>";
        params.forEach(function (item) {
          result +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
            item.color +
            '"></span>';
          // 判断设置增长还是降低
          if (parseFloat(item.data) >= 50) {
            result +=
              item.seriesName +
              ": " +
              '<span class="growth">增长' +
              item.data +
              "%</span><br>";
          } else if (parseFloat(item.data) < 50) {
            result +=
              item.seriesName +
              ": " +
              '<span class="reduce">降低' +
              item.data +
              "%</span><br>";
          }
        });
        return result;
      },
    },
    legend: {
      data: ["同比", "环比"],
      textStyle: {
        fontSize: 12,
        color: "#6A93B9",
      },
      top: "5%",
      right: "5%",
    },
    grid: {
      bottom: 50,
      left: 70,
      right: 50,
    },
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6A93B9",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      max: 100,
      splitNumber: 4,
      interval: 25,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(60, 154, 234, 0.2)",
          type: "dotted",
        },
      },
      axisLabel: {
        formatter: "{value} %",
        textStyle: {
          //改变刻度字体样式
          color: "#6A93B9",
        },
      },
    },
    series: [
      {
        name: "环比",
        type: "line",
        // smooth: true,
        symbol: "none",
        symbolSize: 10,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(255, 204,1, .9)",
                },
                {
                  offset: 0.8,
                  color: "rgba(6, 8, 41,.1)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: "#ffcb00",
          },
        },
        data: data1,
      },
      {
        name: "环比",
        type: "lines",
        coordinateSystem: "cartesian2d",
        zlevel: 1,
        polyline: true,
        smooth: true,
        symbol: "circle",
        effect: {
          show: true,
          trailLength: 0.4,
          symbol: "circle",
          period: 8, //光点滑动速度
          symbolSize: 8,
        },
        lineStyle: {
          normal: {
            color: "#ffcb00",
            width: 0,
            opacity: 0,
            curveness: 0,
          },
        },
        data: datacoords,
      },
      {
        name: "同比",
        type: "line",
        // smooth: true,
        symbol: "none",
        symbolSize: 10,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(21, 250, 255,.9)",
                },
                {
                  offset: 0.8,
                  color: "rgba(6, 8, 41,.1)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: "#15faff",
          },
        },
        data: data2,
      },
      {
        name: "同比",
        type: "lines",
        coordinateSystem: "cartesian2d",
        zlevel: 1,
        smooth: true,
        polyline: true,
        symbol: "circle",
        effect: {
          show: true,
          trailLength: 0.4,
          symbol: "circle",
          period: 8, //光点滑动速度
          symbolSize: 8,
        },
        lineStyle: {
          normal: {
            color: "#15faff",
            width: 0,
            opacity: 0,
            curveness: 0,
          },
        },
        data: datacoords2,
      },
    ],
  };

  return option;
}
function echarts_dot() {
  // Generate data
  var category = [];
  var dottedBase = +new Date();
  var lineData = [];
  var barData = [];

  for (var i = 0; i < 20; i++) {
    var date = new Date((dottedBase += 1000 * 3600 * 24));
    category.push(
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
    );
    var b = Math.random() * 200;
    var d = Math.random() * 200;
    barData.push(b);
    lineData.push(d + b);
  }
  // option
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
          backgroundColor: "#333",
        },
      },
    },
    legend: {
      data: ["line", "bar"],
      textStyle: {
        color: "#6A93B9",
      },
    },
    xAxis: {
      data: category,
      axisLine: {
        lineStyle: {
          color: "#6A93B9",
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: "rgba(60, 154, 234, 0.2)",
          type: "dotted",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
    },
    series: [
      {
        name: "line",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 15,
        data: lineData,
      },
      {
        name: "bar",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#14c8d4" },
              { offset: 1, color: "#43eec6" },
            ]),
          },
        },
        data: barData,
      },
      {
        name: "line",
        type: "bar",
        barGap: "-100%",
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(20,200,212,0.5)" },
              { offset: 0.2, color: "rgba(20,200,212,0.2)" },
              { offset: 1, color: "rgba(20,200,212,0)" },
            ]),
          },
        },
        z: -12,
        data: lineData,
      },
      {
        name: "dotted",
        type: "pictorialBar",
        symbol: "rect",
        itemStyle: {
          normal: {
            color: "#0f375f",
          },
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: lineData,
      },
    ],
  };
  return option;
}
// 饼图
function echarts_bin() {
  var scaleData = [
    {
      name: "测试001",
      value: 10,
    },
    {
      name: "测试002",
      value: 10,
    },
    {
      name: "测试003",
      value: 10,
    },
    {
      name: "测试004",
      value: 10,
    },
    {
      name: "测试005",
      value: 10,
    },
    {
      name: "测试006",
      value: 10,
    },
  ];
  var rich = {
    white: {
      color: "#6A93B9",
      align: "center",
      padding: [3, 0],
    },
  };
  var placeHolderStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      color: "rgba(0, 0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0)",
      borderWidth: 0,
    },
  };
  var data = [];
  var color = [
    "#00ffff",
    "#00cfff",
    "#006ced",
    "#ffe000",
    "#ffa800",
    "#ff5b00",
    "#ff3000",
  ];
  for (var i = 0; i < scaleData.length; i++) {
    data.push(
      {
        value: scaleData[i].value,
        name: scaleData[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      {
        value: 2,
        name: "",
        itemStyle: placeHolderStyle,
      }
    );
  }
  var seriesObj = [
    {
      type: "pie",
      clockWise: false,
      radius: [90, 90],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "outside",
            color: "#6A93B9",
            formatter: function (params) {
              var percent = 0;
              var total = 0;
              for (var i = 0; i < scaleData.length; i++) {
                total += scaleData[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== "") {
                return params.name + "\n{white|" + "占比" + percent + "%}";
              } else {
                return "";
              }
            },
            rich: rich,
          },
          labelLine: {
            length: 30,
            length2: 40,
            show: true,
            color: "#00ffff",
          },
        },
      },
      data: data,
    },
  ];
  let option = {
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: seriesObj,
  };

  return option;
}

// 3d地图
function echarts_map(data) {
  const { geoJson, location, path } = data;
  echarts.registerMap("zhejiang", geoJson);
  let option = {
    geo: {
      map: "zhejiang",
      aspectScale: 0.75, //长宽比
      zoom: 1.1,
      roam: false,
      itemStyle: {
        normal: {
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "#09132c", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#274d68", // 100% 处的颜色
              },
            ],
            globalCoord: true, // 缺省为 false
          },
          shadowColor: "rgb(58,115,192)",
          shadowOffsetX: 10,
          shadowOffsetY: 11,
        },
        emphasis: {
          areaColor: "#2AB8FF",
          borderWidth: 0,
          color: "green",
          label: {
            show: false,
          },
        },
      },
    },
    series: [
      {
        type: "map",
        roam: false,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#6A93B9",
              fontSize: 16,
            },
          },
          emphasis: {
            textStyle: {
              color: "#6A93B9",
            },
          },
        },

        itemStyle: {
          normal: {
            borderColor: "rgb(147, 235, 248)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "#09132c", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#274d68", // 100% 处的颜色
                },
              ],
              globalCoord: true, // 缺省为 false
            },
          },
          emphasis: {
            areaColor: "rgb(46,229,206)",
            //    shadowColor: 'rgb(12,25,50)',
            borderWidth: 0.1,
          },
        },
        zoom: 1.1,
        //     roam: false,
        map: "zhejiang", //使用
        // data: this.difficultData //热力图数据   不同区域 不同的底色
      },
      // {
      //   name: "originMarker",
      //   type: "scatter",
      //   coordinateSystem: "geo",
      //   symbol: "image://" + require("../img/btn.png"),
      //   symbolSize: [158, 78],
      //   symbolOffset: ["-50%", "-50%"],
      //   data: [
      //     {
      //       name: "测试",
      //       value: [[120.16922, 30.24255], [121.55106, 29.85977], 100],
      //       label: {
      //         show: true,
      //         formatter: () => {
      //           return "测试" + " " + 100;
      //         },
      //         color: "#FFF",
      //         fontSize: 20,
      //         position: [20, 10],
      //       },
      //     },
      //   ],
      // },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        showEffectOn: "render",
        zlevel: 1,
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: "fill",
        },
        hoverAnimation: true,
        // label: {
        //   normal: {
        //     formatter: "{b}",
        //     position: "right",
        //     offset: [15, 0],
        //     color: "#1DE9B6",
        //     show: true,
        //   },
        // },
        // itemStyle: {
        //   normal: {
        //     color: "#1DE9B6",
        //     shadowBlur: 10,
        //     shadowColor: "#333",
        //   },
        // },
        // symbolSize: 12,
        data: location,
      }, //地图线的动画效果
      {
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 7, //图标大小
        },
        lineStyle: {
          normal: {
            color: "#1DE9B6",
            width: 1, //线条宽度
            opacity: 0.1, //尾迹线条透明度
            curveness: 0.3, //尾迹线条曲直度
          },
        },
        data: path,
      },
    ],
  };
  return option;
  // });
}
