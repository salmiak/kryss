<template>
  <span class="arrow">
    <svg
      :class="{'north': dir==='n', 'west': dir ==='w', 'south': dir === 's', 'east': dir === 'e'}"
      :style="{width: size + 'rem', height: size + 'rem'}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
      <polygon points="9,6 9,2 15,7.5 9,13 9,9 3,9 1,9 1,6 "/>
    </svg>
  </span>
</template>

<script>
export default {
  name: "Arrow",
  props: {
    dir : String,
    size: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="css" scoped>
.arrow svg {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  fill:currentColor;
}
.arrow svg.north {
  transform: rotate(-90deg);
}
.arrow svg.south {
  transform: rotate(90deg);
}
.arrow svg.west {
  transform: rotate(180deg);
}
</style>
