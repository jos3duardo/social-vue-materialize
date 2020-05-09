<template>
    <card-conteudo-vue/>
</template>

<script>
  import CardConteudoVue from "../../components/social/CardConteudoVue";

  export default {
    name: 'Home',
    components: {
      CardConteudoVue,
    },
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
