<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span><strong>全球电商数据库</strong> </span>
        <el-switch
          style="float: right; padding: 3px 0"
          :value="diagramming"
          active-text="图表化"
          @input="handleChangeState"
        >
        </el-switch>
      </div>
      <data-tools></data-tools>
    </el-card>

    <el-card class="box-card" shadow="never">
      <span class="box-select-title"
        ><i class="el-icon-location"></i> 地区
      </span>
      <el-cascader
        v-model="selectCgyVal"
        :options="selectCgyData"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </el-card>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span
          ><strong>{{ idToCountry }}</strong>
        </span>
        <el-button type="primary" size="mini" style="float: right"
          >数据对比</el-button
        >
      </div>
      <label-list
        :labelData="labelList"
        @getLabelActive="getLabel"
        :labelActive="echartsLabelActive"
        style="margin-bottom: 30px"
      ></label-list>
      <echart :diagramming="diagramming" :echartData="echartData"></echart>
    </el-card>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span><strong>核心数据表</strong> </span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(col, index) in dataTableNav"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed"
        >
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" shadow="never" style="font-size:14px;color: #666">
      <div slot="header" class="clearfix">
        <span>数据库备注 </span>
        <p>
          1、全球电商数据库数据来源：世界银行、联合国贸易和发展会议、欧洲电子商务协会、美国商务部、德国零售业协会、加拿大统计局、韩国国家统计局、中国商务部、中国国际电子商务中心研究院等，以及其他政府部门、科研机构、行业协会、咨询公司和其他研究方法估算、分析得出。如有错误，请点击“我要纠错”在线递交错误信息。
        </p>
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
import { dataType, dataLabel } from "../untils/dataType_global.js";
import labelList from "../components/BoxCardLabels";
import echart from "../components/BoxCardEcharts";
import eChartsOptions from "../untils/echartsOptions.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "globalData",
  data() {
    return {
      name: "globalData",
      value1: true,
      selectCgyData: dataType,
      selectCgyVal: [dataType[0].value],
      dataList: [],
      tableData: [],
      dataTableNav: "",
      echartsLabelActive: "",
    };
  },
  created() {
    // console.log(this.diagramming);
    // this.get();
  },
  computed: {
    ...mapState(["diagramming"]),
    idToCountry() {
      let self = this;
      return dataType.filter((ele) => ele.id == self.selectCgyVal[0])[0].label;
    },
    params() {
      return {
        cate: this.idToCountry,
      };
    },
    labelList() {
      const arr = [];
      for (let key in dataLabel) {
        if (key !== "name") {
          arr.push({
            name: key,
            title: dataLabel[key]["title"],
          });
        }
      }
      let k = "";
      if (this.tableData.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          k = arr[i].name;
          let obj = this.tableData.filter((ele) => ele.key == k)[0];
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
              y2: [],
            },
            xName: "时间",
            yName: [],
            title: "",
            dw: "",
            colors: ["#409EFF", "#ff02b8"],
            key: "",
            main: this.idToCountry,
          },
        };
        o = this.tableData.filter((ele) => {
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
        console.log(obj);
        return eChartsOptions(obj);
      }
    },
  },
  components: {
    dataTools,
    labelList,
    echart,
  },
  methods: {
    ...mapMutations(["changeDiagramming"]),
    handleChangeState() {
      this.$store.commit("changeDiagramming");
    },
    getLabel(value) {
      this.echartsLabelActive = value;
    },
    getData() {
      this.getAjax(apiConfig[this.name].api, this.params).then((res) => {
        this.dataList = res.data.list.sort(
          (a, b) => parseInt(b.name) - parseInt(a.name)
        );
        this.dataTableNav = this.getDataNav(this.dataList);
        this.tableData = this.getDataTable(this.dataList, dataLabel);
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
            key: kw,
          };
          data.forEach((ele) => {
            obj[ele.name] = !ele[kw] ? "" : parseFloat(ele[kw]);
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
      data.forEach((ele) => {
        arr.push({
          prop: ele.name,
          label: ele.name,
          width: "120",
          fixed: false,
        });
      });
      arr.unshift({
        prop: "title",
        label: "日期",
        width: "200",
        fixed: true,
      });
      return arr;
    },
    get() {
      this.getData();
      this.$nextTick(() => {
        this.echartsLabelActive = this.labelList[0].name;
      });
    },
    handleChange() {
      this.$router.push({
        name: "GlobalId",
        params: { id: this.selectCgyVal[0] },
      });
    },
    getAjax(url, params) {
      return this.$axios.get(url, { params });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.id) vm.selectCgyVal.splice(0, 1, to.params.id)
      vm.get();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.get();
    next();
  },
};
</script>

<style scoped></style>
