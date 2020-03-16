<template lang="html">
  <Page>
   <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="transparent" selectedTabTextColor="transparent"
             tabTextColor="transparent" :selectedIndex="selectedIndex">
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <FlexboxLayout class="fullWidth" flexDirection="row">
            <BackArrow/>
          <Label class="LabelInscritption LabelInscritption1" text="Inscritption"/>
          </FlexboxLayout>
          <Image class="LogoGeoQuizz" src="~/img/logoGeoQuizz.png"/>
          <TextField class="TextField TextFieldName" v-model="nom" hint="Nom"/>
          <TextField class="TextField" v-model="prenom" hint="Prénom"/>
          <Button class="Btn BtnSuivant" text="Suivant" @tap="next"/>
        </FlexboxLayout>
      </TabViewItem>
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelInscritption" text="Inscritption"/>
          <Image class="LogoGeoQuizz" src="~/img/logoGeoQuizz.png"/>
          <TextField class="TextField TextFieldMobile" keyboardType="datetime" v-model="mobile" hint="Téléphone"/>
          <TextField class="TextField2" v-model="mail" hint="mail"/>
          <TextField class="TextField2" secure="true" v-model="password" hint="Mot de passe"/>
          <TextField class="TextField2" secure="true" v-model="passwordVerif" hint="Confirmer le mot de passe"/>

          <Button class="Btn BtnRetour" text="Retour" @tap="back"/>
          <Button class="Btn BtnRegister" text="Terminer" @tap="register"/>

        </FlexboxLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
  import Login from "./Login.vue";
  import BackArrow from "./BackArrow.vue";
  import * as http from "http";
  import Main from "./Main";

  export default {
    components:{
      BackArrow,
      Login,
    },
methods: {
  register(){
    this.$navigateTo(Main);
  },
  next(){
    this.selectedIndex=1;
  },
  back() {
    this.selectedIndex = 0;
  }
},
  data() {
    return {
      nom: null,
      prenom: null,
      mail : null,
      password : null,
      passwordVerif : null,
      mobile : null,
      selectedIndex : 0,
    }
  },
}
</script>

<style lang="scss" scoped>
  Page{
    background: linear-gradient(180deg, #00d4ff,#055fb2,#072d91,#090979,#020024);
  }

  .Btn {
    width: 90%;
    border-radius: 100%;
    font-size: 20em;
  }

  .BtnSuivant{
  margin-top: 25%;
}

  .BtnRetour {
    margin-top:8%;
    color: white;
   background-color: #055fb2;
  ;
  }

  .TextFieldMobile{
    margin-top:10%;
  }

  .TextField {
    color: white;
    width: 80%;
    placeholder-color: white;
    font-size: 15em;
  }

  .TextField2 {
    color: white;
    width: 80%;
    placeholder-color: white;
    font-size: 15em;
    margin-top:2%;
  }

  .TextFieldName {
    margin-top: 1%;
    margin-bottom: 3%;
  }

  ActionBar {
    height: 30em;
    background-color: black;
  }

  .LogoGeoQuizz {
    margin-top: 5%;
    width: 500px;
  }

  .LabelInscritption {
    font-size: 20em;
    color: white;
  }

  .fullWidth{
    width:100%;
  }

.LabelInscritption1 {
  margin-left:25%;
}
</style>

