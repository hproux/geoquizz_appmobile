import Vue from "nativescript-vue";
import store from './store';
import axios from 'axios'
import Vuex from 'vuex';
import Login from "./components/Login";
import Main from "~/components/Main";
const connectivity = require("connectivity");
export const base = axios.create({
    baseURL: 'https://apiapp.tallium.tech/',
    headers: {
        'Authorization' : ''
    }
});

base.interceptors.request.use( (config) =>{
    const connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            config.cancelToken = new axios.CancelToken((cancel) => cancel('Aucune Connexion Internet'));
            alert("Aucune connexion Internet");
            return config;
            break;
        case connectivity.connectionType.wifi:
            return config;
            break;
        case connectivity.connectionType.mobile:

            return config;
            break;
    }
})

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
