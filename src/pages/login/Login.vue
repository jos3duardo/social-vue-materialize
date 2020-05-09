<template>
  <login-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">

        <span>
          <h2>Login</h2>
          <input type="email" placeholder="E-mail" v-model="email">
          <input type="password" placeholder="Senha" v-model="password">
          <button class="btn waves-light waves-effect" v-on:click="login()">Entrar</button>
          <router-link to="/cadastro" class="btn waves-light waves-effect orange">Cadastra-se</router-link>
        </span>
      </span>


  </login-template>

</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";

  export default {
    name: 'Login',
    components: {
      LoginTemplate,
    },
    methods: {
      login(){
        alert('ok')
      }
    },
    data () {
      return {
       email: '',
       password: ''
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
