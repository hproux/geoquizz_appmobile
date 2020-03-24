import Vue from "nativescript-vue";
import store from './store';
import axios from 'axios'
import Vuex from 'vuex';
import Login from "./components/Login";
export const base = axios.create({
    baseURL: 'https://apiapp.tallium.tech/',
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
