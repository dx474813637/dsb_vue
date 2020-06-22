<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <el-container>
      <el-header class="header-dev-css">
        <div class="header-logo"></div>
      </el-header>
      <el-container class="container-dev-css">
        <el-aside class="aside-dev-css" width="250px">
          <el-scrollbar style="height: calc(100% - 40px);">
            <menu-left :menuLists="menuArr"></menu-left>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main class="main-dev-css">
            <router-view />
          </el-main>
          <el-footer class="footer-dev-css">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuLeft from "./components/MenuLeft.vue";
import menuArr from "./untils/MenuArr.js";
export default {
  data() {
    return {
      menuArr: menuArr,
    };
  },
  mounted: function() {
    // console.log(menuArr);
    // this.$axios({
    //   method: "get",
    //   url: "/Index/industry_json",
    //   params: {
    //     name: "零售电商",
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  },
  components: {
    menuLeft,
  },
};
</script>

<style>
@import url("./assets/css/header.css");
body {
  background: #f5f5f7;
}
.header-dev-css {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  z-index: 200;
}
.container-dev-css {
  padding-top: 60px;
  padding-left: 250px;
}
.aside-dev-css {
  background-color: #20335d;
  position: relative;
  position: fixed;
  top: 60px;
  left: 0;
  height: 100%;
}
.main-dev-css {
  min-height: 1000px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.box-card {
  margin-bottom: 15px;
}
.box-card .box-select-title {
  padding: 0px 10px;
}
</style>
