<template>
  <Music />
  <nav>
    <router-link to="/"
      ><img
        class="livro-regras"
        src="/PD_AjudeSteve/img/compasso.gif"
        alt="Link para a Home"
      />
      <p class="texto-Menu">Home</p></router-link
    >
    |
    <router-link to="/regras">
      <img
        src="/PD_AjudeSteve/img/livro.svg"
        class="livro-regras"
        alt="Livro de Regras"
      />
      <p class="texto-Menu">Regras</p></router-link
    >
  </nav>
  <router-view />
</template>

<script lang="ts">
import Music from "./components/Music.vue";
export default {
  components: {
    Music,
  },
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "MinecraftiaRegular";
  src: local("MinecraftiaRegular"),
    url("@/assets/fonts/Minecraftia-Regular.ttf") format("truetype");
}

:root {
  --slot-size: 30px;
  --mobile-slot-size: 20px;
  --background-color: #8e6144;
}

body {
  background-image: url(../public/img/planoDeFundo.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  margin-top: 0;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.img {
  width: 100% !important;
  height: 100% !important;
}

.texto-Menu {
  font-family: "MinecraftiaRegular";
  font-size: 10pt;
}

a {
  text-decoration: none;
}

.livro-regras {
  width: 30px;
  height: 30px;
}
</style>
