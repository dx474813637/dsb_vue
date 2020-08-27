<template>
  <div>
    <el-row type="flex">
      <el-button
        :class="{ active: labelActive == label.name }"
        @click="handleClick(label.name)"
        v-for="(label, index) in labelData"
        :key="index"
        size="mini"
      >{{ label.title }}</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    labelData: Array,
    labelActive: {
      type: String
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleClick(item) {
      this.$emit("getLabelActive", item);
    }
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0;
}
.el-row {
  flex-wrap: wrap;
}
.el-row .el-button {
  flex: 0 0 150px;
  width: 150px;
  box-sizing: border-box;
  padding: 7px 0;
  text-align: center;
  margin-bottom: 10px;
  margin-right: 8px;
}
.el-button.active {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
