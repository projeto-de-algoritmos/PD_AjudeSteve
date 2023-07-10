<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/regras">Regras</router-link>
  </nav>
  <router-view />
</template>

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
  background-color: var(--background-color);
  height: 100vh;
  width: 100%;
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
  padding: 30px;
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
</style>
