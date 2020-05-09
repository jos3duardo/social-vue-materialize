<template>
  <div>
    <nav-bar cor="green darken-1" url="#" logo="Social" />
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/layouts/NavBar";

export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style>

</style>
