<template lang="html">
    <Page>
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text=""></Label>
        </ActionBar>
        <StackLayout>
            <Image class="LogoGeoQuizz" src="~/img/logoGeoQuizz.png"/>
            <Button text="Cliquez ici pour ajouter une série" @tap="showModal" class="btn btnAddSerie" />

            <ListPicker class="listPicker" :items="this.$store.state.listOfItems" textField="ville" v-model="selectedItem"/>
            <TextField class="TextField" v-model="textFieldValue" hint="Description..."/>
            <Button class="TakePicture btn" text="Prendre une photo" @tap="takePicture"/>
        </StackLayout>
    </Page>
</template>

<script>

    import ModalAjoutSerie from "./ModalAjoutSerie.vue";
    import Main from "./Main.vue";
    import {takePicture, requestPermissions} from "nativescript-camera";
    import {ImageSource} from "@nativescript/core";
    import * as geolocation from "nativescript-geolocation";
    import { Accuracy } from "tns-core-modules/ui/enums";
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
    const loader = new LoadingIndicator();
    const options = {
        message: "Envoi de l'image",
        details: 'Veuillez patienter...'
    };

    export default {
        components: {
            Main,
            ModalAjoutSerie,
        },
        data() {
            return {
                base64: null,
                selectedItem: null,
                textFieldValue: null,
                locations: [],
            }
        },
        created() {
            loader.show();
            this.selectedItem=0;
            this.$axios.get("series").then((result) => {
                this.$store.commit("setlistOfItems", result.data.series);
            }).catch((err) => {
                alert("Une erreur est survenue");
                console.log(err);
            })

            geolocation.isEnabled().then(function (isEnabled) {
                if (!isEnabled) {
                    geolocation.enableLocationRequest(true, true).then(() => {
                        console.log("User Enabled Location Service");
                    }, (e) => {
                        console.log("Error: " + (e.message || e));
                    }).catch(ex => {
                        console.log("Unable to Enable Location", ex);
                    });
                }
            }, function (e) {
                console.log("Error: " + (e.message || e));
            });
            loader.hide();
        },
        methods: {
            showModal() {
                this.$store.commit("setIsThereMap",false);
                this.$store.commit("setMapDetails",null);

                this.$showModal(ModalAjoutSerie);
            },
            takePicture(args) {
                let that = this;
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: 10000
                }).then(function (loc) {
                    if (loc) {
                        that.locations.push(loc);
                    }
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                    alert("Impossible de recuperer la localisation veuillez redemarrer l'application");
                    return;
                });
                if(this.textFieldValue){
                    let page = (args.object).page;
                    requestPermissions().then(
                        () => {
                            takePicture({
                                width: 320,
                                height: 240,
                                keepAspectRatio: true,
                                saveToGallery: true,
                                allowsEditing: false
                            }).then((imageAsset) => {
                                let source = new ImageSource();
                                source.fromAsset(imageAsset).then((src) => {
                                        this.base64 = src.toBase64String("jpg", 100);
                                        //on ajoute la photo a la base
                                        loader.show(options);
                                        that.$axios.post("photo", {
                                            localisation: that.locations[0].latitude+","+that.locations[0].longitude,
                                            description: this.textFieldValue,
                                            photo: this.base64,
                                        }).then((result) => {
                                            console.log(result.data);
                                            //On ajoute la photo et la serie voulu a la table pivot
                                            that.$axios.post("serie", {
                                                photo_id: result.data.id,
                                                serie_id: this.$store.state.listOfItems[this.selectedItem].id,
                                            }).then((result) => {
                                                console.log(result.data);
                                                loader.hide();
                                                alert("Image ajoutée avec succès");
                                                this.textFieldValue = "";
                                            }).catch((err) => {
                                                alert("Une erreur est survenue");
                                                console.log(err.message);
                                            })
                                        }).catch((err) => {
                                            alert("Une erreur est survenue");
                                            console.log(err.message);
                                        })
                                    },
                                    (err) => {
                                        alert("Une erreur est survenue");
                                        console.log("Error -> " + err.message);
                                    });
                            }, (err) => {
                                alert("Une erreur est survenue");
                                console.log("Error -> " + err.message);
                            });
                        },
                        () => alert('permissions rejected')
                    );
            }else{
                    loader.hide();
                alert("Veuillez remplir la description");
            }
                loader.hide();
            },
        },
    }
</script>

<style lang="scss" scoped>

    .btn{
        width: 80%;
}

    .btnAddSerie{
        margin-top : 5%;
    }

    .LogoGeoQuizz {
        margin-top: 4%;
        width: 500px;
    }

    .listPicker {
        text-color: white;
        color: white;
    }

    .TextField {
        color: white;
        width: 80%;
        placeholder-color: white;
        font-size: 15em;
    }

    .TakePicture {
        margin-top: 10%;
    }

    Page {
        background: linear-gradient(180deg, #00d4ff, #055fb2, #072d91, #090979, #020024);
    }

    ActionBar {
        height: 30em;
        background-color: black;
    }
</style>
