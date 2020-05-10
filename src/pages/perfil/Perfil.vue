<template>
  <site-template>
      <span slot="menuesquerdo">
        <img src="https://static.todamateria.com.br/upload/re/de/redessociaisinteracaopessoas-cke.jpg" class="responsive-img" srcset="">
      </span>
      <span slot="principal">
        <span>
          <h2>Perfil</h2>
          <input type="text" placeholder="Nome" v-model="name">
          <input type="email" placeholder="E-mail" autocomplete="off" v-model="email">

            <div class="file-field input-field">
              <div class="btn">
                <span>Imagem</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>

          <input type="password" placeholder="Senha" autocomplete="off" v-model="password">
          <input type="password" placeholder="Confirme sua Senha" autocomplete="off" v-model="password_confirmation">
          <button class="btn waves-light waves-effect" v-on:click="perfil()">Atualizar</button>

        </span>
      </span>
  </site-template>

</template>

<script>
  import SiteTemplate from "../../templates/SiteTemplate";
  import axios from "axios";

  export default {
    name: 'Perfil',
    components: {
      SiteTemplate
    },
    data () {
      return {
        usuario: false,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    created() {
      let usuarioAux = sessionStorage.getItem('usuario')
      if (usuarioAux){
        this.usuario = JSON.parse(usuarioAux)
        this.name = this.usuario.name;
        this.email = this.usuario.email;

      }
    },
    methods: {
      perfil(){
        axios.put(`http://127.0.0.1:8000/api/profile`, {
          name: this.name,
          email: this.email,
          password:this.password,
          password_confirmation: this.password_confirmation
        },{"headers": {"authorization": "Bearer " + this.usuario.token}})
          .then(response => {
              console.log(response.data)
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
