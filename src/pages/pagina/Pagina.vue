<template>
  <site-template>
    <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <router-link :to="'/pagina/'+donoPagina.id+'/'+$slug(donoPagina.name,{lower:true})">
            <img :src="donoPagina.image" :alt="donoPagina.name" class="circle responsive-img"> <!-- notice the "circle" class -->
          </router-link>
        </grid-vue>

        <grid-vue tamanho="8">
          <span class="black-text">
            <router-link :to="'/pagina/'+donoPagina.id+'/'+$slug(donoPagina.name,{lower:true})">
              <h5>{{donoPagina.name}}</h5>
            </router-link>
            <button v-if="exibeBtnSeguir" @click="amigo(donoPagina.id)" class="btn ">{{textoBtn}}</button>
          </span>
        </grid-vue>
      </div>
    </span>
    <span slot="menuesquerdoamigo">
      <h3>Seguindo</h3>
      <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{lower:true})">
        <li >{{item.name}}</li>
      </router-link>
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
        :usuarioId="item.user.id"
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
        user: {image:'', name:''},
        urlProximaPagina: null,
        paraScroll: false,
        donoPagina: {
          image:'',
          name:''
        },
        exibeBtnSeguir: false,
        amigos: [],
        amigosLogado: [],
        textoBtn: 'Seguir'
      }
    },
    created() {
      this.atualizaPagina()
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
    watch: {
      '$route':'atualizaPagina'
    },
    methods: {
      atualizaPagina(){
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
                if (this.donoPagina.id != this.user.id){
                  this.exibeBtnSeguir = true
                }else{
                  this.exibeBtnSeguir = false
                }

                this.$http.get(this.$urlAPI+`user/list/page/friend/`+this.donoPagina.id,
                  {
                    "headers": {"authorization": "Bearer " +  this.$store.getters.getToken}
                  })
                  .then( response => {
                    if (response.data.status){
                      // console.log(response)
                      this.amigos = response.data.friends
                      this.amigosLogado = response.data.friendLogged
                      this.eAmigo()
                    }
                  })
                  .catch(e => {
                    // console.log(response.data.error)
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
      eAmigo(){
        for (let amigo of  this.amigosLogado){
          if (amigo.id === this.donoPagina.id){
            this.textoBtn = 'Remover'
            return
          }
        }
        this.textoBtn = 'Seguir'
      },
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
      },
      amigo(id){
        this.$http.post(this.$urlAPI+'user/friend',{id: id},
          {"headers": {"authorization": "Bearer " +  this.$store.getters.getToken}})
          .then(response => {
            // console.log(response)
            if (response.data.status){
              this.amigosLogado = response.data.friends
              this.eAmigo()
            }else{
              alert(response)
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
