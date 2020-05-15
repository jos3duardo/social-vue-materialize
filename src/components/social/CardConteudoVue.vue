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
    props: ['id','perfil', 'nome', 'data','totalCurtidas','curtiuConteudo'],
    components: {
      GridVue,
    },
    data () {
      return {
        curtiu: this.curtiuConteudo ? 'favorite': 'favorite_border',
        totalCurtidas: this.totalCurtidas
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
