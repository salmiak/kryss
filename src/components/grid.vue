<template lang="html">
  <div
    :style="{'grid-template-columns': `repeat(${width}, 1fr)`}"
    class="grid">
    <div
      v-for="(cell,idx) in layout"
      :key="idx"
      :class="['cell', {
        black: !cell,
        endh: cell.endh,
        endv: cell.endv,
        turnh: cell.turnh,
        turnv: cell.turnv
        }]"
      :data-nbr="cell.nbr">
      <input
        v-if="cell"
        :ref="`cell${idx}`"
        @keyup.up="goN"
        @keyup.down="goS"
        @keyup.left="goW"
        @keyup.right="goE"
        @keyup.enter="goS"
        @keyup.delete="goPrev"
        @focus="updateFocus(idx)"
        @input="validateCell(idx,true)"
        @click="dirH = !dirH"
        class="cell-input"
        v-model="values[idx]" />
    </div>
  </div>
</template>

<script>
import layout from '../layouts/xmas.json';

export default {
  data() {
    return {
      width: 10,
      layout,
      values: new Array(layout.length),
      dirH: true,
      elInFocus: undefined,
      currentFocus: undefined
    }
  },
  methods: {
    updateFocus(idx) {
      this.currentFocus = idx;
    },
    validateCell(idx, step) {
      if (this.values[idx] == "")
        return
      this.values[idx] = this.values[idx].toUpperCase().slice(-1)
      if(step)
        this.goNext()
    },
    goNext() {
      let next = this.currentFocus + (this.dirH?1:this.width);
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    },
    goPrev() {
      let next = this.currentFocus - (this.dirH?1:this.width);
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    },
    goN() {
      let next = this.currentFocus - this.width;
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    },
    goS() {
      let next = this.currentFocus + this.width;
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    },
    goW() {
      let next = this.currentFocus - 1;
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    },
    goE() {
      let next = this.currentFocus + 1;
      if (this.$refs[`cell${next}`])
        this.$refs[`cell${next}`][0].focus()
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.grid {
  display: inline-grid;
  margin: 0 auto;
  border: 2px solid blue;
  justify-content: center;
}
.cell {
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  border: 2px solid blue;
  text-align: center;
  position: relative;
  z-index: 0;
}
.cell.black {
  background: blue;
}
.cell.endh {
  border-right-width: 0.5rem;
}
.cell.endv {
  border-bottom-width: 0.5rem;
}
.cell[data-nbr]::before {
  content: attr(data-nbr);
  color: blue;
  position: absolute;
  top: 0;
  left: 0.25rem;
  line-height: 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  z-index: 100;
}
.cell.turnh::after {
  content: '\21B3';
  color: blue;
  position: absolute;
  bottom: -.125rem;;
  left: 0.25rem;
  line-height: 1.25rem;
  font-size: 1.414rem;
  font-weight: 600;
  z-index: 100;
}
.cell.turnv::after {
  content: '\21B5';
  transform: rotate(-90deg);
  color: blue;
  position: absolute;
  top: 0.4rem;
  right: -.25rem;
  line-height: 1rem;
  font-size: 1.414rem;
  font-weight: 600;
  z-index: 100;
}

.cell-input {
  -webkit-appearance: none;
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  font: inherit;
  width: 100%;
  height: calc(4rem - 4px);
  max-height: 100%;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  color: blue;
  outline: none;
}
.cell-input:focus {
  background: lightblue;
}
</style>
