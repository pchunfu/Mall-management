<template>
  <el-dialog
    :title="info.isAdd ? '添加角色' : '编辑角色'"
    :visible.sync="info.isshow"
    @closed="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <!-- 树形控件 -->
      <el-form-item label="角色权限">
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
           ref="tree"
          :props="{children: 'children',label: 'title',}">
        </el-tree>
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
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
        
       form: {
        rolename:"",
        menus:'[]',
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
     //菜单list
      menuList: "menu/list",
    })
  },
  methods: {
    ...mapActions({
       //请求菜单list
      reqMenuListAction: "menu/reqListAction",
      //角色的list
      reqRoleList:"role/reqListAction"
    }),
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
       rolename:"",
        menus:'[]',
        status: 1,
      };
      //树形控件设置空值
      this.$refs.tree.setCheckedKeys([])
    },
    // //修改了PId
    // changePid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }
    // },
    //点击添加按钮

    add() {

        // console.log(this.$refs.tree.getCheckedKeys());
        // console.log(this.form);
        //树形控件取值
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

         

          //数据重置
          this.empty();
           // 弹框消失
          this.cancel();

          //列表数据要刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情
    look(id) {
      //发请求
      reqRoleDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        //给树形控件赋值

        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //编辑
    update() {
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
      //是否请求过
      if(this.menuList.length==0){
          this.reqMenuListAction()
      }
  },
};
</script>
<style scoped>
</style>