export const state={
   //用户信息
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations={
    changeUserInfo(state,info){
        state.userInfo=info;
        //状态层刷新，数据就没有了。所以要存一份
        sessionStorage.setItem("userInfo",JSON.stringify(info))
    ///如果info是一个{} ，那么代表要退出，删；如果不是一个空{},代表是登录，存
    if (info.id) {
        sessionStorage.setItem("userInfo", JSON.stringify(info))
    } else {
        sessionStorage.removeItem("userInfo")
    }
    }
}
export const getters={
    userInfo(state){
        return state.userInfo;
    }
}