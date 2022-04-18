import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Vue3Autocounter from 'vue3-autocounter';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

createApp(App)
    .component('vue3-autocounter', Vue3Autocounter)
    .component('BootstrapIcon', BootstrapIcon)
    .use(router)
    .mount('#app');
