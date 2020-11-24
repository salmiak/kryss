<template lang="html">
  <div
    :style="{'grid-template-columns': `repeat(${width}, 1fr)`}"
    class="grid"
    v-if="layout.length">
    <div
      v-for="(cell,idx) in layout"
      :key="idx"
      :class="['cell', {
        black: !cell,
        endh: cell.endh,
        endv: cell.endv,
        turnh: cell.turnh,
        turnv: cell.turnv,
        active: activeCells.indexOf(idx) !== -1
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
        @keyup.delete="clearAndGoPrev"
        @keyup.space="dirH = !dirH"
        @focus="updateFocus(idx)"
        @blur="clearFocus"
        @input="validateCell(idx,true)"
        @mousedown="toggleDir(idx)"
        class="cell-input"
        v-model="values[idx]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Grid",
  data() {
    return {
      values: [],
      dirH: true,
      elInFocus: undefined,
      currentFocus: undefined
    }
  },
  mounted() {
    if (localStorage.getItem(this.storeTarget))
      return this.values = JSON.parse(localStorage.getItem(this.storeTarget))
    this.values = []
  },
  watch: {
    storeTarget() {
      if (localStorage.getItem(this.storeTarget))
        return this.values = JSON.parse(localStorage.getItem(this.storeTarget))
      this.values = []
    },
    values() {
      localStorage.setItem(this.storeTarget, JSON.stringify(this.values));
    }
  },
  computed: {
    storeTarget() {
      return `values-${this.$route.params.name}`
    },
    width() {
      return this.$root.width
    },
    layout() {
      return this.$root.cells
    },
    title() {
      return this.$root.title
    },
    activeCells() {
      if (this.currentFocus === undefined)
        return []

      let step = (this.dirH?1:this.width);
      let o = [this.currentFocus];

      let i = this.currentFocus;
      let go = true;

      while(go && i < this.layout.length) {
        o.push(i);

        if (this.dirH) {
          go = go && !this.layout[i].endh
        } else {
          go = go && !this.layout[i].endv
        }

        i += step;

        go = go && this.layout[i] !== 0;
        go = go && i%this.width
      }

      i = this.currentFocus;
      go = true;

      while(go && i > -1) {
        o.push(i);

        i -= step;

        go = go && this.layout[i];

        if (this.dirH) {
          go = go && !this.layout[i].endh
          go = go && (i+1)%this.width
        } else {
          go = go && !this.layout[i].endv
        }
      }
      return o
    }
  },
  methods: {
    posCaretAtEnd() {
      let el = this.$refs[`cell${this.currentFocus}`][0]
      // Source: https://davidwalsh.name/caret-end
      if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
      } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    },
    updateFocus(idx) {
      this.currentFocus = idx;
      this.posCaretAtEnd()
    },
    clearFocus() {
      this.currentFocus = undefined;
    },
    toggleDir(idx) {
      if (idx === this.currentFocus) {
        this.dirH = !this.dirH
      }
    },
    validateCell(idx, step) {
      if (this.values[idx] === "" || this.values[idx].slice(-1) == " " || this.values[idx].charAt(0) == " ") {
        return this.values[idx] = this.values[idx].trim()
      }
      this.values[idx] = this.values[idx].toUpperCase().slice(-1)
      if(step)
        this.goNext()
    },
    clearAndGoPrev() {
      this.values[this.currentFocus] = ""
      this.goPrev()
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
      this.posCaretAtEnd()
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
      this.posCaretAtEnd()
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

<style lang="css">
* {
  box-sizing: border-box;
}
*::selection {
  background: transparent;
}
body {
  background: pink;
}
.grid {
  display: inline-grid;
  margin: 0 auto;
  border: var(--borderWidth) solid blue;
  justify-content: center;
}
.cell {
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  border: var(--borderWidth) solid blue;
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
.cell.active .cell-input {
  background: LIGHTCYAN;
}

.cell-input {
  -webkit-appearance: none;
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-radius: 0;

  color: transparent;
  text-shadow: 0 0 0 blue;

  font: inherit;
  width: 100%;
  height: calc(4rem - 4px);
  max-height: 100%;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  outline: none;
}
.cell.active .cell-input:focus {
  background: TURQUOISE;
}
</style>
