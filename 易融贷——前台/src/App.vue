<template>
  <div id="app" refs="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    background: #f8f8f8;
  }
</style>
