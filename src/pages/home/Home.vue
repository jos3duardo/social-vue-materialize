<template>
  <span>
    <publicar-conteudo-vue />
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

</template>

<script>
  import CardConteudoVue from "../../components/social/CardConteudoVue";
  import CardDetalheVue from "../../components/social/CardDetalheVue";
  import PublicarConteudoVue from "../../components/social/PublicarConteudoVue";

  export default {
    name: 'Home',
    components: {
      CardConteudoVue,
      CardDetalheVue,
      PublicarConteudoVue
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
