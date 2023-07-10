<template>
  <h1>Regras</h1>

  <h2>Objetivo</h2>

  <span>
    O objetivo do jogo é conseguir levar o maior número de minerios do bau para
    seu inventario
  </span>

  <h2>Ponto</h2>

  <div>| Minerio | Peso | valor |</div>
  <div>| Carvão | 2 | 7 |</div>
  <div v-for="minerio in minerios" :key="minerio.nome">
    | {{ minerio.nome }} | {{ minerio.peso }} | {{ minerio.valor }} |
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import data from "@/assets/config";

interface Minerio {
  nome: string;
  peso: number;
  valor: number;
  quantidade: number;
  img: string;
}

export default defineComponent({
  name: "RegrasView",
  data() {
    return {
      minerios: [] as Minerio[],
    };
  },
  mounted() {
    this.minerios = data.minerios;
  },
});
</script>
