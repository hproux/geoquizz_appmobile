<template>
    <StackLayout backgroundColor="white">
        <Label v-if="!addMap" class="titreModal h2 text-center" :text="LblText" />
        <TextView editable="false" v-if="addMap" class="titreModal h2 text-center" text="Centrez la carte au bon endroit puis validez" />
        <ActivityIndicator :busy="busyLoader" />
        <Mapbox height="60%" v-if="addMap" accessToken="pk.eyJ1IjoiaHByb3V4MDQiLCJhIjoiY2s3eDdqejg3MDkzZzNqczg2NW1kaHVibCJ9.3mKpF4JL0zVFgRGl9wIsqA"
                mapStyle="streets"
                showUserLocation="true"
                disableZoom="false"
                disableRotation="true"
                disableScroll="false"
                disableTilt="false"
                ref="map"
                @mapReady="onMapReady($event)">
        </Mapbox>
        <ListView v-if="!addMap" separatorColor="transparent" width="100%" height="60%" for="map in listOfMaps" @itemTap="listMapTap">
            <v-template>
                <StackLayout>
                    <Label class="h3 text-center labelMapVille" :text="map.ville" />
                    <Image :src="map.miniature"/>
                </StackLayout>
            </v-template>
        </ListView>
        <Button v-if="!addMap" class="btn btn-outline" text="Ajouter une nouvelle carte" @tap="addMapBtn"/>
        <Button v-if="addMap" class="btn btn-outline" text="Valider la zone" @tap="validateZone"/>

    </StackLayout>
</template>

<script>
    import * as http from "http";
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
    const plugin = require("nativescript-screenshot");
    const loader = new LoadingIndicator();
    const options = {
        message: "Ajout de la carte",
        details: 'Veuillez patienter...',
        userInteractionEnabled: false,
    };

    export default {
        props: ['ville'],
        created(){
            this.busyLoader = false;
            this.LblText = "Sélectionnez une carte";
            this.addMap = false;
            loader.show();
            this.$axios.get("maps").then((result) => {
                //console.log(result.data);
                this.listOfMaps = result.data.maps;
                loader.hide();
            }).catch((err) => {
                loader.hide();
                alert("Une erreur est survenue");
                console.log(err);
            })
            loader.hide();

        },
        data() {
            return {
                addMap : null,
                listOfMaps : null,
                LblText : null,
                map : null,
                zoomLevel : null,
                lat : null,
                lng : null,
                busyLoader : null,
            };
        },
        methods:{
            listMapTap(map){
                this.$store.commit("changeStateIsThereMap");
                this.$store.commit("setMapDetails", map.item);
                this.$modal.close();
            },
            onMapReady(args){
                this.map = args.map;
            },
            addMapBtn(){
                this.LblText = "Choix d'une zone";
                this.addMap = true;
          },
            validateZone(args){
                let that = this;
                that.busyLoader = true;
                this.map.getCenter().then(
                    function(result) {
                        that.lat = result.lat;
                        that.lng = result.lng;

                        that.map.getZoomLevel().then(
                            function(result) {
                                that.zoomLevel = result.toFixed(0);
                                try{
                                    let urlImg = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/"+that.lng+","+that.lat+","+that.zoomLevel+"/600x500?access_token=pk.eyJ1IjoiaHByb3V4MDQiLCJhIjoiY2s3eDdpeWF5MDlhdTNlcjRjNjJ4c2M4MCJ9.AcRRway0cND7xi7deoa7Gw";
                                    http.getImage(urlImg).then(result =>{
                                        let base64 = result.toBase64String("png",100);
                                        console.log(base64);
                                        that.miniature = base64;

                                        that.$axios.post("maps", {
                                            lat: that.lat,
                                            lng: that.lng,
                                            zoom: that.zoomLevel,
                                            ville: that.ville,
                                            miniature: that.miniature,
                                        }).then((result) => {
                                            that.busyLoader = false;
                                            that.$store.commit("changeStateIsThereMap");
                                            that.$store.commit("setMapDetails", result.data);
                                            that.$modal.close();
                                            alert("Carte ajoutée avec succès");
                                        }).catch((err) => {
                                            that.busyLoader = false;

                                            console.log(err.response.request._response);
                                            alert("Une erreur est survenue");
                                        })
                                        loader.hide();

                                    }, error => {
                                        console.log(error);
                                        that.busyLoader = false;

                                    });

                                }catch(e){
                                    that.busyLoader = false;
                                    console.log(e);
                                }
                            },
                            function(error) {
                                that.busyLoader = false;
                                console.log("mapbox getZoomLevel error: " + error);
                                alert("Une erreur est survenue");
                                return;
                            }
                        )
                    },
                    function(error) {
                        that.busyLoader = false;
                        console.log("mapbox getCenter error: " + error);
                        console.log(3);
                        alert("Une erreur est survenue");
                        return;
                    }
                )
            },
        },
    };
</script>

<style lang="scss" scoped>

    .titreModal{
        margin-top:2%;
    }

    .labelMapVille{
        border-color: black;
        border-radius: 5px;
        border-width: 2px;
    }

    .TextField {
        color: black;
        placeholder-color:black;
        width: 80%;
        font-size: 15em;
    }
</style>
