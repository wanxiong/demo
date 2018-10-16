<template>
  <div id="app" class="max-app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {getUuid} from '@/utils/index'
  import {mapActions} from 'vuex'
  export default {
    name: 'App',
    created() {
      this.initUuid();
    },
    methods: {
      initUuid() {
        let uid = getUuid();
        this.setUuid(uid)
      },
      ...mapActions([
        'setUuid'
      ]),
    },
  }
</script>
<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
}
.max-app{
  height: 100%;
}
</style>
