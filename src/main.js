import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import VueGeolocation from 'vue-browser-geolocation'
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DropdownPlugin, NavPlugin, NavbarPlugin } from 'bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// // Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import {
  faHome,
  faUser,
  faUserPlus, 
  faSignInAlt,
  faSignOutAlt,
  faAddressCard,
  faAddressBook,
  faAtlas,
  faMapMarkerAlt,
  faPortrait
} from '@fortawesome/free-solid-svg-icons';

import vuetify from './plugins/vuetify';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, 
            faAddressCard, faAddressBook, faAtlas, faMapMarkerAlt,
            faPortrait);

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDNbmKqkdmZL_Y_YxXKg73KsQSrzoqlY18",
  },
});

Vue.config.productionTip = false;
Vue.use(VueGeolocation)

Vue.use(DropdownPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)



Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
