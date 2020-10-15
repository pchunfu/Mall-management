<template>
  <el-dialog
    :title="info.isAdd ? '添加规格' : '编辑规格'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="规格名称">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
        <div class="con">
          <div class="input-wrap">
            <el-input v-model="item.value"></el-input>
          </div>
          <el-button type="primary" v-if="index==0" @click="addattr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="del(index)">删除</el-button>
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
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
     attrArr:[
        {value:""},
        {value:""}
     ],
      form: {
     specsname:"",
     attrs:"",
     status:1
      }
    };
  },
  computed: {
    ...mapGetters({
      
    })
  },
  methods: {
    ...mapActions({
       reqListAction:"specs/reqListAction",
       reqTotalAction:"specs/reqTotalAction",
    }),

    //新增规格属性
    addattr(){
      this.attrArr.push({value:''})
    },

    //删除规格属性

    del(index){
       this.attrArr.splice(index,1)
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
        specsname:"",
     attrs:"",
     status:1
      };
       this.attrArr=[
        {value:""},
        {value:""}
     ]
    },
    //修改了PId
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //点击添加按钮

    add() {

      console.log(this.attrArr.map(item=>item.value));

    this.form.attrs= JSON.stringify(this.attrArr.map(item=>item.value))

      reqSpecsAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          // 弹框消失
          this.cancel();

          //数据重置
          this.empty();

          //列表数据要刷新
          this.reqListAction();
           this.reqTotalAction()

        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情
    look(id) {
      //发请求
      reqSpecsDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list[0];
          //转数组
          this.attrArr=JSON.parse(this.form.attrs).map(item=>({value:item}))
          // this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    update() {
 
    this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.value))
      reqSpecsUpdate(this.form).then(res => {
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
  mounted() {}
};
</script>
<style scoped>
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>