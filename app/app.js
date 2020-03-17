import Vue from "nativescript-vue";
import store from './store';
import axios from 'axios';
import Vuex from 'vuex';
import Login from "./components/Login";
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
