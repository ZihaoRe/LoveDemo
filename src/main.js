import Vue from 'vue'
import App from './App.vue';
import store from './store'
export const Bus = new Vue();

new Vue({
    store,
    el: "#app",
    render:h=>h(App)
});