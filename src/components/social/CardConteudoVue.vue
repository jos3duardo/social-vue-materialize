<template>
  <div class="row">
    <div class="card">
      <div class="card-content">
        <div class="row valign-wrapper">
          <grid-vue tamanho="1">
            <img :src="perfil" :alt="nome" class="circle responsive-img"> <!-- notice the "circle" class -->
          </grid-vue>

          <grid-vue tamanho="11">
              <span class="black-text">
                <strong>{{nome}}</strong> - <small>{{data}}</small>
              </span>
          </grid-vue>
        </div>

        <slot></slot>
      </div>
      <div class="card-action">
        <p>
          <a style="cursor: pointer" @click="curtida(id)">
            <i class="material-icons">{{curtiu}}</i>12
          </a>
            <i class="material-icons">insert_comment</i>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import GridVue from "../layouts/GridVue";

  export default {
    name: 'CardConteudoVue',
    props: ['id','perfil', 'nome', 'data'],
    components: {
      GridVue,
    },
    data () {
      return {
        curtiu: 'favorite_border'
      }
    },
    methods: {
      curtida(id){
        alert(id)
        if (this.curtiu === 'favorite_border'){
          this.curtiu = 'favorite'
        }else {
          this.curtiu = 'favorite_border'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
