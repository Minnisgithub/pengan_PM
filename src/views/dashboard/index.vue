<template>
  <div>
    <div class="header">
      <div class="runTime">
        <div class="img"></div>
        <div>
          <p>系统运行时间</p>
          <p>
            <span>{{ runTime }}</span> 天安全运行
          </p>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="terminal">
        <div>
          <p><img :src="terminalImg" alt="" /> 终端</p>
          <p class="fs20">
            <span class="blue">{{ partTerminalNum }}</span
            >/{{ terminalNum }}
          </p>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="projectNum">
        <div>
          <p><img :src="projectNumImg" alt="" />项目</p>
          <p class="fs20">
            <span class="blue">{{ partProjectNum }}</span
            >/{{ projectNum }}
          </p>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>

      <div class="overallReceiveCount">
        <div>
          <p><img :src="overallReceiveCountImg" alt="" />历史接收消息总数</p>
          <p class="fs20">{{ overallReceiveCount }}</p>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>

      <div class="overallSendCount">
        <div>
          <p><img :src="overallSendCountImg" alt="" />历史发送消息总数</p>
          <p class="fs20">{{ overallSendCount }}</p>
        </div>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <div class="grid-content left">
          <div class="l_top">
            <el-card class="l_top_l">
              <div class="title">错误消息数量</div>
              <div class="flex-space-around">
                <div>
                  <p class="number success">{{ jccount }}</p>
                  <p class="des">集成项目</p>
                </div>
                <div>
                  <p class="number error">{{ jkcount }}</p>
                  <p class="des">接口项目</p>
                </div>
              </div>
            </el-card>
            <el-card class="l_top_r">
              <div class="title">队列警报</div>
              <div class="flex-space-around">
                <div>
                  <p class="number Info">{{ jccount }}</p>
                  <p class="des">队列警报</p>
                </div>
              </div>
            </el-card>
          </div>
          <el-card class="l_center">
            <div class="title">
              <div>消息处理数量（采集间隔 20m）</div>
              <div class="search">
                <el-select v-model="msgValue" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <DatePicker
                  ref="datePicker"
                  @dateChange="timeChange"
                ></DatePicker>
                <el-button size="mini" icon="el-icon-refresh"></el-button>
              </div>
            </div>
            <div id="main"></div>
          </el-card>
          <el-card class="l_bottom">
            <div class="title">CPU</div>
            <div id="main1"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <div class="grid-content right">
          <div class="r_top"></div>
          <el-card class="r_center">
            <div class="title">堆内存</div>
            <div id="main2"></div>
          </el-card>
          <el-card class="r_bottom">
            <div class="title">磁盘空间</div>
            <div id="main3"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  currentTime as _currentTime,
  overallReceiveCount as _overallReceiveCount,
  jccount as _jccount,
  jkcount as _jkcount,
  jblengths as _jblengths,
  alljblengths as _alljblengths,
  countSeries as _countSeries,
  terminal as _terminal,
  project as _project,
  esbproject as _esbproject,
} from "@/api/dashboard";
import DatePicker from "@/components/DatePicker";
export default {
  name: "Echarts",
  components: {
    DatePicker,
  },
  data() {
    return {
      terminalImg: require("@/assets/terminal.png"),
      projectNumImg: require("@/assets/projectNum.png"),
      overallReceiveCountImg: require("@/assets/overallReceiveCount.png"),
      overallSendCountImg: require("@/assets/overallSendCount.png"),
      runTime: 0, // 安全运行时间
      partTerminalNum: 0,
      terminalNum: 0,
      projectNum: 0,
      partProjectNum: 0,
      overallSendCount: 0, // 历史发送消息总数
      overallReceiveCount: 0, // 历史接收消息总数
      jccount: 0,
      jkcount: 0,
      options: [
        {
          value: "接收",
          label: "接收",
        },
        {
          value: "发送",
          label: "发送",
        },
      ],
      msgValue: "接收",

      option: {
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          show: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} ",
          },
        },
        series: [
          {
            name: "主机接收消息量",
            type: "line",
            data: [10, 11, 13, 11, 12, 12, 9],
          },
          {
            name: "主机接收错误消息量",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0],
          },
        ],
      },
      option1: {
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          right: "0",
          orient: "vertical",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
      option3: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          right: "0",
          orient: "vertical",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
    };
  },

  methods: {
    // 错误消息数量
    errorMsg() {
      _jccount().then((res) => {
        this.jccount = res.totalCount;
      });
      _jkcount().then((res) => {
        this.jkcount = res.totalCount;
      });
    },
    // 队列警报
    jblengths() {
      _jblengths().then((res) => {
        if (res) {
          _alljblengths().then((item) => {
            this.judgeEndpoints(res.endpoints, item.endpoints);
            this.judgeProjects(res.projects, item.projects);
          });
        }
      });
    },
    judgeEndpoints(endpoints, allendpoints) {
      let overPoints = [];
      for (const key in endpoints) {
        for (const allkey in allendpoints) {
          if (key == allkey) {
            if (endpoints[key].length > allendpoints[allkey].warning) {
              overPoints.push([endpoints[key].name, endpoints[key].length]);
            }
          }
        }
      }
    },
    judgeProjects(projects, allProjects) {
      let overPoints = [];
      for (const key in projects) {
        for (const allkey in allProjects) {
          if (key == allkey) {
            for (const ckey in projects[key].routes) {
              for (const callkey in allProjects[allkey]) {
                if (callkey == ckey) {
                  if (
                    projects[key].routes[ckey].length >
                    allProjects[allkey][callkey].warning
                  ) {
                    overPoints.push(
                      projects[key].name +
                        [
                          projects[key].routes[ckey].name,
                          projects[key].routes[ckey].length,
                        ]
                    );
                  }
                }
              }
            }
          }
        }
      }
    },
    // 消息处理数量
    timeChange(v) {
      _countSeries(v).then((res) => {});
    },
    msgDispose() {
      this.myChart = this.$echarts.init(document.getElementById("main"));
      this.myChart.setOption(this.option);
    },
    myEcharts1() {
      this.myChart1 = this.$echarts.init(document.getElementById("main1"));
      this.myChart1.setOption(this.option1);
      this.myChart2 = this.$echarts.init(document.getElementById("main2"));
      this.myChart2.setOption(this.option2);
      this.myChart3 = this.$echarts.init(document.getElementById("main3"));
      this.myChart3.setOption(this.option3);
    },
  },
  mounted() {
    // 运行时间
    _currentTime().then((res) => {
      const date = new Date(res.issueDate);
      const newdata = new Date();
      let dateDiff = newdata.getTime() - date.getTime();
      this.runTime = Math.floor(dateDiff / (24 * 3600 * 1000));
    });
    //  历史收发消息
    _overallReceiveCount().then((res) => {
      this.overallReceiveCount = res.primary.overallReceiveCount;
      this.overallSendCount = res.primary.overallSendCount;
    });
    // 终端
    _terminal().then((res) => {
      this.terminalNum = res.length;
      let sum = 0;
      for (const iterator of res) {
        if (iterator.state == "STARTED") {
          sum++;
        }
      }
      this.partTerminalNum = sum;
    });
    // 项目
    _project().then((res) => {
      this.projectNum += res.length;
      for (const iterator of res) {
        if (iterator.status == "STARTED") {
          this.partProjectNum++;
        }
      }
    });
    _esbproject().then((res) => {
      this.projectNum += res.length;
      for (const iterator of res) {
        if (iterator.status == "STARTED") {
          this.partProjectNum++;
        }
      }
    });
    this.errorMsg(); // 错误消息数量
    this.jblengths(); // 队列警报
    this.$refs.datePicker.dateChange(60); //消息处理数量(默认1小时)
    this.msgDispose();
    this.myEcharts1();
    window.addEventListener("resize", () => {
      this.myChart.resize();
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.myChart.resize();
      this.myChart1.resize();
      this.myChart2.resize();
      this.myChart3.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  display: flex;
  color: #444747;
  .el-divider {
    height: 60px;
  }
  .fs20 {
    font-size: 20px;
    font-weight: bold;
  }
  img {
    vertical-align: top;
  }
  .blue {
    color: #506cd4;
  }
  p {
    margin: 6px;
  }
  .runTime {
    display: flex;
    width: 220px;
    .img {
      width: 54px;
      height: 54px;
      background-image: url(../../assets/runTime.png);
    }
    span {
      color: #00c1b5;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .terminal {
    width: 160px;
    text-align: center;
  }
  .projectNum {
    width: 160px;
    text-align: center;
  }
  .overallReceiveCount {
    width: 220px;
    text-align: center;
  }
  .overallSendCount {
    width: 220px;
    text-align: center;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.left {
  .l_top {
    height: 160px;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .number {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .success {
      color: #0f6;
    }
    .error {
      color: #f00;
    }
    .Info {
      color: #909399;
    }
    .des {
      color: #98a6ad;
    }
    .l_top_l {
      width: 48%;
    }
    .l_top_r {
      width: 48%;
    }
  }
  .l_center {
    height: 400px;
    margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .search {
        width: 300px;
        display: flex;
        ::v-deep .el-date-editor {
          width: 180px;
        }
        ::v-deep .el-select {
          width: 120px;
          margin-right: 10px;
        }
      }
    }
  }
  .l_bottom {
    height: 240px;
  }
}
.right {
  .r_top {
    height: 380px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #99a9bf;
  }
  .r_center {
    height: 200px;
    margin-bottom: 10px;
  }
  .r_bottom {
    height: 220px;
  }
}
.title {
  font-size: 18px;
  font-weight: bold;
}
#main {
  height: 340px;
}
#main1 {
  height: 200px;
}
#main2 {
  height: 160px;
}
#main3 {
  height: 180px;
}
</style>