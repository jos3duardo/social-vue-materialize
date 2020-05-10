<template>
  <login-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">
        <span>
          <h2>Cadastro</h2>
          <input type="text" placeholder="Nome" autocomplete="off" v-model="name">
          <input type="email" placeholder="E-mail" autocomplete="off" v-model="email">
          <input type="password" placeholder="Senha" autocomplete="off" v-model="password">
          <input type="password" placeholder="Confirme sua Senha" autocomplete="off" v-model="password_confirmation">
          <button class="btn waves-light waves-effect" v-on:click="cadastro()">Enviar</button>
          <router-link to="/login"  class="btn waves-light waves-effect orange">Já tenho conta</router-link>
        </span>
      </span>
  </login-template>

</template>

<script>
  import LoginTemplate from "../../templates/LoginTemplate";
  import axios from "axios";

  export default {
    name: 'Cadastro',
    components: {
      LoginTemplate
    },
    data () {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    methods: {
      cadastro(){
        console.log("ok");
        axios.post(`http://127.0.0.1:8000/api/register`, {
          name: this.name,
          email: this.email,
          password:this.password,
          password_confirmation: this.password_confirmation
        })
          .then(response => {
            console.log(response)
            if(response.data.token){
              // login com sucesso
              console.log('cadastro realizado com sucesso')
              sessionStorage.setItem('usuario', JSON.stringify(response.data))
              this.$router.push('/')
            }else if(response.data.status == false){
              //login não existe
              console.log('login não existe')
              alert('Erro no cadastro')
            }else{
              // erros de validação
              console.log('erros de validação')
              let erros = '';
              for(let erro of Object.values(response.data)){
                erros += erro +" \n";
              }
              alert(erros);
            }
          })
          .catch(e => {
            console.log(e)
          })
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
