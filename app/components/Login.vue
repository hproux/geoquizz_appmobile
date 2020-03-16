<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
      <Label class="LabelConnexion" text="Connexion"/>
      <Image class="LogoGeoQuizz" src="~/img/logoGeoQuizz.png" />
      <TextField class="TextField TextFieldId" v-model="id" hint="Adresse mail"/>
      <TextField class="TextField" secure="true" v-model="password" hint="Mot de passe"/>

      <Button class="Btn BtnConnexion" text="Se connecter" @tap="login"/>
      <Label class="TagRegister" @tap="register" text="Pas encore de compte ?"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import Register from "./Register.vue";
  import Main from "./Main.vue";

  import * as http from "http";
  export default {
    components:{
      Register,
      Main,
    },
  data() {
    return {
      id : null,
      password : null,
    }
  },
  methods: {
    login(){
      this.$navigateTo(Main);
    },
    register(){
      this.$navigateTo(Register);
    },
  },
}
</script>

<style lang="scss" scoped>
  Page{
    background: linear-gradient(180deg, #00d4ff,#055fb2,#072d91,#090979,#020024);
  }


.Btn{
  width : 90%;
  border-radius: 100%;
  font-size: 20em;
}

.BtnConnexion{
  margin-top: 25%;
  margin-bottom: 2%;
  color : white;
  background-color: #055fb2;
}

.TextField{
  color: white;
  width:80%;
  placeholder-color:white;
  font-size: 15em;
}

.TextFieldId{
  margin-top:10%;
  margin-bottom: 3%;
}

ActionBar{
  height:30em;
  background-color: black;
}

.LogoGeoQuizz {
  margin-top: 4%;
  width:500px;
}

.TagRegister{
  font-size: 17em;
  font-style: italic;
  color: white;
  border-color: white;
  border-bottom-width: 3px;
}

.LabelConnexion{
  font-size:25em;
  color:white;
  margin-top: 3%;
}
</style>
