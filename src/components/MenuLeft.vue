<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :default-openeds="defaultOpenedsArr"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#20335d"
      text-color="#fff"
      active-text-color="#00ffff"
      router
    >
      <menu-item
        v-for="menu in menuLists"
        :key="menu.id"
        :item="menu"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from "./MenuItemLeft.vue";
export default {
  name: "Menu",
  props: {
    menuLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultOpenedsArr: ["1", "2", "3", "4",],
      isCollapse: false,
    };
  },
  mounted() {
      // console.log(this.menuLists)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {
    MenuItem,
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
  border-right: 0;
}
.el-menu {
  border-right: 0;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu--inline {
  background-color: rgba(0, 0, 0, 0.1);
}

.el-menu-item,
.el-submenu__title,
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
