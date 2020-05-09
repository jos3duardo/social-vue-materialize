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
  import axios from 'axios'

  export default {
    name: 'Login',
    components: {
      LoginTemplate,
    },
    data () {
      return {
       email: '',
       password: ''
      }
    },
    methods: {
        login(){
          console.log("ok");
          axios.post(`http://127.0.0.1:8000/api/login`, {
            email: this.email,
            password:this.password
          })
            .then(response => {
              console.log(response)
              if(response.data.token){
                // login com sucesso
                // console.log('login com sucesso')
                sessionStorage.setItem('usuario', JSON.stringify(response.data))
                this.$router.push('/')
              }else if(response.data.status == false){
                //login não existe
                console.log('login não existe')
                alert('Login invalido')
              }else{
                // erros de validação
                console.log('erros de validação')
                let erros = '';
                for (let erro of Object.values(response.data)){
                  erros = erro + " ";
                }
                alert(erros)
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
