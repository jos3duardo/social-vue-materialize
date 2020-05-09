<template>
  <span>
    <div v-if="imagem" class="card-image">
      <img :src="imagem">
      <span class="card-title">{{ titulo || '' }}</span>
    </div>

    <div v-if="texto" class="card-content">
      <p>
      {{ texto }}
      </p>
    </div>
  </span>

</template>

<script>

  export default {
    name: 'CardDetalheVue',
    props: ['imagem', 'titulo', 'texto'],
    components: {
    },
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
