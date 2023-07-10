<template>
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

.img {
  width: 100% !important;
  height: 100% !important;
}
</style>
