<template>
  <div class="row">
    <grid-vue class="input-field" tamanho="12">
      <textarea v-model="conteudo" id="conteudoId" class="materialize-textarea"></textarea>
      <label for="conteudoId">O que está acontecendo?</label>
    </grid-vue>
    <p>
      <grid-vue v-if="conteudo" class="btn waves-effect waves-light  right" tamanho="2 offset-s10">Publicar</grid-vue>
    </p>
  </div>
</template>

<script>
  import GridVue from "../layouts/GridVue";

  export default {
    name: 'PublicarConteudoVue',
    props: [],
    components: {
      GridVue,
    },
    data () {
      return {
        conteudo: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
