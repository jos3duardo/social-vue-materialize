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
            <i class="material-icons">{{curtiu}}</i>{{totalCurtidas}}
          </a>
          <a style="cursor: pointer" @click="abreComentarios(id)">
            <i class="material-icons">insert_comment</i>22
          </a>
        </p>
        <p v-if="exibirComentario" class="right-align">
          <input type="text" placeholder="Comentar">
          <button class="btn waves-effect waves-light orange">
            <i class="material-icons">send</i>
          </button>
        </p>
        <p v-if="exibirComentario">
          <ul class="collection">
            <li class="collection-item avatar">
              <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">
              <span class="title">Maria da Silva<small> - 12h30 12/03/2018 </small></span>
              <p>Gostei desse conteudo </p>
            </li>
            <li class="collection-item avatar">
              <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">
              <span class="title">Maria da Silva<small> - 12h30 12/03/2018 </small></span>
              <p>Gostei desse conteudo </p>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import GridVue from "../layouts/GridVue";

  export default {
    name: 'CardConteudoVue',
    props: ['id','perfil', 'nome', 'data','totalCurtidas','curtiuConteudo'],
    components: {
      GridVue,
    },
    data () {
      return {
        curtiu: this.curtiuConteudo ? 'favorite': 'favorite_border',
        totalCurtidas: this.totalCurtidas,
        exibirComentario: false
      }
    },
    methods: {
      curtida(id){
        this.$http.put(this.$urlAPI+'content/like/'+id,{},
          {"headers": {"authorization": "Bearer " +  this.$store.getters.getToken}})
        .then(response => {
          if (response.status){
            this.totalCurtidas = response.data.likes
            this.$store.commit('setConteudoLinhaTempo', response.data.list.contents.data)
            if(this.curtiu == 'favorite_border'){
              this.curtiu = 'favorite';
            }else{
              this.curtiu = 'favorite_border';
            }
          }else{
            alert(response.data.error)
          }

        })
        .catch(e => {
          console.log(e)
          alert("Erro! Tente novamente mais tarde")
        })
      },
      abreComentarios(id){
        this.exibirComentario = !this.exibirComentario
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
