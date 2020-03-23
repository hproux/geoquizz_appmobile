import Vue from "nativescript-vue";
import store from './store';
import Vuex from 'vuex';
import Login from "./components/Login";
import axios from 'axios'
export const base = axios.create({
    baseURL: 'https://api.tallium.tech/app/api/index.php/',
    headers: {
        'Authorization' : ''
    }
});

Vue.prototype.$axios = base;
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

Vue.use(Vuex);

new Vue({
    store,
    axios,
    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login
    }
}).$start();
