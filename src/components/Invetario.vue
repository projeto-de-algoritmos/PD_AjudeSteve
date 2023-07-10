<template>
  <div>
    Mochila: {{ pesoAtual }} de {{ pesoMochila }}kg
    <br />
    Valor Atual: {{ valorAtual }} | Melhor Valor: {{ melhorValor }}
  </div>
  <br />
  <div class="main1">
    <h1>Bau</h1>
    <div class="boxes">
      <template v-for="data in minerios" :key="data.nome">
        <template v-for="(item, index) in data.quantidade" :key="index">
          <div
            class="box"
            :id="`box_${getIndex(data.nome, index)}`"
            :draggable="true"
            @dragstart="dragStart(`box_${getIndex(data.nome, index)}`, 'bau')"
            @dragover.prevent
            @drop="drop(`box_${getIndex(data.nome, index)}`, `bau`)"
          >
            <img class="img" :src="`/img/icons/${data.img}`" />
          </div>
        </template>
      </template>
    </div>

    <h1>Inventário</h1>

    <div class="boxes2">
      <div
        v-for="n in 27"
        :key="n"
        :id="`box_inventario_${n}`"
        class="box"
        :draggable="true"
        @dragstart="dragStart(`box_inventario_${n}`, `inventario`)"
        @dragover.prevent
        @drop="drop(`box_inventario_${n}`, `inventario`)"
      ></div>
    </div>
  </div>
  <br />
  <button @click="gerarResultado">Gerar Resultado</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import data from "@/assets/config";
import Knapsack from "@/utils/knapsack";

interface Minerio {
  nome: string;
  peso: number;
  valor: number;
  quantidade: number;
  img: string;
}

interface FormattedResult {
  name: string;
  quantity: number;
}

export default defineComponent({
  name: "inventorySteve",
  data() {
    return {
      knapsack: Object() as Knapsack,
      contador: 1,
      resposta: [] as FormattedResult[],
      pesoMochila: 0,
      pesoAtual: 0,
      valorAtual: 0,
      melhorValor: 0,
      inventario: [] as Minerio[],
      minerios: [] as Minerio[],
      buffer: Object() as Minerio,
      dropKey: "s" as string,
      empyt: "" as string,
    };
  },
  mounted() {
    this.pesoMochila = data.pesoMochila;
    this.minerios = data.minerios;
    this.knapsack = new Knapsack(this.minerios, this.pesoMochila);
    this.melhorValor = this.knapsack.getMelhorResultado();
    this.resposta = this.knapsack.getMelhorResultadoItens();
  },
  methods: {
    getIndex(nome: string, index: number) {
      let data = nome + "_" + index;
      data = data
        .normalize("NFD")
        .replace(/\s/g, "_")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      return data;
    },
    dragStart(index: string, nome: string) {
      this.dropKey = nome;
      this.empyt = index;

      let el = document.getElementById(index);
      let img = el?.querySelector("img");
      if (img !== null) {
        let name = img?.getAttribute("src")?.split("/")[3];
        let element = this.minerios.find((e) => e.img == name) as Minerio;
        this.buffer = element;
      }
    },
    drop(index: string, nome: string) {
      let el = document.getElementById(index) as HTMLElement;
      let el2 = document.getElementById(this.empyt) as HTMLElement;
      let img = el?.querySelector("img");

      if (img !== null) {
        //implementar swap
        return;
      }

      if (nome == "inventario") {
        if (this.dropKey == "bau") {
          if (this.pesoAtual + this.buffer.peso > this.pesoMochila) {
            alert("Mochila cheia");
            return;
          }
          this.inventario.push(this.buffer);
          this.pesoAtual += this.buffer.peso;
          this.valorAtual += this.buffer.valor;
        }
        el.innerHTML = `<img class="img" src="/img/icons/${this.buffer.img}">`;
        el2.innerHTML = "";

        this.buffer = Object() as Minerio;
        this.dropKey = "";
        this.empyt = "";
      } else {
        let el = document.getElementById(index) as HTMLElement;
        let el2 = document.getElementById(this.empyt) as HTMLElement;

        if (img !== null) {
          //implementar swap
          return;
        }

        if (this.dropKey == "inventario") {
          this.pesoAtual -= this.buffer.peso;
          this.valorAtual -= this.buffer.valor;
          let id = this.inventario.findIndex((e) => e.nome == this.buffer.nome);
          this.inventario.splice(id, 1);
        }

        el.innerHTML = `<img class="img" src="/img/icons/${this.buffer.img}">`;
        el2.innerHTML = "";
        this.buffer = Object() as Minerio;
        this.dropKey = "";
        this.empyt = "";
      }
    },
    gerarResultado() {
      let test = "";
      this.resposta.forEach((e) => {
        test += `${e.name} x ${e.quantity}\n`;
      });
      alert(test);
    },
  },
});
</script>

