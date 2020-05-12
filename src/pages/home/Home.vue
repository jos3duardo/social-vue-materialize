<template>
  <site-template>
    <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <img :src="usuario.image" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>

        <grid-vue tamanho="8">
          <span class="black-text">
            <h5>{{usuario.name}}</h5>
          </span>
        </grid-vue>
      </div>
    </span>

    <span slot="principal">
      <publicar-conteudo-vue :user="usuario" />
      <card-conteudo-vue
        perfil="https://materializecss.com/images/yuna.jpg"
        nome="Loana Sousa"
        data="08/05/2020 22:32">
          <card-detalhe-vue
            imagem="https://materializecss.com/images/sample-1.jpg"
            titulo=""
            texto="I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively."
          />
      </card-conteudo-vue>
    </span>

  </site-template>

</template>

<script>
  import SiteTemplate from "../../templates/SiteTemplate";
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardDetalheVue from "../../components/social/CardDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";
  import GridVue from "../../components/layouts/GridVue";

  export default {
    name: 'Home',
    components: {
      CardConteudoVue,
      CardDetalheVue,
      PublicarConteudoVue,
      SiteTemplate,
      GridVue
    },
    data () {
      return {
        usuario:false
      }
    },
    created() {
      let usuarioAux = sessionStorage.getItem('usuario')
      if (usuarioAux) {
        this.usuario = JSON.parse(usuarioAux)
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
