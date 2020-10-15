<template>
<el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
 
    :tree-props="{children: 'children'}">
     <el-table-column label="角色编号" sortable width="180">
        <template slot-scope="scope">
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column prop="rolename" label="角色名称" sortable width="180">
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
       <!-- <del-btn @confirm="dele(scope.row.id)"></del-btn> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqRoleDel, reqRoleAdd} from "../../../utils/request"
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
  list:"role/list"
}),
},
methods:{
...mapActions({
  reqListAction:"role/reqListAction"
}),
//编辑
edit(id){
  this.$emit("edit",id)
},
// // 删除2
// dele(id){
// reqMenuDel(id).then(res=>{
//             if(res.data.code==200){
//               successAlert(res.data.msg)
//                this.reqListAction();
//             }else{
//               warningAlert(res.data.msg)
//             }
//            })
// },
// 删除
 del(id) {
        this.$confirm("是否删除？", "删除提示", {
          confirmButtonText: "删除",
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点了确定
           reqRoleDel(id).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg)
               this.reqListAction();
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
  this.reqListAction()
},
}
</script>
<style scoped>
</style>