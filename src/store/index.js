import Vue from 'vue'
import Vuex from './vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        num: 0
    },
    getters:{
        getNum(state) {
            return state.num
        }
    }, 
    mutations:{
        incre(state, payload){
            return state.num += payload
        },
        minus(state, payload){
            return state.num -= payload
        }
    },
    actions: {
        asycIncre({commit}, payload){
            setTimeout(()=>{
                commit('incre',payload)
            },1000)
        },
        asycMinus({commit}, payload){
            setTimeout(()=>{
                commit('minus',payload)
            },1000)
        }

    }
})

export default store