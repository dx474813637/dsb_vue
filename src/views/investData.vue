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
      <el-row style="margin-bottom: 20px">
        <el-col :span="8">
          <span class="box-select-title">
            <i class="el-icon-location"></i> 领域/行业
          </span>
          <el-cascader v-model="selectCgyVal1" :options="selectCgyData1" @change="handleChange1"></el-cascader>
        </el-col>

        <el-col :span="8">
          <span class="box-select-title">
            <i class="el-icon-location"></i> 融资轮次
          </span>
          <el-cascader v-model="selectCgyVal2" :options="selectCgyData2" @change="handleChange2"></el-cascader>
        </el-col>

        <el-col :span="8">
          <span class="box-select-title">
            <i class="el-icon-location"></i> 省/市
          </span>
          <el-cascader v-model="selectCgyVal3" :options="selectCgyData3" @change="handleChange3"></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="box-select-title">
            <i class="el-icon-location"></i> 起始日期
          </span>
          <el-date-picker
            v-model="startDate"
            type="month"
            :editable="false"
            placeholder="起始日期"
            :picker-options="pickerOptions1"
            align="left"
            value-format="yyyyMM01"
            @change="handleChangeDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="8">
          <span class="box-select-title">
            <i class="el-icon-location"></i> 结束日期
          </span>
          <el-date-picker
            v-model="endDate"
            type="month"
            :editable="false"
            placeholder="结束日期"
            :picker-options="pickerOptions2"
            value-format="yyyyMM01"
            align="left"
            @change="handleChangeDate"
          ></el-date-picker>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据列表box -->
    <el-card class="box-card" shadow="never">
      <el-table
        ref="multipleTable"
        :data="curPageData"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{prop: 'time', order: 'descending'}"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="融资方"></el-table-column>
        <el-table-column prop="cate" label="所属行业"></el-table-column>
        <el-table-column prop="a106" label="所在地"></el-table-column>
        <el-table-column prop="time" label="融资时间" sortable="custom" :formatter="timeStr"></el-table-column>
        <el-table-column prop="shares" label="融资轮次"></el-table-column>
        <el-table-column prop="moneny" label="融资金额" sortable="custom" :formatter="monenyStr"></el-table-column>
        <el-table-column prop="a102" label="投资方" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        :background="true"
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        style="padding-top: 30px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import apiConfig from "../untils/dataApiConfig.js";
import dataTools from "../components/DataTools";
import { dataType, dataRound, dataMoney } from "../untils/dataType_invest.js";
import { provinceAndCityDataPlus, CodeToText } from "element-china-area-data";
import { mapState, mapMutations } from "vuex";
export default {
  name: "investData",
  data() {
    return {
      name: "investData",
      nameStr: "电商投融资数据库",
      selectCgyData1: dataType,
      selectCgyVal1: [],
      selectCgyData2: dataRound,
      selectCgyVal2: ["all"],
      selectCgyData3: provinceAndCityDataPlus,
      selectCgyVal3: [""],
      areaStr: [],
      startDate: new Date().getFullYear() + "0101",
      endDate:
        new Date().getFullYear() +
        "" +
        (new Date().getMonth() >= 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)) +
        "01",
      pickerOptions1: {
        disabledDate: time => {
          if (this.endDate != null && this.endDate != "") {
            return (
              time.getTime() >
                new Date(
                  Date.parse(
                    this.endDate.slice(0, 4) +
                      "/" +
                      this.endDate.slice(4, 6) +
                      "/" +
                      this.endDate.slice(-2)
                  )
                ) || time.getTime() > new Date().getTime()
            );
          } else if (time.getTime() > new Date().getTime()) {
            return true;
          } else {
            return false;
          }
        }
      },
      pickerOptions2: {
        disabledDate: time => {
          if (this.startDate != null && this.startDate != "") {
            return (
              time.getTime() <
                new Date(
                  Date.parse(
                    this.startDate.slice(0, 4) +
                      "/" +
                      this.startDate.slice(4, 6) +
                      "/" +
                      this.startDate.slice(-2)
                  )
                ) || time.getTime() > new Date().getTime()
            );
          } else if (time.getTime() > new Date().getTime()) {
            return true;
          } else {
            return false;
          }
        }
      },
      settingOptions: {
        title: "",
        textSize: "16px",
        color: "#409eff"
      },
      multipleSelection: [],
      list: [],
      tableData: [],
      curPageData: [],
      n: 20,
      curPage: 1,
      loading: false
    };
  },
  components: {
    dataTools
  },
  created() {},
  computed: {
    ...mapState(["diagramming"]),
    params() {
      const cate = this.cateString(this.selectCgyVal1);
      const obj = {
        cate: cate[0],
        sub: cate[1],
        qujian: 1,
        ym1: this.startDate,
        ym2: this.endDate
      };
      return obj;
    }
  },
  methods: {
    ...mapMutations(["changeDiagramming"]),
    filterCurPageData() {
      this.curPageData = this.tableData.slice(
        this.n * (this.curPage - 1),
        this.n * this.curPage
      );
    },
    handleSizeChange(n) {
      this.n = n;
      this.filterCurPageData();
    },
    handleCurrentChange(p) {
      this.curPage = p;
      this.filterCurPageData();
    },
    handleSortChange(column) {
      console.log(column);
      // order: "descending"
      // prop: "moneny"
      let prop = column.prop;
      if (column.order == "descending") {
        this.tableData = this.tableData.sort((a, b) => b[prop] - a[prop]);
      } else if (column.order == "ascending") {
        this.tableData = this.tableData.sort((a, b) => a[prop] - b[prop]);
      }
      this.filterCurPageData();
    },
    timeStr(row) {
      return row.dtime;
    },
    monenyStr(row, column, cellValue) {
      if (cellValue == 0) return row.a100;
      return row.a100 + row.a101;
    },
    getTableData() {
      if (this.list.length == 0) return [];
      let arr = [];
      let rz = this.selectCgyVal2[0] == 'all' ? '' : this.selectCgyVal2[0]
      // console.log(rz)
      // let area = this.selectCgyVal3[0]
      let data = (rz.length != 1 || rz == 'IPO') ? this.list.filter(ele => ele.shares.indexOf(rz) != -1 ) : this.list.filter(ele => ele.shares.indexOf(rz) == 0 )
      let province = this.areaStr[0]
      let city = this.areaStr[1]
      if(province && province != '全部') {
        data = data.filter(ele => {
          return ele.a106.indexOf(province) != -1
        })
        if(city && city != '全部' && city != '市辖区') {
          data = data.filter(ele => {
            return ele.a107.indexOf(city) != -1
          })
        }
      }
      data.forEach(ele => {
        let addr =
          ele.a106.indexOf("市") != -1
            ? ele.a106 || ele.a107
            : ele.a106 + ele.a107;
        let obj = {
          name: ele.name,
          cate: ele.cate,
          a106: addr,
          dtime: ele.dtime,
          shares: ele.shares,
          a100: ele.a100,
          a101: ele.a101,
          a102: ele.a102,
          time: this.timeNum(ele.dtime),
          moneny: this.moneyNum(ele.a100, ele.a101)
        };
        arr.push(obj);
      });
      this.tableData = arr.sort((a, b) => b.time - a.time);
      this.filterCurPageData();
    },
    getData() {
      this.loading = true
      this.$nextTick(() => {
        this.getAjax(apiConfig[this.name].api, this.params).then(res => {
          // console.log(res);
          this.list = res.data.list;
          this.getTableData()
          this.loading = false
        });
      });
    },
    timeNum(time) {
      let yearIndex = time.indexOf("年");
      let monthIndex = time.indexOf("月");
      let month = parseInt(time.slice(yearIndex + 1, monthIndex));
      let day = parseInt(time.slice(monthIndex + 1, time.length - 1));
      return (
        time.slice(0, 4) +
        (month >= 10 ? month : "0" + month) +
        (day >= 10 ? day : "0" + day)
      );
    },
    moneyNum(m, d) {
      if (m == "") return 0;
      let money = m;
      let s = 1;
      dataMoney.forEach(ele => {
        if (ele["title"].indexOf(m) != -1) {
          money = ele["number"];
        }
      });
      if (d.indexOf("美") != -1) {
        s = 6.85;
      } else if (d.indexOf("港") != -1) {
        s = 1.14;
      }
      if (money.indexOf("万") != -1) {
        money = parseFloat(money) * 10000;
      } else if (money.indexOf("亿") != -1) {
        money = parseFloat(money) * 10000 * 10000;
      } else {
        money = 0;
      }

      return money * s;
    },
    changeTableSort(obj) {
      console.log(obj);
      if (obj.prop == "dtime") {
        if (obj.order == "descending") {
          this.tableData = this.tableData.sort((a, b) => b.time - a.time);
        }
        if (obj.order == "ascending") {
          this.tableData = this.tableData.sort((a, b) => a.time - b.time);
        }
      }
    },
    changeSetting(title, type) {
      this.settingOptions[type] = title;
    },
    cateString(cate) {
      if (cate[0] == "0") return ["", ""];
      const arr = [];
      const obj = dataType.filter(ele => {
        return ele.value == cate[0];
      })[0];
      arr.push(obj.label);
      if (cate[1] != "all") {
        const sub = obj.children.filter(ele => ele.value == cate[1])[0];
        arr.push(sub.label);
      } else {
        arr.push("");
      }
      return arr;
    },
    handleChangeState() {
      console.log(this.params);
      this.$store.commit("changeDiagramming");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange1(val) {
      this.$router.push({
        name: "investData",
        params: { id: val[0], value: val[0] == "0" ? "all" : val[1] }
      });
    },
    handleChange2(val) {
      console.log(val)
      this.getTableData()
    },
    handleChange3(val) {
      this.areaStr = [CodeToText[val[0]], CodeToText[val[1]]]
      console.log(this.areaStr)
      this.getTableData();
    },
    handleChangeDate() {
      this.getData();
    },
    getAjax(url, params) {
      return this.$axios.get(url, { params });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const id = to.params.id;
      const val = to.params.value;
      if (id && val) {
        if (id == "0") {
          vm.selectCgyVal1 = [id];
        } else {
          vm.selectCgyVal1 = [id, val];
        }
      }
      vm.getData();
    });
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    const val = to.params.value;
    if (id && val) {
      if (id == "0") {
        this.selectCgyVal1 = [id];
      } else {
        this.selectCgyVal1 = [id, val];
      }
      this.getData();

      next();
    }
  }
};
</script>

<style>
</style>