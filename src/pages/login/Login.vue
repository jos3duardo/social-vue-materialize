<template>
  <login-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">
        <h2>Login</h2>
        <input type="email" placeholder="E-mail" value="">
        <input type="password" placeholder="Senha" value="">
        <button type="button" class="btn waves-light waves-effect">Entrar</button>
      </span>


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
