<template>
<div class="add">
<el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
 
    :tree-props="{children: 'children'}">
     <el-table-column prop="id" label="分类编号" sortable width="180">
        <template slot-scope="scope">
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" sortable width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
       <img :src="$imgPre+scope.row.img" v-if="scope.row.img!='null'" alt="">
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
</div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import {reqCateDel} from "../../../utils/request"
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
  list:"cate/list"
}),
},
methods:{
...mapActions({
  reqListAction:"cate/reqListAction"
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
           reqCateDel(id).then(res=>{
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
  img{
  width: 100px;
  height: 100px;
     }
</style>