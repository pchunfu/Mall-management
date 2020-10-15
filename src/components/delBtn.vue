<template>
<div>
<el-button @click="del" type="danger">删除</el-button>
</div>
</template>
<script>

export default {

methods:{
    del(){
        this.$confirm("是否删除？", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: "el-button el-button--danger",
        })
        .then(() => {
         this.$emit("confirm")
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
};


</script>
<style scoped>
</style>