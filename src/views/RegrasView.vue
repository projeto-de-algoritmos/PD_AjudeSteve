<template>
  <h2>Regras</h2>
  <img src="/PD_AjudeSteve/img/notas.png" class="imagens" alt="Lado Esquerdo" />
  <div class="divisoria">
    <div class="nota-esquerda">
      <h3>Objetivo</h3>

      <span>
        O objetivo do jogo é conseguir levar o maior número de minerios do bau
        para seu inventario, ajude o Steve nessa missão
      </span>
    </div>

    <div class="nota-direita">
      <h3>Ponto</h3>

      <table>
        <thead>
          <tr>
            <th>Minerio</th>
            <th>Peso</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="minerio in minerios" :key="minerio.nome">
            <td>{{ minerio.nome }}</td>
            <td>{{ minerio.peso }}</td>
            <td>{{ minerio.valor }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

<style>
.divisoria {
  display: flex;
  flex-direction: row;
}

.imagens {
  margin-top: 40px;
  width: 800px;
  height: 500px;
  position: absolute;
  left: 18%;
  top: 25%;
  z-index: -2;
}

h2 {
  margin-bottom: 90px;
  color: white;
}

.nota-esquerda {
  width: 275px;
  margin-right: 60px;
}

.nota-direita {
  width: 300px;
}
</style>
