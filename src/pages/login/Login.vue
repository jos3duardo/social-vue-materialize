<template>
  <login-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">

        <span v-if="!cadastro">
          <h2>Login</h2>
          <input type="email" placeholder="E-mail" value="">
          <input type="password" placeholder="Senha" value="">
          <button class="btn waves-light waves-effect">Entrar</button>
          <button class="btn waves-light waves-effect orange"
                  v-on:click="cadastro = !cadastro">Cadastre-se</button>
        </span>

        <span v-if="cadastro">
          <h2>Cadastro</h2>
          <input type="text" placeholder="Nome" value="">
          <input type="email" placeholder="E-mail" value="">
          <input type="password" placeholder="Senha" value="">
          <input type="password" placeholder="Confirme sua Senha" value="">
          <button class="btn waves-light waves-effect">Enviar</button>
          <button class="btn waves-light waves-effect orange"
                v-on:click="cadastro = !cadastro">Já tenho conta</button>
        </span>


      </span>


  </login-template>

</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";

  export default {
    name: 'Login',
    components: {
      LoginTemplate
    },
    data () {
      return {
        cadastro: false
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
