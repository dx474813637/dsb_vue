<template>
  <div class="echarts-wrap" ref="echartsW" v-loading="loading">
    <div ref="echarts" class="echarts" :class="{ active: diagramming }"></div>
    <div
      class="echarts-header echarts-diagramming"
      :class="{ active: diagramming }"
      :style="{ fontSize: settingSize, backgroundColor: settingColor }"
    >{{ settingTitle || title }}</div>
    <div
      class="echarts-footer echarts-diagramming"
      :class="{ active: diagramming }"
      :style="{ backgroundColor: settingColor }"
    >底部</div>
  </div>
</template>

<script>
export default {
  name: "echarts",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    echartData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    diagramming: {
      tyep: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    settingTitle: {
      type: String
    },
    settingSize: {
      type: String,
      default: "16px"
    },
    settingColor: {
      type: String,
      default: '#409eff'
    }
  },
  data() {
    return {
      myChart: "",
      title: "",
    };
  },
  watch: {
    settingTitle(newV) {
      if (Object.keys(this.echartData).length > 0) {
        let obj = newV
          ? Object.assign({}, this.echartData, { title: { text: newV } })
          : this.echartData;
        this.drawLine(obj);
        this.myChart.resize();
      }
    },
    echartData(newV) {
      this.title = newV.title.text;
      this.drawLine(newV);
      this.myChart.resize();
    },
    diagramming() {
      this.changeSize();
    },
    show() {
      this.changeSize();
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.echarts);
    this.drawLine(this.echartData);
    let self = this;
    window.onresize = this.$untils.debounce(() => {
      self.myChart.resize();
    }, 1500);
  },
  methods: {
    changeSize() {
      if (this.diagramming == true) {
        this.myChart.resize({
          width: 1000
        });
      } else {
        this.myChart.resize({
          width: this.$refs.echartsW.offsetWidth
        });
      }
    },
    drawLine(data) {
      if (Object.keys(data).length == 0) {
        return;
      }
      // console.log(data);
      this.myChart.setOption(data, true);
      this.$emit("load-end");
    }
  }
};
</script>

<style scoped>
.echarts-wrap {
  width: 100%;
  height: 450px;
  position: relative;
}
.echarts.active {
  width: 1000px;
  margin: 0 auto;
}
.echarts {
  width: 100%;
  height: 450px;
  position: relative;
}
.echarts-diagramming.active {
  display: block;
}
.echarts-diagramming {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
  width: 1000px;
  background-color: #409eff;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.echarts-header {
  top: 0;
  height: 50px;
  line-height: 50px;
}
.echarts-footer {
  bottom: 0;
}
</style>
