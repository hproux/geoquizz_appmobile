<template lang="html">
      <Image class="backArrow" @tap="Back" src="~/img/left-arrow.png" stretch="none"/>
</template>

<script>

  export default {
methods: {
  Back:function(){
    this.$navigateBack();
  },
}
}
</script>

<style lang="scss" scoped>

.backArrow{
      margin-top:1%;

}
</style>

