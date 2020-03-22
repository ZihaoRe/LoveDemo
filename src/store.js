import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 默认会执行当前插件的install方法

// 通过 Vue中的一个属性 Store 创建一个store的实例
export default new Vuex.Store({
    state: {// 单一数据源  data
        selectedPhoto: null
    },
    strict:true,
    getters:{ // computed
        getSelectedPic(state){ // 以前用vue中的计算属性
            return state.selectedPhoto
        }
    },
    // 更新状态的唯一方式就是通过mutation
    mutations: {// mutation更改状态只能采用同步（严格模式下使用）  // method
        setSelected: function (state, index) {
            state.selectedPhoto = index;
        },
        random: function (state, range) {
            let max = Math.max(range[0],range[1]);
            let min = Math.min(range[0],range[1]);
            let diff = max - min;
            state.selectedPhoto =  Math.ceil(diff * Math.random() + min);
            return state.selectedPhoto;
        }
    },
    actions: {
        asyncChange({commit},payload){
            setTimeout(() => {
                commit('random',payload)
            }, 1000);
        }
    }
})
