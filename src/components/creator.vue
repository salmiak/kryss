<template lang="html">
  <div class="Creator">
    <div class="">
      Creator Mode:
      W: <input type="number" step="1" v-model="$root.width">
      H: <input type="number" step="1" v-model="height">
    </div>
    <grid />
  </div>
</template>

<script>
import Grid from './grid.vue'
export default {
  data() {
    return {
      height: 9
    }
  },
  mounted() {
    this.$root.width = 10
    this.$root.title = 'Creator mode'
    this.updateLayoutSize()
  },
  components: {
    Grid
  },
  watch: {
    height() {
      this.updateLayoutSize()
    },
    '$root.width': function() {
      this.updateLayoutSize()
    }
  },
  methods: {
    updateLayoutSize() {
      let newLength = this.$root.width * this.height
      if ( this.$root.cells.length > newLength) {
        this.$root.cells = this.$root.cells.slice(0, newLength)
      } else {
        this.$root.cells = this.$root.cells.concat( (new Array(newLength - this.$root.cells.length)).fill(1) )
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
