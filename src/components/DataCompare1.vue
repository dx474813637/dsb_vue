<template>
  <transition name="el-fade-in-linear">
    <div class="data-compare-wrap transition-box" v-show="show">
      <div class="mask" @click="handleExit"></div>
      <el-card class="box-card data-compare-box">
        <div slot="header" class="clearfix">
          <strong>「 {{name}} 」 数据对比</strong>
          <el-button style="float: right; padding: 3px 0" type="text">
            <i title="关闭" @click="handleExit" style="font-size: 18px" class="el-icon-close"></i>
          </el-button>
        </div>

        <el-scrollbar style="height: 600px; width: 100%">
          <el-card class="box-card" shadow="never">
            <el-row :gutter="10">
              <el-col :span="8">
                <span class="box-select-title">比较对象</span>
                <el-cascader
                  :options="compareCgy"
                  :props="{ expandTrigger: 'hover', multiple: true }"
                  :clearable="true"
                  :collapse-tags="true"
                  v-model="dataObj"
                  @change="handleChangeObj"
                  :key="isShowKey"
                ></el-cascader>
              </el-col>
              <el-col :span="8">
                <span class="box-select-title">数据字段</span>
                <el-cascader
                  :options="kw"
                  :props="{ expandTrigger: 'hover' }"
                  v-model="dataKw"
                  @change="handleChangeKw"
                ></el-cascader>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size id="compareBtn" @click="getComparData">获取数据</el-button>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="box-card" shadow="never">
            <echart :diagramming="diagramming" :echartData="eData" :show="show" :settingTitle="settingTitle"></echart>
          </el-card>
          <el-card class="box-card" shadow="never" style="color: #7483a2; font-size: 14px">
            <el-row>
              <el-col :span="24">
                <p>对比工具使用说明：</p>
                <p>1、生成对比图需要选择对比数据的字段以及对象，支持多各对象数据对比。</p>
                <p>2、如未生成对比图并且显示“无数据对比”提示框，则首选公司在该字段下暂无数据。</p>
                <p>3、对比图最右侧一列为工具栏：（1）“切换为折线图”点击后对比图数据将以折线图呈现；（2）“切换为柱状图”点击后对比图数据将以柱状图呈现；（3）“还原”点击后全部还原初始对比图状态。</p>
                <p>4、右上角图例组件展现了不同系列的标记，颜色和名字。可以通过点击图例控制哪些系列不显示。</p>
                <p>5、底部组件用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。</p>
              </el-col>
            </el-row>
          </el-card>
        </el-scrollbar>
      </el-card>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import echart from "../components/BoxCardEcharts";
import eChartsOptions from "../untils/echartsOptions.js";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "数据库"
    },
    compareCgy: {
      type: Array
    },
    curDataObj: {
      type: [Array, String]
    },
    kwList: {
      type: Array
    },
    curKw: {
      type: String
    },
    api: {
      type: String
    },
    getKey: {
      type: String,
      default: 'cate'
    },
    dataType: {
      type: Array,
    },
    echartsXKey: {
      type: String
    },
    dataLabel: {
      type: Object
    },
    settingTitle: {
      type: String
    }
  },
  data() {
    return {
      dataKw: [this.curKw],
      dataObj: [this.curDataObj],
      eData: {},
      isShowKey: 0
    };
  },
  components: {
    echart
  },
  watch: {
    curDataObj(v) {
      this.dataObj = [v];
    },
    curKw(v) {
      this.dataKw = [v];
    },
    show() {
      let self = this
      this.$nextTick(function() {
        self.isShowKey ++
      })
    }
  },
  created() {
  },
  computed: {
    ...mapState(["diagramming"]),
    kw() {
      let obj = [];
      this.kwList.forEach(ele => {
        obj.push({
          value: ele.name,
          label: ele.title
        });
      });
      return obj;
    }
  },
  methods: {
    handleChangeObj() {
      // console.log(this.dataObj);
    },
    handleChangeKw() {
      // console.log(this.dataKw);
    },
    handleExit() {
      this.$emit("exit-compare", false);
    },
    getComparData() {
      if (this.dataObj.length <= 1) {
        this.$message({
          message: '至少选择两个比较对象',
          type: 'warning',
          showClose: true,
        });
        return;
      }else {
        this.getData()
      }
    },
    getData() {
      let arr = []
      let nameArr = []
      let self = this
      this.dataObj.forEach(ele => {
        let sObj = self.dataType.filter(item => ele[0] == item.value )[0]
        let name = ''
        if(sObj.children && sObj.children.length != 0) {
          name = sObj.children.filter(item => ele[1] == item.value )[0].label
        }else {
          name = sObj.label
        }
        nameArr.push(name)
        
        arr.push(self.getAjax(this.api, {[self.getKey]: name }))
        
      })
      this.$axios.all(arr)
        .then( res => {
          // console.log('请求全部完成')
          // console.log(res)
          self.eData = self.resToOptions(res, nameArr)
        })
        
    },
    resToOptions (res, nameArr) {
      let self = this
      let obj = {
          echartsType: "compare",
          dataList: {
            type: "bar",
            data: {
              x: [],
              y1: [],
            },
            xName: "时间",
            yName: nameArr,
            title: this.dataLabel[this.dataKw[0]]['title'],
            dw: "",
            colors: ["#409EFF", "#ff02b8"],
            key: "",
            main: nameArr
          }
        };
        // console.log(this.dataKw)
        let dataKw = this.dataKw
        let data = [];
        let arrX
        res.forEach( ele => {
          let dataObj = {};
          ele.data.list.forEach( item => {
            if(item[dataKw]) {
              dataObj[item[self.echartsXKey]] = item[dataKw]
            } 
          })
          data.push(dataObj)
          // arrX = [...new Set([...arrX, ...arr])]
        })
        // console.log(data)
        arrX = data.reduce( function ( preValue, curValue) {
          return [...new Set([...preValue, ...Object.keys(curValue)])]
        }, []).sort( (a, b) => parseInt(a) - parseInt(b))

        obj.dataList.data.x = arrX
        
        data.forEach(ele => {
          let arr = [];
          arrX.forEach( item => {
            arr.push(parseInt(ele[item]))
          })
          obj.dataList.data.y1.push(arr)
        })
        // console.log(obj)

        
        

      return eChartsOptions(obj)
    },
    getAjax(url, params) {
      return this.$axios.get(url, { params });
    }
  }
};
</script>

<style scoped>
.data-compare-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
}
.data-compare-wrap .mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.box-select-title {
  font-size: 14px;
}
.el-cascader {
  width: 70%;
}
.data-compare-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 90%;
  height: 90%;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>