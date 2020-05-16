<template>
  <site-template>
    <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <img :src="donoPagina.image" :alt="donoPagina.name" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>

        <grid-vue tamanho="8">
          <span class="black-text">
            <h5>{{donoPagina.name}}</h5>
          </span>
        </grid-vue>
      </div>
    </span>

    <span slot="principal">
      <publicar-conteudo-vue/>
      <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
        :id="item.id"
        :curtidas="item.total_likes"
        :comentarios="item.comments"
        :curtiuConteudo="item.like_content"
        :perfil="item.user.image"
        :nome="item.user.name"
        :data="item.data">
          <card-detalhe-vue
            :imagem="item.image"
            :titulo="item.title"
            :texto="item.text"
            :link="item.link"
          />
      </card-conteudo-vue>
<!--      <button v-if="urlProximaPagina" @click="carregapaginacao()" class="btn blue"> Mais... </button>-->

      <div v-scroll="handleScroll"></div>
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
    name: 'Pagina',

    data () {
      return {
        user: false,
        urlProximaPagina: null,
        paraScroll: false,
        donoPagina: {
          image:'',
          neme:''
        }
      }
    },
    created() {
      let userAux =   this.$store.getters.getUsuario
      if (userAux) {
        this.user =  this.$store.getters.getUsuario

        this.$http.get(this.$urlAPI+`content/page/`+this.$route.params.id,
          {
            "headers": {"authorization": "Bearer " +  this.$store.getters.getToken}
        })
        .then( response => {
          console.log(response)
          if (response.data.status){
            this.$store.commit('setConteudoLinhaTempo', response.data.contents.data)
            this.urlProximaPagina = response.data.contents.next_page_url
            this.donoPagina = response.data.userPage
          }
        })
        .catch(e => {
            console.log(e)
            alert("Erro! Tente novamente mais tarde")
        })
      }
    },
    components: {
      CardConteudoVue,
      CardDetalheVue,
      PublicarConteudoVue,
      SiteTemplate,
      GridVue
    },
    computed: {
      listaConteudos(){
        return this.$store.getters.getConteudoLinhaTempo
      }
    },
    methods: {

      handleScroll() {
        // console.log(window.scrollY);
        // console.log(document.body.clientHeight);//852
        if (this.paraScroll){
          return
        }
        if (window.scrollY >= document.body.clientHeight - 852){
          this.paraScroll = true
          this.carregapaginacao()
        }
      },
      carregapaginacao(){
        if (!this.urlProximaPagina){
          return
        }
        this.$http.get(this.urlProximaPagina,
          {
            "headers": {"authorization": "Bearer " +  this.$store.getters.getToken}
          })
          .then( response => {
            console.log(response)
            if (response.data.status){
              this.$store.commit('setpaginacaoConteudoLinhaTempo', response.data.contents.data)
              this.urlProximaPagina = response.data.contents.next_page_url
              this.paraScroll = false
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
  h1, h2 {
    font-weight: normal;
  }
</style>
