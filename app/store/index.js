import Vue from 'nativescript-vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token : null,
        listOfItems : null,
        isThereMap : false,
        mapDetails : null,
    },
    mutations: {
        setlistOfItems(state, items){
            state.listOfItems = items;
        },
        changeStateIsThereMap(state){
            state.isThereMap = !state.isThereMap;
        },
        setIsThereMap(state, stateGiven){
            state.isThereMap = stateGiven;
        },
        setMapDetails(state, map){
            state.mapDetails = map;
        },
        setToken(state, token){
            state.token = token;
        },
    }
});
