<template>
<div>
<el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
 
    :tree-props="{children: 'children'}">
     <el-table-column prop="id" label="编号" >
    </el-table-column>
    <el-table-column prop="title" label="轮播图标题">
    </el-table-column>
    <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {bannerDelete} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    })
  },
  methods: {
    ...mapActions({
      reqListAction:"banner/reqListAction"
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
   // 删除
    del(id) {
      this.$confirm("是否删除？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了确定
          bannerDelete(id).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqListAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  mounted() {
    this.reqListAction()
  }
};
</script>
<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>