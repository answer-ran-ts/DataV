const scale = {
  width: "1",
  height: "1",
};
// * 设计稿尺寸（px）
const baseWidth = 1920;
const baseHeight = 1080;
// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
var app = new Vue({
  el: "#app",
  data: {
    drawTiming: null,
    backStatus: false,
    loading:true,
    time: null,
    mapStack: [],
    parentId: "330000_full",
    path: [
      {
        coords: [
          [120.16922, 30.24255],
          [121.55106, 29.85977],
        ],
        lineStyle: { color: "#4ab2e5" },
      },
      {
        coords: [
          [120.16922, 30.24255],
          [120.65505, 28.01489],
        ],
        lineStyle: { color: "#4fb6d2" },
      },
      {
        coords: [
          [120.12548, 30.85752],
          [120.65505, 28.01489],
        ],
        lineStyle: { color: "#52b9c7" },
      },
      {
        coords: [
          [120.5819, 29.98895],
          [120.65505, 28.01489],
        ],
        lineStyle: { color: "#5abead" },
      },
      {
        coords: [
          [119.57135, 29.09521],
          [121.55106, 29.85977],
        ],
        lineStyle: { color: "#f34e2b" },
      },
      {
        coords: [
          [119.9127, 28.44583],
          [121.55106, 29.85977],
        ],
        lineStyle: { color: "#f56321" },
      },
      {
        coords: [
          [120.65505, 28.01489],
          [120.65505, 28.01489],
        ],
        lineStyle: { color: "#96cc34" },
      },
    ],
    location: [
      {
        value: [120.16922, 30.24255],
        itemStyle: { color: "#4ab2e5" },
      } /* 杭州 */,
      {
        value: [121.55106, 29.85977],
        itemStyle: { color: "#4fb6d2" },
      } /* 宁波 */,
      {
        value: [120.12548, 30.85752],
        itemStyle: { color: "#52b9c7" },
      } /* 湖州 */,
      {
        value: [120.5819, 29.98895],
        itemStyle: { color: "#5abead" },
      } /* 绍兴 */,
      {
        value: [119.57135, 29.09521],
        itemStyle: { color: "#f34e2b" },
      } /* 金华 */,
      {
        value: [119.9127, 28.44583],
        itemStyle: { color: "#f56321" },
      } /* 丽水 */,
      {
        value: [120.65505, 28.01489],
        itemStyle: { color: "#96cc34" },
      } /* 温州 */,
    ],
    mapType: 0,
    dom_e_list: [null, null, null, null, null, null, null, null],
    echartsType: new Map([
      ["echarts_e1", 0],
      ["echarts_e2", 1],
      ["echarts_e3", 2],
      ["echarts_e4", 3],
      ["echarts_e5", 4],
      ["echarts_e6", 5],
      ["echarts_e7", 6],
      ["echarts_e8", 7],
    ]),
  },
  methods: {
    calcRate() {
      const fullScreenRef = this.$refs.fullScreenRef;
      if (!fullScreenRef) return;
      // 当前宽高比
      const currentRate = parseFloat(
        (window.innerWidth / window.innerHeight).toFixed(5)
      );
      if (fullScreenRef) {
        scale.width = (window.innerWidth / baseWidth).toFixed(5);
        scale.height = (window.innerHeight / baseHeight).toFixed(5);
        fullScreenRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
        if (currentRate > baseProportion) {
          // 表示更宽
          scale.width = (
            (window.innerHeight * baseProportion) /
            baseWidth
          ).toFixed(5);
          scale.height = (window.innerHeight / baseHeight).toFixed(5);
          fullScreenRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
        } else {
          // 表示更高
          scale.height = (
            window.innerWidth /
            baseProportion /
            baseHeight
          ).toFixed(5);
          scale.width = (window.innerWidth / baseWidth).toFixed(5);
          fullScreenRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
        }
      }
    },
    resize() {
      clearTimeout(this.drawTiming);
      this.drawTiming = setTimeout(() => {
        this.calcRate();
      }, 200);
    },
    formatTime(time, fmt) {
      if (!time) return "";
      else {
        const date = new Date(time);
        const o = {
          "M+": date.getMonth() + 1,
          "d+": date.getDate(),
          "H+": date.getHours(),
          "m+": date.getMinutes(),
          "s+": date.getSeconds(),
          "q+": Math.floor((date.getMonth() + 3) / 3),
          S: date.getMilliseconds(),
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (const k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      }
    },
    getNowData() {
      var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var dateDay = this.formatTime(new Date(), "HH: mm: ss");
      var dateYear = this.formatTime(new Date(), "yyyy.MM.dd");
      var dateWeek = weekday[new Date().getDay()];
      this.time = dateYear + " " + dateDay + " " + dateWeek;
    },
    make_echarts() {
      get_p1_r1().then((data) => {
        let op = echarts_bar2({
          datax: data.responseData.datax,
          datay1: data.responseData.datay1,
          datay2: data.responseData.datay2,
        });
        this.set_echarts("echarts_e1", op);
      });
      get_p1_r2().then((data) => {
        let op = echarts_legend({
          datax: data.responseData.datax,
          datay: data.responseData.datay,
        });
        this.set_echarts("echarts_e2", op);
      });
      get_p1_r3().then((data) => {
        let op3 = echarts_cube({
          datax: data.responseData.datax,
          datay: data.responseData.datay,
        });
        this.set_echarts("echarts_e3", op3);
        // 请求数据暂时省略，目前写死....
        let op4 = echarts_radar();
        this.set_echarts("echarts_e4", op4);
        let op5 = echarts_horizontal();
        this.set_echarts("echarts_e5", op5);
        let op6 = echarts_bin();
        this.set_echarts("echarts_e6", op6);
      });
    },
    randerMap(parentId, flag) {
      getMap(parentId).then((geoJson) => {
        this.registerAndsetOption(
          geoJson,
          parentId,
          this.location,
          this.path,
          flag
        );
        this.dom_e_list[7].off("click");
        this.dom_e_list[7].on("click", (msg) => {
          if (geoJson.features.length === 1) return;
          const cityMsg = geoJson.features.find(
            (item) => item.properties.name === msg.name
          );
          if (!cityMsg) return;
          const cityId =
            cityMsg.properties.adcode +
            (cityMsg.properties.childrenNum > 0 ? "_full" : "");
          const cityName = cityMsg.properties.name;
          if (cityId) {
            this.backStatus = true;
            this.location = [];
            this.path = [];
            this.randerMap(cityId, true);
          }
        });
      });
    },
    // 地图渲染
    registerAndsetOption(geoJson, id, location, path, flag) {
      if (flag) {
        //往mapStack里添加parentId，parentName,返回上一级使用
        this.mapStack.push({
          mapId: id,
        });
      }
      let op7 = echarts_map({ geoJson, location, path });
      this.set_echarts("echarts_e8", op7);
    },
    back() {
      let mapId = null;
      this.mapStack.pop();
      if (this.mapStack.length === 0) {
        this.backStatus = false;
        mapId = this.parentId;
        this.location = [
          {
            value: [120.16922, 30.24255],
            itemStyle: { color: "#4ab2e5" },
          } /* 杭州 */,
          {
            value: [121.55106, 29.85977],
            itemStyle: { color: "#4fb6d2" },
          } /* 宁波 */,
          {
            value: [120.12548, 30.85752],
            itemStyle: { color: "#52b9c7" },
          } /* 湖州 */,
          {
            value: [120.5819, 29.98895],
            itemStyle: { color: "#5abead" },
          } /* 绍兴 */,
          {
            value: [119.57135, 29.09521],
            itemStyle: { color: "#f34e2b" },
          } /* 金华 */,
          {
            value: [119.9127, 28.44583],
            itemStyle: { color: "#f56321" },
          } /* 丽水 */,
          {
            value: [120.65505, 28.01489],
            itemStyle: { color: "#96cc34" },
          } /* 温州 */,
        ];
        this.path = [
          {
            coords: [
              [120.16922, 30.24255],
              [121.55106, 29.85977],
            ],
            lineStyle: { color: "#4ab2e5" },
          },
          {
            coords: [
              [120.16922, 30.24255],
              [120.65505, 28.01489],
            ],
            lineStyle: { color: "#4fb6d2" },
          },
          {
            coords: [
              [120.12548, 30.85752],
              [120.65505, 28.01489],
            ],
            lineStyle: { color: "#52b9c7" },
          },
          {
            coords: [
              [120.5819, 29.98895],
              [120.65505, 28.01489],
            ],
            lineStyle: { color: "#5abead" },
          },
          {
            coords: [
              [119.57135, 29.09521],
              [121.55106, 29.85977],
            ],
            lineStyle: { color: "#f34e2b" },
          },
          {
            coords: [
              [119.9127, 28.44583],
              [121.55106, 29.85977],
            ],
            lineStyle: { color: "#f56321" },
          },
          {
            coords: [
              [120.65505, 28.01489],
              [120.65505, 28.01489],
            ],
            lineStyle: { color: "#96cc34" },
          },
        ];
      } else {
        mapId = this.mapStack[this.mapStack.length - 1].mapId;
      }
      this.randerMap(mapId, false);
    },
    set_echarts(dom, option) {
      let dom_t = this.echartsType.get(dom);
      if (!this.dom_e_list[dom_t]) {
        this.dom_e_list[dom_t] = echarts.init(document.getElementById(dom));
        this.dom_e_list[dom_t].setOption(option);
      } else {
        this.dom_e_list[dom_t].clear();
        this.dom_e_list[dom_t].setOption(option, true);
      }
    },
  },
  mounted() {
    this.calcRate();
    window.addEventListener("resize", this.resize);
    this.make_echarts();
    this.randerMap(this.parentId, false);
    this.getNowData();
    setTimeout(() => {
      this.loading = false
    }, 2000);
    setInterval(() => {
      this.getNowData();
    }, 1000);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    clearInterval();
  },
});
