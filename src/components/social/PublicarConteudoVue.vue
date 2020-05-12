<template>
  <div class="row">
    <grid-vue class="input-field" tamanho="12">
      <input type="text" v-model="content.title">
      <textarea v-if="content.title" v-model="content.text" id="conteudoId" placeholder="Conteudo" class="materialize-textarea"></textarea>
      <input  v-if="content.title && content.text" type="text" placeholder="link" v-model="content.link">
      <input  v-if="content.title && content.text" type="text" placeholder="Url da imagem" v-model="content.image">

      <label for="conteudoId">O que está acontecendo?</label>
    </grid-vue>
    <p>
      <grid-vue v-if="content.title && content.text" class="btn waves-effect waves-light  right" tamanho="2 offset-s10">Publicar</grid-vue>
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
        content: {title: '', text: '', link: '', image: '' }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
