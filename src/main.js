import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(vuex);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBZEM7C0rE5GAOEKUi7KjatmdYfudi4gTo',
	},
})

new Vue({
  render: h => h(App),
}).$mount('#app')

