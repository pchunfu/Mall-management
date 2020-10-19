<template>

<el-dialog :title="info.isAdd?'添加商品':'编辑商品'" 
:visible.sync="info.isshow" 
@closed="close">
  <el-form ref="form" :model="form" label-width="80px">
    
    <el-form-item label="上级分类">
      <el-select v-model="form.pid" placeholder="请选择上级分类">
        <el-option label="顶级分类" :value="0"></el-option>
         <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option> 
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称" prop='catename'>
      <el-input v-model="form.catename"></el-input>
    </el-form-item>


               <!-- 图片上传文件   v-if="form.pid!=0" -->
    <el-form-item label="图片" v-if="form.pid!=0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
            <input v-if="info.isshow" class="my-input" type="file" @change="getFile" />
          </div>
        </el-form-item>


    <el-form-item label="状态">
      <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
    </el-form-item>
  </el-form>

   <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
         <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {reqCateAdd,reqCateDetail,reqCateUpdate} from "../../../utils/request";
import {warningAlert,successAlert} from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
    //图片地址
      imgUrl:"",
      form: {
          pid:0,
          catename:"",
          img: null,
          status:1
      },
       formRule: {
        catename: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
     list:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
      reqListAction:"cate/reqListAction"
    }),


    //获取文件
    getFile(e){

      let file=e.target.files[0];
      //  console.log(file);
     //1.大小不超过2M 1M=1024KB 1KB=1024B
      if(file.size>2*1024*1024){
        warningAlert("文件不能超过2M")
        return;
      }

      //2.是图片
      let imgExtArr=['.jpg','.png','.jpeg','.gif'];
      let extname=file.name.slice(file.name.lastIndexOf("."));//'.jpg'
      if(!imgExtArr.some(item=>item==extname)){
        warningAlert("文件格式不正确")
        return;
      }
      


       //这个方法可以通过文件生成一个地址
       this.imgUrl=URL.createObjectURL(file)
      //  console.log(imgUrl);
        
      //将文件保存在form中
       this.form.img=file;
    },

    //取消
    cancel(){
      this.info.isshow=false;
  },
//弹框消失完成
    close(){
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if(!this.info.isAdd){
        this.empty()
      }
    },
 //数据重置函数
    empty(){
        this.form={
         
          pid:0,
          catename:"",
          img: null,
          status:1
     
      }
      this.imgUrl=""
    },

  //点击添加按钮

  add(){
    console.log(this.form);
    
      reqCateAdd(this.form).then(res=>{
     if(res.data.code==200){
          //成功
          successAlert(res.data.msg)

          // 弹框消失
          this.cancel()

          //数据重置
          this.empty()

          // 列表数据要刷新
          this.reqListAction()
     }else{
       warningAlert(res.data.msg)
     }
      })
  },
  
  //获取菜单详情
   look(id) {
      //发请求
      reqCateDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl=this.$imgPre +this.form.img
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    update() {
      reqCateUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    }, 
  mounted() {}
};
</script>
<style scoped>

.my-upload{
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;

}
.my-upload h3{
  text-align: center;
  line-height: 150px;
  font-size: 50px;
}
.my-upload .my-input{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
opacity: 0;
  cursor: pointer;
}
.my-upload .img{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
}
</style>