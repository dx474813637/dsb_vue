<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <strong>{{nameStr}}</strong>
        </span>
        <!-- 图表化按钮 -->
        <el-switch
          style="float: right; padding: 3px 0"
          :value="diagramming"
          active-text="图表化"
          @input="handleChangeState"
        ></el-switch>
      </div>
      <!-- 样式工具条组件 -->
      <data-tools
        :titleVal="settingOptions.title"
        @setting-change="changeSetting"
        :sizeVal="settingOptions.textSize"
        :color="settingOptions.color"
      ></data-tools>
    </el-card>
    <!-- 条件筛选box -->
    <el-card class="box-card" shadow="never">
      <span class="box-select-title">
        <i class="el-icon-location"></i> 行业
      </span>
      <el-cascader
        :key="isShowKey"
        v-model="selectCgyVal"
        :options="selectCgyData"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </el-card>
    <!-- 数据对比组件 -->
    <data-compare
      :show="isCompare"
      :name="nameStr"
      :compareCgy="selectCgyData"
      :curDataObj="this.selectCgyVal"
      :kwList="labelList"
      :curKw="this.echartsLabelActive"
      :api="api"
      @exit-compare="isCompareBox"
      getKey="name"
      echartsXKey="dtime"
      :dataType="selectCgyData"
      :dataLabel="dataLabel"
      :settingTitle="settingOptions.title"
    ></data-compare>

    <!-- 图表 -->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <strong>{{ idToCountry }}</strong>
        </span>
        <el-button
          type="primary"
          size="mini"
          style="float: right"
          id="compareBtn"
          @click="isCompareBox(true)"
        >数据对比</el-button>
      </div>
      <label-list
        :labelData="labelList"
        @getLabelActive="getLabel"
        :labelActive="echartsLabelActive"
        style="margin-bottom: 30px"
      ></label-list>
      <echart
        :diagramming="diagramming"
        :echartData="echartData"
        :loading="loading"
        @load-end="handleLoad"
        :settingTitle="settingOptions.title"
        :settingSize="settingOptions.textSize"
        :settingColor="settingOptions.color"
      ></echart>
    </el-card>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <strong>核心数据表</strong>
        </span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(col, index) in dataTableNav"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed"
        ></el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" shadow="never" style="font-size:14px;color: #666">
      <div slot="header" class="clearfix">
        <span>数据库备注</span>
        <p>1、全球电商数据库数据来源：世界银行、联合国贸易和发展会议、欧洲电子商务协会、美国商务部、德国零售业协会、加拿大统计局、韩国国家统计局、中国商务部、中国国际电子商务中心研究院等，以及其他政府部门、科研机构、行业协会、咨询公司和其他研究方法估算、分析得出。如有错误，请点击“我要纠错”在线递交错误信息。</p>
        <p>
          2、为确保图表工具的正常显示以及使用，请使用除IE以外的主流浏览器（如：Firefox、Google
          Chrome、Safari、Opera等浏览器）
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import apiConfig from "../untils/dataApiConfig.js";
import dataTools from "../components/DataTools";
import { dataType, dataLabel } from "../untils/dataType_industry.js";
import labelList from "../components/BoxCardLabels";
import echart from "../components/BoxCardEcharts";
import eChartsOptions from "../untils/echartsOptions.js";
import { mapState, mapMutations } from "vuex";
import dataCompare from "../components/DataCompare1";
// dataType[0]['children'][0].value
export default {
  name: "industryData",
  data() {
    return {
      name: "industryData",
      nameStr: "电商行业数据库",
      value1: true,
      selectCgyData: dataType,
      selectCgyVal: [dataType[0].value, dataType[0].children[0].value],
      dataList: [],
      tableData: [],
      dataTableNav: "",
      echartsLabelActive: "",
      isCompare: false,
      dataLabel: dataLabel,
      loading: true,
      isShowKey: 0,
      settingOptions: {
        title: "",
        textSize: "16px",
        color: "#409eff"
      }
    };
  },
  created() {
    console.log(this.selectCgyVal);
    // this.get();
  },
  computed: {
    ...mapState(["diagramming"]),
    idToCountry() {
      let self = this;
      return dataType
        .filter(ele => {
          return ele.value == self.selectCgyVal[0];
        })[0]
        .children.filter(item => {
          return item.value == self.selectCgyVal[1];
        })[0].label;
    },
    api() {
      return apiConfig[this.name].api;
    },
    params() {
      return {
        name: this.idToCountry
      };
    },
    labelList() {
      const arr = [];
      for (let key in dataLabel) {
        if (key !== "dtime") {
          arr.push({
            name: key,
            title: dataLabel[key]["title"]
          });
        }
      }
      let k = "";
      if (this.tableData.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          k = arr[i].name;
          let obj = this.tableData.filter(ele => ele.key == k)[0];
          let flag = false;
          for (let item in obj) {
            if (item !== "title" && item !== "key" && obj[item]) {
              flag = true;
            }
          }
          if (!flag) {
            arr.splice(i, 1);
            i--;
          }
        }
      }
      //   console.log(arr)
      return arr;
    },
    echartData() {
      if (!this.tableData || this.tableData.length == 0) {
        return {};
      } else {
        let o;
        let obj = {
          echartsType: "normal",
          dataList: {
            type: "line",
            data: {
              x: [],
              y1: [],
              y2: []
            },
            xName: "时间",
            yName: [],
            title: "",
            dw: "",
            colors: ["#409EFF", "#ff02b8"],
            key: "",
            main: this.idToCountry
          }
        };
        o = this.tableData.filter(ele => {
          return ele.key == this.echartsLabelActive;
        })[0];
        for (let key in o) {
          if (key == "title") {
            var arr = o.title.split(" / ");
            obj.dataList.title = arr[0];
            obj.dataList.dw = arr[1];
            obj.dataList.yName.push(arr[0]);
          } else if (key == "key") {
            obj.dataList.key = o[key];
          } else {
            if (o[key] !== "" && o[key] !== undefined && o[key] !== null) {
              obj.dataList.data.x.unshift(key);
              obj.dataList.data.y1.unshift(o[key]);
            }
          }
        }
        // console.log(obj.dataList.data.y1)
        // console.log(obj);

        return eChartsOptions(obj);
      }
    }
  },
  components: {
    dataTools,
    labelList,
    echart,
    dataCompare
  },
  methods: {
    ...mapMutations(["changeDiagramming"]),
    handleLoad() {
      this.loading = false;
    },
    changeSetting(title, type) {
      this.settingOptions[type] = title;
    },
    isCompareBox(isC) {
      this.isCompare = isC;
      const body = document.querySelector("body");
      this.isCompare
        ? body.classList.add("no-scroll-body")
        : body.classList.remove("no-scroll-body");
    },
    handleChangeState() {
      this.$store.commit("changeDiagramming");
    },
    getLabel(value) {
      this.echartsLabelActive = value;
      this.$nextTick(() => {
        this.settingOptions.title = this.echartData.title.text;
      });
    },
    getData(cb) {
      this.getAjax(this.api, this.params).then(res => {
        this.dataList = res.data.list.sort(
          (a, b) => parseInt(b.dtime) - parseInt(a.dtime)
        );
        this.dataTableNav = this.getDataNav(this.dataList);
        this.tableData = this.getDataTable(this.dataList, dataLabel);
        cb && cb();
      });
    },
    getDataTable(data, label) {
      let arr = [];
      let kw = "";
      for (let key in label) {
        if (label[key]["title"] !== "时间") {
          kw = key;
          let obj = {
            title: `${label[kw]["title"]} / ${label[kw]["dw"]}`,
            key: kw
          };
          data.forEach(ele => {
            obj[ele.dtime] = !ele[kw] ? "" : parseFloat(ele[kw]);
          });
          const flag = this.isEmpty(obj);

          if (flag) arr.push(obj);
        }
      }
      return arr;
    },
    isEmpty(data) {
      for (var key in data) {
        if (
          key !== "title" &&
          key !== "key" &&
          data[key] !== null &&
          data[key] !== "" &&
          data[key] !== undefined
        ) {
          return true;
        }
      }
    },
    getDataNav(data) {
      let arr = [];
      data.forEach(ele => {
        arr.push({
          prop: ele.dtime,
          label: ele.dtime,
          width: "120",
          fixed: false
        });
      });
      arr.unshift({
        prop: "title",
        label: "日期",
        width: "200",
        fixed: true
      });
      //   console.log(arr)
      return arr;
    },
    get() {
      let vm = this;
      this.getData(function() {
        vm.$nextTick(() => {
          vm.isShowKey++;
          vm.echartsLabelActive = vm.labelList[0].name;
          vm.settingOptions.title = vm.echartData.title.text;
        });
      });
    },
    handleChange() {
      this.$router.push({
        name: "IndustryId",
        params: { id: this.selectCgyVal[0], value: this.selectCgyVal[1] }
      });
    },
    getAjax(url, params) {
      return this.$axios.get(url, { params });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    next(vm => {
      if (to.params.id) {
        vm.selectCgyVal.splice(0, 2, to.params.id, to.params.value);
      }
      vm.get();
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id) {
      this.selectCgyVal.splice(0, 2, to.params.id, to.params.value);
      console.log(this.selectCgyVal);
      this.get();

      next();
    }
  }
};
</script>

<style scoped></style>
