<template>
  <div id="large-header" class="large-header">
    <canvas id="demo-canvas" />
  </div>
</template>

<script>
import eventListener from './js/main'
import './js/tweenLite.min'
import './js/easePack.min'
import './js/raf'
export default {
  mounted () {
    this.listner = eventListener()
  },
  destroyed () {
    Object.keys(this.listner).forEach(event => {
      window.removeEventListener(event, this.listner[event], false)
    })
  }
}
</script>

<style lang="scss" scoped>
  .large-header {
    overflow: hidden;
    position: absolute;
    width: 100%;
  }
</style>
