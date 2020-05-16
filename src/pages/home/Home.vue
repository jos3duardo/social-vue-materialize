<template>
  <site-template>
    <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <router-link :to="'/pagina/'+user.id+'/'+$slug(user.name,{lower:true})">
            <img :src="user.image" :alt="user.name" class="circle responsive-img"> <!-- notice the "circle" class -->
          </router-link>
        </grid-vue>

        <grid-vue tamanho="8">
          <span class="black-text">
            <router-link :to="'/pagina/'+user.id+'/'+$slug(user.name,{lower:true})">
              <h5>{{user.name}}</h5>
            </router-link>
          </span>
        </grid-vue>
      </div>
    </span>
    <span slot="menuesquerdoamigo">
      <h3>Seguindo</h3>
      <li v-for="item in amigos" :key="item.id">{{item.name}}</li>
      <li v-if="!amigos.length">Nenhum usuario</li>
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
        :usuarioId="item.user.id"
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
    name: 'Home',

    data () {
      return {
        user: {image:'', name:''},
        urlProximaPagina: null,
        paraScroll: false,
        amigos: []
      }
    },
    created() {
      let userAux =   this.$store.getters.getUsuario
      if (userAux) {
        this.user =  this.$store.getters.getUsuario

        this.$http.get(this.$urlAPI+`content/list`,
          {
            "headers": {"authorization": "Bearer " +  this.$store.getters.getToken}
        })
        .then( response => {
          console.log(response)
          if (response.data.status){
            this.$store.commit('setConteudoLinhaTempo', response.data.contents.data)
            this.urlProximaPagina = response.data.contents.next_page_url

            this.$http.get(this.$urlAPI+`user/list/friend`,
              {
                "headers": {"authorization": "Bearer " +  this.$store.getters.getToken}
              })
              .then( response => {
                if (response.data.status){
                  console.log(response)
                  this.amigos = response.data.friends
                }
              })
              .catch(e => {
                console.log(response.data.error)
                alert("Erro! Tente novamente mais tarde")
              })

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
            if (response.data.status && this.$route.name === "Home"){
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
