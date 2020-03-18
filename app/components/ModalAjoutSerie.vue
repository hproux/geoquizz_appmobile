<template>
    <StackLayout class="modal" backgroundColor="white">
        <Label class="titreModal h2 text-center" text="Ajout Serie" />

        <TextField class="TextField" v-model="textFieldVille" hint="Ville..."/>
        <TextField class="TextField" v-model="textFieldRefCarte" hint="Référence de la carte..."/>
        <TextField keyboardType="number" class="TextField" v-model="textFieldDist" hint="Distance..."/>

        <!--Button class="btn btn-outline" text="Close Modal" @tap="$modal.close()" /-->
        <Button class="btn btn-outline" text="Ajouter la série" @tap="addSerie"/>
    </StackLayout>
</template>

<script>
    import axios from "axios";
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
    const loader = new LoadingIndicator();
    const options = {
        message: "Envoi de la série",
        details: 'Veuillez patienter...'
    };

    export default {
        data() {
            return {
                textFieldVille:null,
                textFieldRefCarte:null,
                textFieldDist:null,
            };
        },
        methods:{
          addSerie(){
              if(this.textFieldVille && this.textFieldRefCarte && this.textFieldDist){
                  loader.show(options);
                  axios.post(this.$store.state.urlApi + "/app/api/index.php/series", {
                      ville: this.textFieldVille,
                      map_refs: this.textFieldRefCarte,
                      dist: this.textFieldDist,
                  }).then((result) => {
                      console.log(result.data);
                      axios.get(this.$store.state.urlApi+"/app/api/index.php/series").then((result) => {
                          this.$store.commit("setlistOfItems", result.data.series);
                          loader.hide();
                      }).catch((err) => {
                          loader.hide();
                          alert("Une erreur est survenue");
                          console.log(err);
                      })

                      alert("Série ajoutée avec succès");
                      this.textFieldVille = "";
                      this.textFieldRefCarte = "";
                      this.textFieldDist = "";
                      this.$modal.close();
                  }).catch((err) => {
                      alert("Une erreur est survenue");
                      console.log(err.message);
                      loader.hide();
                  })
              }else{
                alert("Un des champs n'a pas été rempli");
              }
          },
        },
    };
</script>

<style lang="scss" scoped>

    .titreModal{
        margin-top:5%;
    }

    .TextField {
        color: black;
        placeholder-color:black;
        width: 80%;
        font-size: 15em;
    }
</style>
