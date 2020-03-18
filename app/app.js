import Vue from "nativescript-vue";
import store from './store';
import Vuex from 'vuex';
import Login from "./components/Login";
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

Vue.use(Vuex);

new Vue({
    store,
    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login
    }
}).$start();
