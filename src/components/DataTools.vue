<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1" v-for="tool in toolsList" :key="tool.id">
        <div class="grid-content bg-purple" :title="tool.title" @click="changeShowStates(tool.id)">
          <i class="el-icon" :class="tool.iconClass"></i>
        </div>
      </el-col>
    </el-row>

    <transition name="el-fade-in-linear">
      <div class="tools-msg-module" v-show="boxShow">
        <div class="tools-msg-mask" @click="changeShowStates(boxList.id)"></div>
        <el-card class="box-card tools-msg-wrap" :key="boxList.id">
          <div slot="header" class="clearfix">
            <span>{{boxList.title}}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="changeShowStates(boxList.id)"
            >关闭</el-button>
          </div>

          <el-row>
            <template v-if="boxList.id == '0'">
              <el-col :span="24">
                <el-input
                  ref="titleInput"
                  :placeholder="boxList.title"
                  :prefix-icon="boxList.iconClass"
                  v-model="titleInput"
                ></el-input>
              </el-col>
            </template>
            <template v-else-if="boxList.id == '1'">
              <el-col :span="24">
                <el-select v-model="textSize" placeholder="请选择" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </template>
            <template v-else-if="boxList.id == '2'">
              <el-col :span="24" style="text-align: center">
                  <el-color-picker v-model="themeColor" class="demo"></el-color-picker>
              </el-col>
            </template>
            <el-col :span="24" style="text-align: center">
              <el-button type="primary" style="width: 150px" @click="saveState(boxList.id)">提交</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    titleVal: {
      type: String
    },
    sizeVal: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: '#409eff'
    }
  },
  data() {
    return {
      toolsList: [
        {
          id: 0,
          name: "title",
          title: "标题设置",
          iconClass: "el-icon-edit-outline",
          isShow: false
        },
        {
          id: 1,
          name: "size",
          title: "字体大小设置",
          iconClass: "el-icon-document-add",
          isShow: false
        },
        {
          id: 2,
          name: "color",
          title: "颜色设置",
          iconClass: "el-icon-brush",
          isShow: false
        },
        {
          id: 3,
          name: "watermark",
          title: "水印设置",
          iconClass: "el-icon-s-check",
          isShow: false
        },
        {
          id: 4,
          name: "download",
          title: "图表下载",
          iconClass: "el-icon-download",
          isShow: false
        },
        {
          id: 5,
          name: "restore",
          title: "还原设置",
          iconClass: "el-icon-refresh-left",
          isShow: false
        }
      ],
      titleInput: "",
      textSize: "16px",
      themeColor: "",
      options: [
        {
          value: "12px",
          label: "12px - 超小"
        },
        {
          value: "14px",
          label: "14px - 小"
        },
        {
          value: "16px",
          label: "16px - 普通"
        },
        {
          value: "18px",
          label: "18px - 大"
        },
        {
          value: "20px",
          label: "20px - 超大"
        }
      ],
    };
  },
  mounted() {
    this.titleInput = this.titleVal;
    this.textSize = this.sizeVal;
    this.themeColor = this.color;
  },
  watch: {
    titleVal(newV) {
      this.titleInput = newV;
    },
    sizeVal(newV) {
      this.textSize = newV;
    },
    color(newV) {
      this.themeColor = newV;
    }
  },
  computed: {
    boxShow() {
      return this.toolsList.some(ele => {
        return ele.isShow == true;
      });
    },
    boxList() {
      let obj = {
        id: 999999
      };
      let arr = this.toolsList.filter(ele => {
        return ele.isShow == true;
      });
      if (arr.length == 0) {
        return obj;
      }
      return arr[0];
    }
  },
  methods: {
    ...mapMutations(["changeDiagramming"]),
    saveState(id) {
      if (id == "0") {
        if (this.titleInput != this.titleVal) {
          this.$emit("setting-change", this.titleInput, 'title');
          this.changeShowStates(id);
          
          this.$message({
            message: "保存成功",
            type: "success",
            showClose: true
          });
        } else {
          this.$message({
            message: "内容相同",
            type: "warning",
            showClose: true
          });
        }
      } else if (id == "1") {
        // console.log(id)
        this.$emit("setting-change", this.textSize, 'textSize');
        this.changeShowStates(id);
        this.$message({
          message: "保存成功",
          type: "success",
          showClose: true
        });
        return;
      } else if (id == "2") {
        this.$emit("setting-change", this.themeColor, 'color');
        this.changeShowStates(id);
        this.$message({
          message: "保存成功",
          type: "success",
          showClose: true
        });
        return;
      }
    },
    changeShowStates(id) {
      if (id == 4) {
        this.$store.commit("changeDiagramming", true);
        // console.log(id);
      } else if (id == 5) {
        this.$store.commit("changeDiagramming", true);
        this.$emit("setting-change", '', 'title');
        this.$emit("setting-change", '', 'textSize');
        this.$emit("setting-change", '', 'color');
        
        this.$message({
          message: "还原成功",
          type: "success",
          showClose: true
        });
        // console.log(id);
      } else {
        this.$store.commit("changeDiagramming", true);
        this.toolsList[id].isShow = !this.toolsList[id].isShow;
        const body = document.querySelector("body");
        this.toolsList[id].isShow
          ? body.classList.add("no-scroll-body")
          : body.classList.remove("no-scroll-body");

      }
    }
  }
};
</script>

<style scoped>
.grid-content {
  text-align: center;
  cursor: pointer;
}
.el-icon {
  font-size: 18px;
  transition: all 0.3s;
}
.grid-content:hover .el-icon {
  color: #409eff;
}
.tools-msg-module {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
}
.tools-msg-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 250;
}
.tools-msg-wrap {
  position: absolute;
  z-index: 350;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-80%);
  width: 500px;
  border: 0;
}
.tools-msg-module .el-col {
  margin-bottom: 20px;
}
.el-select {
  width: 100%;
}
</style>
