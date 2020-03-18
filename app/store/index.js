import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import * as ApplicationSettings from "application-settings";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        urlApi: "https://api.tallium.tech",
        token : null,
        listOfItems : null,
    },
    mutations: {
        setlistOfItems(state, items){
            state.listOfItems = items;
        }
    }
});
