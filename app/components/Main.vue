<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">

    </FlexboxLayout>
  </Page>
</template>

<script>

  import * as http from "http";
  import Main from "./Main.vue";
  export default {
    components:{
      Main,
    },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
  Page{
    background: linear-gradient(180deg, #00d4ff,#055fb2,#072d91,#090979,#020024);
  }

ActionBar{
  height:30em;
  background-color: black;
}
</style>
