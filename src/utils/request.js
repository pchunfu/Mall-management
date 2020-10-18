import { data } from "autoprefixer";
import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store"
import { warningAlert } from "./alert"
import router from "../router"

//开发环境下使用
Vue.prototype.$imgPre = "http://localhost:3000"

let baseUrl = "/api";

//打包的话弄成
// Vue.prototype.$imgPre=""

// let baseUrl="";

//请求拦截 后台app.js拦截打开
axios.interceptors.request.use(config => {
    if (config.url != baseUrl + "/api/userlogin") {

        config.headers.authorization = store.state.userInfo.token;
    }
    return config;
})


//响应拦截
axios.interceptors.response.use(res => {
    console.group("=====本次请求路径是:" + res.config.url)
    console.log(res);
    console.groupEnd()

    //用户掉线了

     if(res.data.msg=="登录已过期或访问权限受限"){
         warningAlert(res.data.msg)
         router.push("/login")
     }
    return res;
})


//登录
export const reqLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}

//菜单管理

//添加接口
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//编辑1条
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}


/*********角色管理***************/
//添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
//删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqRoleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}



/*********管理员管理***************/
//添加
export const reqManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}

//列表 params={page:1,size:10}
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}
//删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}

//1条
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//修改
export const reqManageUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}


/*********商品分类***************/
//添加
export const reqCateAdd = (params) => {
    let data = new FormData()
    //    data.append("pid",1)
    //    data.append.append("catename","123")
    //    data.append("img",File)
    //    data.append("status",1) 
    for (let i in params) {
        data.append(i, params[i])
    }

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

//列表 params={}
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
//删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqCateUpdate = (params) => {

    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}


/*********商品规格管理***************/
//添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}

//列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}


/*****************商品管理******************* */

//添加
export const reqGoodsAdd = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}
//总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",

    })
}
//列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}
//详情

export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {id}
    })
}

//修改
export const reqGoodsUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}
//删除

export const reqGoodsDel = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


/*********会员管理***************/

//列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",

    })
}


//1条
export const reqMemberDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: { uid }
    })
}

//修改
export const reqMemberUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}


/** * ***************轮播图*********************/
// 轮播图添加
export const bannerAdd = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/banneradd',
        data: data
    })
}
// 轮播图修改
export const reqBannerEdit = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/banneredit',
        data: data
    })
}
// 轮播图列表
export const bannerList = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/bannerlist'
    })
}
// 轮播图获取（一条）
export const bannerInfo = (id) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/bannerinfo',
        params: { id }
    })
}
// 轮播图删除
export const bannerDelete = (id) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/bannerdelete',
        data: { id }
    })
}
/*********************秒杀管理**********************/

// 限时秒杀添加

export const reqSeckAdd = (params) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: params,
    })
}


// 限时秒杀列表 

export const reqSeckList = () => {
    return axios({
        url: baseUrl + '/api/secklist',
    })
}


// 限时秒杀获取一条
export const reqSeckInfo = (id) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        params: {
            id,
        }
    })
}

// 限时秒杀修改 

export const reqSeckEdit = (params) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: params,
    })
}


export const reqSeckDel = (id) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: {
            id,
        }
    })
}