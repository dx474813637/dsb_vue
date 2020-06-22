<template>
  <div class="echarts-wrap" id="echartsW">
    <div id="echarts" class="echarts" :class="{ active: diagramming }"></div>
    <div
      class="echarts-header echarts-diagramming"
      :class="{ active: diagramming }"
    >
      标题
    </div>
    <div
      class="echarts-footer echarts-diagramming"
      :class="{ active: diagramming }"
    >
      底部
    </div>
  </div>
</template>

<script>
export default {
  name: "echarts",
  props: {
    echartData: {
      type: Object,
    },
    diagramming: Boolean,
  },
  data() {
    return {
      myChart: "",
    };
  },
  watch: {
    echartData: function(newV) {
      this.drawLine(newV);
    },
    diagramming: function(newV) {
      if (newV) {
        this.myChart.resize({
          width: '1000',
        });
      } else {
        this.myChart.resize({
          width: document.getElementById('echartsW').offsetWidth
        });
      }
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("echarts"));
    this.drawLine(this.echartData);
    let self = this;
    window.onresize = this.$untils.debounce(() => {
      self.myChart.resize();
    }, 1500);
  },
  methods: {
    drawLine(data) {
      if (Object.keys(data).length == 0) {
        return;
      }
      // console.log(data);
      this.myChart.setOption(data, true);
    },
  },
};
</script>

<style scoped>
.echarts-wrap {
  width: 100%;
  min-height: 400px;
  position: relative;
}
.echarts.active {
  width: 1000px;
  margin: 0 auto;
}
.echarts {
  width: 100%;
  min-height: 400px;
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
}
.echarts-footer {
  bottom: 0;
}
</style>
