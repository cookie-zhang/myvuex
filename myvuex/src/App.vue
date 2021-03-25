<!--
 * @Author: your name
 * @Date: 2021-03-25 13:07:26
 * @LastEditTime: 2021-03-25 13:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myvuex/myvuex/src/App.vue
-->
<template>
  <div id="app">
   <h2> num:{{this.$store.state.num}} </h2>
   <h2> getNum:{{this.$store.getters.getNum}} </h2>
   <h2> <button @click="handleIncre">增加</button></h2>
   <h2> <button @click="handleMiuns">减少</button></h2>
   <h2> <button @click="handleAsnycIncre">异步增加</button></h2>
   <h2> <button @click="handleAsnycMiuns">异步减少</button></h2>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    handleIncre(){
      this.$store.commit('incre', 5)
    },
    handleMiuns(){
      this.$store.commit('minus', 5)
    },
    handleAsnycIncre(){
      this.$store.dispatch('asycIncre',9)
    },
    handleAsnycMiuns(){
      this.$store.dispatch('asycMinus', 8)        
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
