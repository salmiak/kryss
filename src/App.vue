<template>
  <div id="app">
    <h1 v-if="$root.title">{{$root.title}}</h1>
    <router-view :key="refreshKey"/>
    <p v-if="$root.width">Navigera med &larr; &uarr; &darr; &rarr; och byt skrivriktning med [mellanslag]. <span class="btn" @click="clearValues">Rensa planen</span></p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      refreshKey:0 //https://michaelnthiessen.com/force-re-render/
    }
  },
  methods: {
    clearValues() {
      localStorage.setItem(`values-${this.$route.params.name}`, JSON.stringify([]));
      this.refreshKey ++;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  color: blue;
}
h1 {
  margin-bottom: 1rem;
}
p {
  margin-top: 1rem;
  font-weight: 500;
}
.btn {
  display: inline-block;
  border: 2px solid blue;
  padding: 2px 6px;
  cursor: pointer;
  font-weight: 600;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
