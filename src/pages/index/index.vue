<template>
  <el-container class="index">
    <el-aside class="left" width="200px">
      <!-- 左侧导航 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#20222a"
        text-color="#fff"
        router
        unique-opened
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

          <!-- 动态侧边栏 -->
        <div v-for="item in userInfo.menus" :key="item.id">
          <!-- 是目录 -->
          <el-submenu :index="item.id+''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 菜单 -->
          <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">导航
        <div class="header-con">
          <h3>{{userInfo.username}}</h3>
          <el-button type="danger" @click="logOut()">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="main">
        <!-- 面包屑 -->
        <el-breadcrumb v-if="$route.name" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 二级路由出口 -->
        <router-view class="con"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    })
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
    logOut(){
      this.changeUserInfoAction({});
        this.$router.push("/login")
      
    }
  },
  mounted() {}
};
</script>
<style scoped>
.index {
  height: 100vh;
  
}
.left{
background: #20222a;
}
.header {
  background: #b3c0d1;
  text-align: center;
  line-height: 50px;
}
.main {
  background: #ffffff;
}
.con{
  padding-top: 20px;
}

.header-con{
  float: right;
}
.header-con h3{
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.header-con .el-button{
  float: left;
  margin-top: 10px;
}
</style>