<style scoped>
.box i {
  font-size: calc(var(--slot-size) - 6px);
  line-height: var(--slot-size);
  width: var(--slot-size);
  text-align: center;
  color: #292929;
}

.fa-facebook-f g g path {
  stroke: black;
  stroke-width: 10;
}

.main1 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  height: auto;
  padding: 0 15px;
  padding-bottom: 15px;
  width: auto;
  background-color: #c6c6c6;
  box-shadow: 8px 0 0 0 #555555, 0 8px 0 0 #555555, 4px 4px 0 0 #555555,
    -8px 0 0 0 #e8e8e8, 0 -8px 0 0 #e8e8e8, -4px -4px 0 0 #e8e8e8,
    0 0 0 4px #b5b4b5, 4px 8px 0 0 #555, 8px 4px 0 0 #555, -4px -8px 0 0 #e8e8e8,
    -8px -4px 0 0 #e8e8e8, 8px -4px 0 0 #000, 4px -8px 0 0 #000,
    -8px 4px 0 0 #000, -4px 8px 0 0 #000, -8px -8px 0 0 #000, 8px 8px 0 0 #000,
    -12px 0 0 0 #000, -12px -4px 0 0 #000, 12px 0 0 0 #000, 12px 4px 0 0 #000,
    0 -12px 0 0 #000, -4px -12px 0 0 #000, 0 12px 0 0 #000, 4px 12px 0 0 #000;
}

.box {
  height: var(--slot-size);
  width: var(--slot-size);
  background-color: #919191;
  box-shadow: 2px 2px 0 2px #e8e8e8, -2px -2px 0 2px #555, 0 0 0 4px #8b8b8b;
}

.box:hover {
  background-color: #c3c3c3;
}

.boxes {
  display: grid;
  align-content: center;
  grid-template-columns: repeat(9, calc(var(--slot-size) + 8px));
  grid-template-rows: repeat(6, calc(var(--slot-size) + 8px));
}

.boxes2 {
  display: grid;
  grid-template-columns: repeat(9, calc(var(--slot-size) + 8px));
  grid-template-rows: repeat(3, calc(var(--slot-size) + 8px));
  margin-bottom: 25px;
}

.boxes3 {
  display: grid;
  grid-template-columns: repeat(9, calc(var(--slot-size) + 8px));
  grid-template-rows: repeat(1, calc(var(--slot-size) + 8px));
}

.boxes,
.boxes2,
.boxes3 {
  margin-left: 8px;
  cursor: pointer;
}

h1 {
  font-family: "MinecraftiaRegular";
  font-weight: normal;
  font-style: normal;
  color: #555;
  display: inline-block;
  width: 100%;
  padding-left: 15px;
  font-size: 1.2em;
  line-height: 30px;
  margin-top: 0;
}

@media (max-width: 600px) {
  .box {
    box-shadow: 1px 1px 0 1px #e8e8e8, -1px -1px 0 1px #555, 0 0 0 2px #8b8b8b;
  }

  .main1 {
    padding: 0 8px;
    padding-bottom: 8px;

    box-shadow: 4px 0 0 0 #555555, 0 4px 0 0 #555555, 2px 2px 0 0 #555555,
      -4px 0 0 0 #e8e8e8, 0 -4px 0 0 #e8e8e8, -2px -2px 0 0 #e8e8e8,
      0 0 0 2px #b5b4b5, 2px 4px 0 0 #555, 4px 2px 0 0 #555,
      -2px -4px 0 0 #e8e8e8, -4px -2px 0 0 #e8e8e8, 4px -2px 0 0 #000,
      2px -4px 0 0 #000, -4px 2px 0 0 #000, -2px 4px 0 0 #000,
      -4px -4px 0 0 #000, 4px 4px 0 0 #000, -6px 0 0 0 #000, -6px -2px 0 0 #000,
      6px 0 0 0 #000, 6px 2px 0 0 #000, 0 -6px 0 0 #000, -2px -6px 0 0 #000,
      0 6px 0 0 #000, 2px 6px 0 0 #000;
  }

  h1 {
    font-size: 1rem;
  }
}
</style>
