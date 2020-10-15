<template>
<div>
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
 
    :tree-props="{children: 'children'}">
     <el-table-column label="规格编号" sortable width="180">
        <template slot-scope="scope">
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column prop="specsname" label="规格名称" sortable width="180">
    </el-table-column>
    <el-table-column label="规格属性">
      <template slot-scope="scope">
            <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
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
       <!-- <del-btn @confirm="dele(scope.row.id)"></del-btn> -->
      </template>
    </el-table-column>
  </el-table>

<!-- 分页组件 -->
    <el-pagination background layout="prev, pager, next" :total="total" 
    :page-size="size" @current-change="changePageAction">
    </el-pagination>

</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqSpecsDel} from "../../../utils/request"
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
  list:"specs/list",
  total:"specs/total",
  size:"specs/size",
}),
},
methods:{
...mapActions({
  reqListAction:"specs/reqListAction",
  reqTotalAction:"specs/reqTotalAction",
    changePageAction:"specs/changePageAction"
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
           reqSpecsDel(id).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg)
               this.reqListAction();
               this.reqTotalAction()
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
  this.reqListAction();
  this.reqTotalAction()
},
}
</script>
<style scoped>
</style>