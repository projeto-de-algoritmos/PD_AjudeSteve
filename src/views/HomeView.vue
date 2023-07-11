<template>
  <div class="home">
    <Invetario />
  </div>

  <div class="imagem-steve">
    <img src="/PD_AjudeSteve/img/Steve.gif" alt="Steve do Minecraft girando" />
    <div>
      <img
        class="imagem-ajuda"
        src="/PD_AjudeSteve/img/Map.svg"
        alt="Mapa de explicação"
      />
      <p class="texto">
        Ajude-me, a trazer minérios para vender na vila, os valores estão no
        livro de regras
        <img
          class="livro-regras"
          src="/PD_AjudeSteve/img/livro.svg"
          alt="Livro de Regras"
        />
        &nbsp;, lá também estão os valores! Por favor me ajude!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Invetario from "@/components/Invetario.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    Invetario,
  },
});
</script>

<style>
.imagem-steve {
  position: absolute;
  left: 0;
  top: 400px;
  flex-direction: row;
  display: flex;
  gap: 10px;
}

.imagem-ajuda {
  width: 250px;
}

.texto {
  position: absolute;
  top: 10px;
  margin-left: 25px;
  width: 200px;
  text-align: center;
  font-family: "MinecraftiaRegular";
  font-size: 10pt;
  font-weight: 700;
}

.livro-regras {
  width: 30px;
  height: 30px;
}
</style>
