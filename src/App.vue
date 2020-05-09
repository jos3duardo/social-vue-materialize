<template>
  <span>
    <header>
      <nav-bar-vue cor="green darken-1" url="#" logo="Social" />
    </header>
    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>
    <footer-vue cor="green darken-1" logo="Social" descricao="Teste de descrição" ano="2020">
        <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
    </footer-vue>
  </span>
</template>

<script>
import NavBarVue from "./components/layouts/NavBarVue";
import FooterVue from "./components/layouts/FooterVue";

export default {
  name: 'App',
  components: {
    NavBarVue,
    FooterVue
  }
}
</script>

<style>

</style>
