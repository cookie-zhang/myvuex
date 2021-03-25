let Vue;
class Store {
    constructor(options){
        // options 要将传递多了的 state mutaion getter ....  变成响应式数据
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })
        // for getters
        let getters = options.getters || {} // 拿到传递过来的getters 如果没有 默认控对象 {}
        this.getters = {} // 当前实例
        Object.keys(getters).forEach(getttersFn => {
            // 给当前实例添加getNum 这个方法， 也就是getters里面的所有方法
            Object.defineProperty(this.getters,getttersFn,{
                get: ()=>{
                    return getters[getttersFn](this.state)
                }
            })
        })
        // for mutaions
        let mutations = options.mutations || {}
        this.mutations = {} // 当前实例
        Object.keys(mutations).forEach(mutationsFn=>{
            this.mutations[mutationsFn] = payload=>{
                mutations[mutationsFn](this.state, payload)
            }
        })
        // for actions
        let actions = options.actions || {}
        this.actions = {} // 当前实例
        Object.keys(actions).forEach(actionsFn=>{
            this.actions[actionsFn] = payload => {
                actions[actionsFn](this, payload)
            }
        })
    }
    // action 异步
    dispatch(actionsFn, payload){
        this.actions[actionsFn](payload)
    }
    // mutaions 同步
    commit = (mutationsFn, payload) => {
        this.mutations[mutationsFn](payload)
    }
    // get 方法就是为了在页面中使用this.$store.state 能拿到值
    get state(){
        return this.vm.state
    }
}
// 插件的固定写法，只有这么写  在Vue.use() 的时候才能使用
const install = (v)=>{
    //console.log(v)
    Vue = v;
    // 调用mixin将$store添加到每个组件中,这也是为什么每个组件都能调用this.#store的原因
    Vue.mixin({
        beforeCreate(){
           // console.log(this.$options.name) // root // 说明是根结点
            // mixin给每个组件都混入beforeCreate生命周期，当组件渲染的时候，就拿到跟组件的store赋值给当前的store,也就是为什么每个页面都可以使用this.$store的原因
            // 判断是不是根结点
            if(this.$options && this.$options.store){                                      //     |
                this.$store = this.$options.store   // <------------------------------------------|
            } else {
                // 如果不是根结点，那么去找他的父节点，寻找父节点的store  依次向上查找寻找根结点store
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
export default {
    install,
    Store
}




/**
 * 1. 为什么能再多有页面都可以使用store，因为把store挂在到了所有的组件中，也就是挂载在所有的页面里
 * 使用mixin方式，在beforeCreat的生命周期中去寻找根结点，获取根结点store
 * 2.创建store，将初始化数据state变成响应式，new vue实例，写在data中，因为getter、mutations、actions里面都是方法，
 * 创建本地对象，遍历里面的方法，将方法都添加在本地实例中，
 * 
 * ***/