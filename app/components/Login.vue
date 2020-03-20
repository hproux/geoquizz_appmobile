<template lang="html">
  <Page actionBarHidden="true">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
      <Label class="LabelConnexion" text="Connexion"/>
      <Image class="LogoGeoQuizz" src="~/img/logoGeoQuizz.png" />
      <TextField class="TextField TextFieldId" keyboardType="email" v-model="mail" hint="Adresse mail"/>
      <TextField class="TextField" secure="true" v-model="password" hint="Mot de passe"/>

      <Button class="Btn BtnConnexion" text="Se connecter" @tap="login"/>
      <Label class="TagRegister" @tap="register" text="Pas encore de compte ?"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import {decode, encode} from 'base-64'
  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }
  import Register from "./Register.vue";
  import Main from "./Main.vue";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();
  const options = {
    message: "Connexion au compte",
    details: 'Veuillez patienter...'
  };

  export default {
    components:{
      Register,
      Main,
    },
  data() {
    return {
      mail : null,
      password : null,
    }
  },
  methods: {
    login(){
      let that = this;
      if(that.mail && that.password){
        loader.show(options);
        that.$axios.post("login", {},{
          auth : {
            username: that.mail,
            password: that.password,
          }
        }).then((result) => {
          loader.hide();
          that.$store.commit("setToken",result.data.token);
          that.$axios.defaults.headers.Authorization = 'Bearer ' + result.data.token;
          console.log(that.$axios.defaults.headers);
          that.$navigateTo(Main);
        }).catch((err) => {
          console.log(err.response.request._response);
          loader.hide();
          alert("Identifiants incorrect");
        })
      }else{
          alert("Au moins un champs n'est pas rempli");
      }
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
