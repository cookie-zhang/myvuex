<template>
  <div class="hello">
    全局组件注册
    <button @click="handleClick('{}[]')">点击</button>
    <h1>{{ stack }}-{{ bo }}</h1>
    <button @click="handleArrClick([1,2,5,3], [2])">点击</button>
    <h2>{{newArr}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      bo: false,
      stack: [],
      newArr:[]
    };
  },
  methods: {
    handleClick(s) {
      if (s.length % 2 == 1) return false;
      let stack = [];
      for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
          case "(":
            stack.push(s[i]);
            break;
          case "{":
            stack.push(s[i]);
            break;
          case "[":
            stack.push(s[i]);
            break;
          case ")": {
            if (stack.pop() !== "(") return false;
            break;
          }
          case "]": {
            if (stack.pop() !== "[") return false;
            break;
          }
          case "}": {
            if (stack.pop() !== "{") return false;
            break;
          }
        }
      }
      this.stack = stack;
      return (this.bo = !stack.length);
    },

    handleArrClick(a1, a2) {
      for (let i = 0; i<a2.length; i++){
        a1.push(a2[i])
      }
      let newArr = a1
      if (newArr.length === 0) {
        return [];
      }
      this.newArr =  newArr.sort((a1, a2) => (a1 > a2 ? 1 : a1 < a2 ? -1 : 0));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
