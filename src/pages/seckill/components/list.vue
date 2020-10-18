<template>
<el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
 
    :tree-props="{children: 'children'}">
   
    <el-table-column prop="title" label="活动名称">
    </el-table-column>
    <el-table-column label="状态" prop="status">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
       <!-- <del-btn @confirm="dele(scope.row.id)"></del-btn> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqSeckDel} from "../../../utils/request"
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
props:[],
components:{},
data(){
return {
        
      };
},
computed:{
...mapGetters({
  list:"seckill/list"
}),
},
methods:{
...mapActions({
  reqSeckList : "seckill/reqListAction"
}),
//编辑
edit(id){
  this.$emit("edit",id)
},

// 删除
 del(id) {
        this.$confirm("是否删除？", "删除提示", {
          confirmButtonText: "删除",
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点了确定
           reqSeckDel(id).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg)
          //列表数据要刷新
          this.reqSeckList();
            }else{
              warningAlert(res.data.msg)
            }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
},
mounted(){
 
},
}
</script>
<style scoped>
</style>