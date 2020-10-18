<template>
<div>
  <el-dialog
    :title="info.isAdd ? '添加商品' : '编辑商品'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="标题" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>

      <el-form-item label="图片" prop='img'>
         <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
            <input v-if="info.isshow" class="my-input" type="file" @change="getFile" />
          </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" @click="update" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {bannerList,reqBannerEdit,bannerInfo, bannerAdd} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
     form: {
        title:"",
        img:"",
        status:1
           },
      //图片地址
      imgUrl:"",

    };
  },
  computed: {
    ...mapGetters({
      list:"banner/list"
    }),
  },
  methods: {
     ...mapActions({
      reqListAction:"banner/reqListAction"
    }),

  //图片操作
  getFile(e){
    let file=e.target.files[0];
    if(file.size>2*1024*1024){
      warningAlert("文件不能超过2M")
      return;
    }
 // 2.是图片
      let imgExtArr = ['.jpg', '.png', '.jpeg', '.gif']
      let extname = file.name.slice(file.name.lastIndexOf('.')) // '.jpg'
      if (!imgExtArr.some((item) => item === extname)) {
        this.$message.error('文件格式不正确')
        return
      }
    this.imgUrl=URL.createObjectURL(file);
    this.form.img=file;
  },

    //取消
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置函数
    empty() {
      this.form = {
             title:"",
               img:"",
              status:1
                 };
    
      //图片地址
      this.imgUrl="";
              },

    //点击添加按钮

    add() {
      // console.log(this.form);
      bannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
          
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情
    look(id) {
      //发请求
       bannerInfo(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;

          //图片
          this.imgUrl = this.$imgPre + this.form.img;
         
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    update() {
      reqBannerEdit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
     
  }
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