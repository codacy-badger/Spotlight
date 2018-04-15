<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    beforeCreate: function () {
      this.spotify =  JSON.parse('{"' + this.$route.hash.replace(/#/g, '').replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value)
      });
    }
  }
</script>

<style>
  #app {
    height: 100%;
  }
</style>
