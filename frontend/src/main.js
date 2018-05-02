// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAnalytics from 'vue-analytics';

Vue.use(vueAnalytics, {
  id: 'UA-45417075-22',
  router,
  autoTracking: {
    exception: true
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {}
})
