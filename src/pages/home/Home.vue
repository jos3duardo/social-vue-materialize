<template>
  <span>

    <div class="row">
        <grid-vue class="input-field" tamanho="12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Oo que está acontecendo?</label>
        </grid-vue>
        <p>
          <button class="btn waves-effect waves-light s2 offset-s10 right">Publicar</button>
        </p>
    </div>

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
  import GridVue from "../../components/layouts/GridVue";

  export default {
    name: 'Home',
    components: {
      CardConteudoVue,
      CardDetalheVue,
      GridVue
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
