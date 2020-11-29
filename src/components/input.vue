<template lang="html">
  <div>
    <input
      v-model="inputValue"
      @keydown.enter = "navigate"/>
    <span class="btn btn-big" @click="navigate">Kör &rarr;</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      inputValue: undefined
    }
  },
  computed: {
    value() {
      return this.inputValue.toLowerCase()
    }
  },
  methods: {
    navigate() {
      this.$router.push(`/${this.value}`);
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}

input {
  -webkit-appearance: none;
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-radius: 0;

  border: calc(var(--borderWidth) * 2) solid var(--clr-fg);
  background: LIGHTCYAN;
  color: var(--clr-fg);

  font: inherit;
  width: 20rem;
  height: calc(4rem - var(--borderWidth));
  font-size: 2rem;
  font-weight: 500;
  text-align: left;
  outline: none;
  padding: 0 .5rem;
  letter-spacing: 0.1em;

  text-transform: uppercase;
}
input::selection {
  background: var(--clr-fg);
  color: var(--clr-bg);
}
input:focus {
  background: TURQUOISE;
}

.btn-big {
  border: calc(var(--borderWidth) * 2) solid var(--clr-fg);
  border-left: 0;
  height: calc(4rem - var(--borderWidth));
  font-size: 2rem;
  line-height: 3.2rem;
  vertical-align: top;
}
</style>
