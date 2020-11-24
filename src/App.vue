<template>
  <div id="app">
    <h1>{{$root.title}}</h1>
    <router-view/>
    <p v-if="$root.width">Navigera med &larr; &uarr; &darr; &rarr; och byt skrivriktning med [mellanslag].</p>
  </div>
</template>

<script>

export default {
  name: 'App'
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
