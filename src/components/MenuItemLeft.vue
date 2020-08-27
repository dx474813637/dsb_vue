<template>
  <div v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-menu-item :index="item.path">
        <i class="el-icon-menu"></i>
        {{ item.name }}
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="item.id">
        <template slot="title">
          <i class="el-icon-folder"></i>
          <span slot="title">{{ item.name }}</span> </template
        >
        <template v-for="child in item.children">
          <menu-item
            v-if="child.children && child.children.length > 0"
            :item="child"
            :key="child.id"
          />
          <el-menu-item v-else :key="child.id" :index="child.path">
            <i class="el-icon-s-data"></i>
            {{ child.name }}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      default: function () {
          return []
      }
    },
  },
  mounted () {
      // console.log(this.item)
  }
};
</script>

<style></style>
