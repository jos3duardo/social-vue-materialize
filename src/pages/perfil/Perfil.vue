<template>
  <site-template>
      <span slot="menuesquerdo">
        <img :src="usuario.image" class="responsive-img" srcset="">
      </span>
      <span slot="principal">
        <span>
          <h2>Perfil</h2>
          <input type="text" placeholder="Nome" v-model="name">
          <input type="email" placeholder="E-mail" autocomplete="off" v-model="email">

            <div class="file-field input-field">
              <div class="btn">
                <span>Imagem</span>
                <input type="file" v-on:change="salvarImagem">
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
        imagem: '',
      }
    },
    created() {
      let usuarioAux =  this.$store.getters.getUsuario
      if (usuarioAux){
        this.usuario = this.$store.getters.getUsuario
        this.name = this.usuario.name;
        this.email = this.usuario.email;

      }
    },
    methods: {
      salvarImagem(e){
        let arquivo = e.target.files || e.dataTransfer.files;
        if (!arquivo.length){
          return;
        }
        let reader = new FileReader();
        reader.onloadend = (e) => {
          this.imagem = e.target.result
        };
        reader.readAsDataURL(arquivo[0]);
      },
      perfil(){
        this.$http.put(this.$urlAPI+`profile`, {
          name: this.name,
          email: this.email,
          password:this.password,
          password_confirmation: this.password_confirmation,
          image: this.imagem
        },{"headers": {"authorization": "Bearer " +  this.$store.getters.getToken}})
          .then(response => {
            if(response.data.status){
              console.log(response.data)
              this.usuario = response.data.user
              this.$store.commit('setUsuario', response.data.user)
              sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
              alert('Perfil atualizado')
            }else if(response.data.status === false && response.data.validate){
              // erros de validação
              // console.log('erros de validação')
              let errors = '';
              for (let error of Object.values(response.data.errors)){
                errors = error + " ";
              }
              alert(errors)
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
