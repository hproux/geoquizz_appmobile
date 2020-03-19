<template>
    <StackLayout class="modal" backgroundColor="white">
        <Label class="titreModal h2 text-center" text="Ajout Serie" />

        <TextField class="TextField" v-model="textFieldVille" hint="Ville..."/>
        <TextField keyboardType="number" class="TextField" v-model="textFieldDist" hint="Distance..."/>
        <Button v-if="!this.$store.state.isThereMap" text="Cliquez ici pour choisir une carte" @tap="showModal" class="btn btnAddMap" />
        <StackLayout v-if="this.$store.state.isThereMap">
            <Label class="h3 text-center" :text="this.$store.state.mapDetails.ville" />
            <Image height="80%" :src="this.$store.state.mapDetails.miniature"/>
        </StackLayout>
        <!--Button class="btn btn-outline" text="Close Modal" @tap="$modal.close()" /-->
        <Button class="btn btn-outline" text="Ajouter la série" @tap="addSerie"/>
    </StackLayout>
</template>

<script>
    import ModalAjoutMap from "./ModalAjoutMap";
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
    const loader = new LoadingIndicator();
    const options = {
        message: "Envoi de la série",
        details: 'Veuillez patienter...'
    };

    export default {
        created(){
            this.isThereMap = false;
        },
        data() {
            return {
                textFieldVille:null,
                textFieldDist:null,
                isThereMap : null,
            };
        },
        methods:{
            showModal() {
                if(this.textFieldVille && this.textFieldDist) {
                    this.$showModal(ModalAjoutMap, {props: {ville: this.textFieldVille}});
                }else{
                    alert("Un des champs n'a pas été rempli");
                }
            },
          addSerie(){
                let that = this;
              if(that.textFieldVille && that.$store.state.isThereMap==true && that.textFieldDist){
                  that.$axios.post("series", {
                      ville: that.textFieldVille,
                      map_refs: that.$store.state.mapDetails.id,
                      dist: that.textFieldDist,
                  }).then((result) => {
                      console.log(result.data);
                      that.$axios.get("series").then((result) => {
                          that.$store.commit("setlistOfItems", result.data.series);
                          alert("Série ajoutée avec succès");
                          that.textFieldVille = "";
                          that.textFieldDist = "";
                          that.$store.commit("changeStateIsThereMap");
                          that.$store.commit("setMapDetails", null);
                          that.$modal.close();
                      }).catch((err) => {
                          loader.hide();
                          alert("Une erreur est survenue");
                          console.log(err.response.request._response);
                      })

                  }).catch((err) => {
                      alert("Une erreur est survenue");
                      console.log(err.response.request._response);
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
    .btn{
        width: 80%;
    }

    .btnAddMap{
        margin-top : 0%;
    }
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
