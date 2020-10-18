<template>
  <el-dialog
    :title="info.isAdd ? '添加活动' : '编辑活动'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称" required>
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" required>
          <el-date-picker
           v-model="time"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getTime"
          ></el-date-picker>
        </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="form.first_cateid" @change="changeFirst">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="form.second_cateid" @change="changeSecond">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" prop="second_cateid">
        <el-select v-model="form.goodsid">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
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
      <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" @click="update()" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
 reqSeckAdd,
  reqSeckInfo,
  reqSeckEdit,
  reqCateList,
  reqGoodsList,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
import seckill from '../../../store/modules/seckill';
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: '',
        endtime: null,
        begintime: null,
        first_cateid: '',
        second_cateid: '',
        status: 1,
        goodsid: ''
      },
      //请求回来的二级分类的list，自己命名为
      secondCateList:[],
      time:[],
      // goodsList: [],
    };
  },
  computed: {
    ...mapGetters({
    //商品分类list
      cateList: "cate/list",
    //商品管理list
    goodsList:"goods/list",
    //秒杀管理的list
    seckillList:"seckill/list"

    })
  },
  methods: {
    ...mapActions({
      //请求商品分类一下list，万一不在状态层
      reqCateList: "cate/reqListAction", 
      //请求商品管理的list
      reqGoodsList: "goods/reqListAction",
      //请求秒杀的list
      reqSeckList : "seckill/reqListAction"
      
    }),

    //一级分类修改，获取展示二级分类
    changeFirst(){
      //一级分类改变了，二级分类的值应该置空，跟着改变
      this.form.second_cateid = ''
     reqCateList({pid:this.form.first_cateid}).then(res=>{
       //二级list
     this.secondCateList = res.data.list
     })
    },
   //二级分类修改，获取展示三级分类
    changeSecond(){
      //一级分类改变了，二级分类的值应该置空，跟着改变
      this.form.goodsid = ''
       this.reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      })
    },
    //````````````````````````````````````````````

    getTime() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
    },


        //`````````````````````````````````````
    checkedData() {
      if (this.form.title == "") {
        warningAlert("活动名称不能为空");
        return false;
      }
      if (this.time.length == 0) {
        warningAlert("活动期限不能为空");
        return false;
      }
      if (
        this.form.first_cateid == "" ||
        this.form.second_cateid == "" ||
        this.form.goodsid == ""
      ) {
        warningAlert("活动商品不能为空");
        return false;
      }
      return true;
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
         title: '',
        endtime: null,
        begintime: null,
        first_cateid: '',
        second_cateid: '',
        status: 1,
        goodsid: ''
      };
       this.time = "";
      this.secondCateList = [];
      // this.goodsList = [];
    },

    //点击添加按钮

    add() {
       if (!this.checkedData()) {
        return;
      }
      reqSeckAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();
          // 弹框消失
          this.cancel();

          //列表数据要刷新
          this.reqSeckList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情
    look(id) {
      //发请求
      reqSeckInfo(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          changeFirst();
          changeSecond();
          this.time = [
          new Date(parseInt(this.form.begintime)),
          new Date(parseInt(this.form.endtime)),
        ];
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    update() {
         if (!this.checkedData()) {
        return;
      }
       if (this.time.length != 0) {
        this.getTime();
      }
       reqSeckEdit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.seckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    //商品一级list是否请求过，没有，走一下
    if (this.cateList.length == 0) {
       this.reqCateList();
    }
    this.reqSeckList();
  }
};
</script>
<style scoped>
</style>