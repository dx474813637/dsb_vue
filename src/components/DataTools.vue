<template>
  <el-row :gutter="20">
    <el-col :span="1" v-for="tool in toolsList" :key="tool.id">
      <div class="grid-content bg-purple" :title="tool.title">
        <i class="el-icon" :class="tool.iconClass"></i>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      toolsList: [
        {
          id: 0,
          name: "title",
          title: "标题设置",
          iconClass: "el-icon-edit-outline",
        },
        {
          id: 1,
          name: "size",
          title: "字体大小设置",
          iconClass: "el-icon-document-add",
        },
        {
          id: 2,
          name: "color",
          title: "颜色设置",
          iconClass: "el-icon-brush",
        },
        {
          id: 3,
          name: "watermark",
          title: "水印设置",
          iconClass: "el-icon-s-check",
        },
        {
          id: 4,
          name: "download",
          title: "图表下载",
          iconClass: "el-icon-download",
        },
        {
          id: 5,
          name: "restore",
          title: "还原设置",
          iconClass: "el-icon-refresh-left",
        },
      ],
    };
  },
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
</style>
