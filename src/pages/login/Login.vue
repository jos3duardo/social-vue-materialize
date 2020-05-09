<template>
  <login-template>


    <h2>Login</h2>

  </login-template>

</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardDetalheVue from "../../components/social/CardDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";

  export default {
    name: 'Login',
    components: {
      CardConteudoVue,
      CardDetalheVue,
      PublicarConteudoVue,
      LoginTemplate
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
