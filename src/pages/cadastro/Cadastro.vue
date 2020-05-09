<template>
  <login-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">
        <span>
          <h2>Cadastro</h2>
          <input type="text" placeholder="Nome" value="">
          <input type="email" placeholder="E-mail" value="">
          <input type="password" placeholder="Senha" value="">
          <input type="password" placeholder="Confirme sua Senha" value="">
          <button class="btn waves-light waves-effect">Enviar</button>
          <router-link to="/login"  class="btn waves-light waves-effect orange">Já tenho conta</router-link>
        </span>
      </span>
  </login-template>

</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";

  export default {
    name: 'Cadastro',
    components: {
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
