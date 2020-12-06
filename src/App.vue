<template>
  <div id="app">
    <a
      href="https://gather.town/app/zmMawEVWm6ZpDXN7/krysscross"
      target="_blank"
      class="gatherlink"
      :class="{collapsed: collapsGatherLink}"
      @click="collapsGatherLink = 1"
    >
      <img src="https://gather.town/images/site/white_grape.png">
      <span>Öppna spelrum</span>
      <arrow dir="e" />
    </a>
    <h1 v-if="$root.title">{{$root.title}}</h1>
    <router-view :key="refreshKey"/>
    <p v-if="$root.width">Navigera med <arrow dir="w" /> <arrow dir="n" /> <arrow dir="s" /> <arrow dir="e" />  och byt skrivriktning med [mellanslag]. <span class="btn" @click="clearValues">Rensa planen</span><br/>Obs! När du fyller i planen sparas den som en kaka på din dator.</p>
  </div>
</template>

<script>
import Arrow from './components/arrow.vue';

export default {
  name: 'App',
  components: {
    Arrow
  },
  data() {
    return {
      refreshKey:0, //https://michaelnthiessen.com/force-re-render/
      collapsGatherLink: 0
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
  color: var(--clr-fg);
}

html {
  --clr-bg: pink;
  --clr-fg: blue;
  font-size: 16px;
  --borderWidth: 2px;
}
@media only screen and (max-width: 680px) {
  html {
    font-size: 12px;
    --borderWidth: 2px;
  }
}
@media only screen and (max-width: 490px) {
  html {
    font-size: 10px;
    --borderWidth: 1px;
  }
}
@media only screen and (max-width: 424px) {
  html {
    font-size: 8px;
    --borderWidth: 1px;
  }
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
  border: 2px solid var(--clr-fg);
  padding: 2px 6px;
  cursor: pointer;
  font-weight: 600;
}
.btn:hover {
  color: var(--clr-bg);
  background: var(--clr-fg);
}
.btn:hover svg {
  fill: var(--clr-bg);
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
a.gatherlink {
  position: fixed;
  display: flex;
  top: 0rem;
  right: 0;
  background: var(--clr-fg);
  color: #FFF;
  padding: .5rem 1rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.414rem;
  text-decoration: none;
  transition: right 0.4s;
}

a.gatherlink.collapsed {
  right: -10rem;
}

a.gatherlink.collapsed:hover {
  right: 0rem;
}

a.gatherlink span {
  color: #FFF;
}

a.gatherlink img {
  width: 1.414rem;
  height: 1.414rem;
  margin-right: 1rem;
}
a.gatherlink .arrow svg {
  fill: #fff;
  margin-left: 1rem;
}
</style>
