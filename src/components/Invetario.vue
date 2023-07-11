<template>
  <div class="container">
    <div class="valores">
      Mochila: {{ pesoAtual }} de {{ pesoMochila }}kg
      <br />
      Valor Atual: {{ valorAtual }} | Melhor Valor: {{ melhorValor }}
      <button class="botao" @click="gerarResultado">Mostrar Resultado</button>

      <div v-if="mostraResultado == 0">
        <div class="estrutura-ganha">
          <div class="plano-fundo">
            <img
              src="/PD_AjudeSteve/img/Villager.svg"
              alt="Villager da vitória"
            />
            <table class="texto-ganho">
              <thead>
                <tr>
                  <th>Minerio</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in resposta" :key="r.name">
                  <td>{{ r.name }}</td>
                  <td>{{ r.quantity }}</td>
                </tr>
              </tbody>
            </table>
            <p class="partida-ganha texto-ganho">
              Esse é o melhor resultado para ganhar o seu
              <img
                class="imagem-trigo"
                src="/PD_AjudeSteve/img/Trigo.svg"
                alt="Trigo de Troca"
              />
              &nbsp; 'Trigo' &nbsp;!
            </p>
          </div>
          <button
            class="botao-ganhou botao partida-ganha"
            @click="fecharResultado"
          >
            Fechar Aba
          </button>
        </div>
      </div>
    </div>
    <br />
    <div class="main1">
      <h1>Baú</h1>
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
              <img class="img" :src="`/PD_AjudeSteve/img/icons/${data.img}`" />
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

        <div v-if="valorAtual == melhorValor">
          <div class="estrutura-ganha">
            <div class="plano-fundo">
              <img
                src="/PD_AjudeSteve/img/Villager.svg"
                alt="Villager da vitória"
              />
              <p class="partida-ganha texto-ganho">
                Obrigado por ajudar Steve a escolher os melhores minérios isso
                vai dar uma ótima troca. Claro aqui está seu
                <img
                  class="imagem-trigo"
                  src="/PD_AjudeSteve/img/Trigo.svg"
                  alt="Trigo de Troca"
                />
                &nbsp; 'Trigo' &nbsp;!
              </p>
            </div>
            <button
              class="botao-ganhou botao partida-ganha"
              @click="reiniciaPartida"
            >
              Reiniciar Partida!
            </button>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
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
      mostraResultado: 1,
      inventario: [] as Minerio[],
      minerios: [] as Minerio[],
      buffer: Object() as Minerio,
      dropKey: "s" as string,
      empyt: "" as string,
      resultado: [] as FormattedResult[],
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
        let name = img?.getAttribute("src")?.split("/")[4];
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
        el.innerHTML = `<img class="img" src="/PD_AjudeSteve/img/icons/${this.buffer.img}">`;
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

        el.innerHTML = `<img class="img" src="/PD_AjudeSteve/img/icons/${this.buffer.img}">`;
        el2.innerHTML = "";
        this.buffer = Object() as Minerio;
        this.dropKey = "";
        this.empyt = "";
      }
    },
    gerarResultado() {
      this.mostraResultado = 0;
    },
    fecharResultado() {
      this.mostraResultado = 1;
    },
    reiniciaPartida() {
      window.location.reload();
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.botao {
  height: 50px;
}

table {
  font-size: 7pt;
  font-weight: 700;
  margin-right: 3px;
}

.botao-ganhou {
  padding-top: 5px;
  margin-top: 10px;
}

.texto-ganho {
  background-color: rgba(0, 0, 0, 0.5);
}

.imagem-trigo {
  width: 32px;
  height: 32px;
  padding: 2px;
}
.estrutura-ganha {
  background-color: #292929;
  position: fixed;
  left: 30%;
  top: 35%;
  z-index: 5;
  padding: 5px;
}

.plano-fundo {
  display: flex;
  background-image: url("@/assets/Fundo.jpg");
  background-repeat: no-repeat;
  flex-direction: row;
  width: 600px;
  height: 200px;
  padding: 5px;
  color: white;
}

.partida-ganha {
  font-family: "MinecraftiaRegular";
}

.valores {
  color: white;
  font-family: "MinecraftiaRegular";
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  height: auto;
  padding: 0 15px;
  padding-bottom: 0px;
  width: auto;
  height: 200px;
  gap: 20px;
  background-color: #8b5c33;
  box-shadow: 8px 0 0 0 #6c441e, 0 8px 0 0 #6c441e, 4px 4px 0 0 #6c441e,
    -8px 0 0 0 #4d3b23, 0 -8px 0 0 #4d3b23, -4px -4px 0 0 #4d3b23,
    0 0 0 4px #b5b4b5, 4px 8px 0 0 #555, 8px 4px 0 0 #555, -4px -8px 0 0 #4d3b23,
    -8px -4px 0 0 #4d3b23, 8px -4px 0 0 #000, 4px -8px 0 0 #000,
    -8px 4px 0 0 #000, -4px 8px 0 0 #000, -8px -8px 0 0 #000, 8px 8px 0 0 #000,
    -12px 0 0 0 #000, -12px -4px 0 0 #000, 12px 0 0 0 #000, 12px 4px 0 0 #000,
    0 -12px 0 0 #000, -4px -12px 0 0 #000, 0 12px 0 0 #000, 4px 12px 0 0 #000;
}

.botao {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAAPCAAAAACe4j/AAAAEuElEQVRIx1WWS5Ibuw5EtddrdRRJJE4iSKrb4c2/AUuy30iK+jEBHCTwAICMCgAKiGhKVQUwKzJHQo4mQGBy7AIvk1E2AQKhFt6bUGD1gILy0DkD4dmzACkGyzCScgFgQmLZr4LpQpC56QB2wgSYE8i1fd6xd1yPHIAKwAs14Undx2LIHK0X6vdFbzTa6CNBLQE8Y5rapn7oAl3KSDKC6cLfL6sLnIVG7ffnyUgvQ6rwLjUZdIVqWz0iEXXCZ+TJsV8feUdoPHDk+a/IeAbq0ldLT59jtHweHwmKS6gFSUYCqKcVsPami1pEnqolkCMBiAS87FXTICp03geYUr8TV8un3KuyC0BfTUzihOCdwjUya1bkT9VWe+AaFOoJzHdtERXRe/eulyEDhC6pjYwr+JQuIDU9/0wQBnJEAkd+9i6IRTJrV7YWnGfwLA6ESphkBoCu88M0YH1CTTOiRUpDdwpGkkP5yL9phhwn+QVxDarAXq513y9bLKgxBGR/CjDyMl4ECd6lO82CaMLbEHGHp1R8ePDERj392ssaCOigNjJ+dXXl6OLUFfVx6dA1BFJLlHpkUHPam095C3QJLIjn6OLIOB3xe0JS85Zd+govg1/z/UhtG3RdVW98yxNp5I0Vtf/U+6y/dJ/yHtSK4q7G9ARscC3/Df/kXTwiT3d6ovjEISLJIVEvBwWeCXlALZTbpy85xqWuf3sNiBBUmYjI+BqN6aNQqDWpipSYf3W1nOV/WALoykjIiCPreSn97UigsjZdPA5s3AmCDIxaVO0Fa1fV/qkaiijPPz/bEeRyLSBDI8K8j37TO8aH7vmOqUUQ1DboYhvqd+FlFGEo+2T75MbLGnjvPeu7Pl521Ap14dcR3h7p75qv4xieqnNDoyCPLt/yKkf5gOUXl+6S3d9Syq/982fz+fhpsm28C5EhJcxsWWQke6KoPMA7tqm7kKcrn6FLhWcoqCNCxDPyQ8wEKR73nIlEX8GpARSJX7/rzeNtWPD/Dl2IwtOYMwV7osGsHYJanzeU7KqIZVCTcrT0IEbyD4d1e1dkBtW2qLhLXK7a1ogDqsjI1DR4PY7nHEqfF9tn8HUJL+eQ/lGOXdwI1++57CqgmDaReM9CZYLAk4D4ymqti4KZI9Htz9OnrcuOhCQEqJfXaxHPAFG/l/ee1GFJPXmPryYUiUGPutnRGXkagmnjHk5RNpm7xxiclm6CjJEQ4+MD4xPmuT9Ef4b3YT3B51a7d4Np76PF0cavuC+SoaH6PlilipEakoJBJETWT3k7Hf+1REPj2fIx95t5ct6u9S5v3KM2fv2Ve29ax9yC98zT2IZot61MHyYtdPF92nguZ29xfcVxSu9Nj5Gl8G3wcVoW8n1Q/f6BHFEAyy5R2aRIdYH8XfV4453vHKcnqarXPD6mdrD0rlVV5xBPF2xuJM5Oo0SdaaqGMjJva7ii6bYv74IzPMo5pGebpu72ghypwTR+WWDuhQOkFijGyAzF3GXh11lEH0hkPINZivpTqLEtVm2j1hVcn/S0//q0es5dbyxOErxKivQ+bHotvzcT3/XztPf20XqG6fJZMePT2X6ts+nlm9LoSYHMiHuJjGXniB7v2fo/5qT4nuxYg6AAAAAASUVORK5CYII=);
  font-family: "MinecraftiaRegular";
  border-color: #aaa #565656 #565656 #aaa;
  font-weight: 400;
  outline: 2px solid #000;
  text-align: center;
  color: white;
}

.botao:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAAPCAMAAACMV5AuAAAAVFBMVEVtd7ZteLZverdwerdwe7hxfLhyfbl0frl1f7p2gLt4grx6hLx7hb18hr5+iL+AisCBi8GCjMGEjsKGkMOHkcSIksSKk8WLlMWLlcaMlcaNlsePmMdwBHmVAAAEjElEQVRIx1WW27YbKw5F3Ul2GYTWFAJX+pyd///PfgDsTg0/mSqQ1k08AEAeDkAA7kXyDAeyu2QCWREgCGSvAAbIE/D9U2m8Ji4Drw0CEhP7EMiqBFxmDMBEkHvd5AziDsjoCKQXddUl1nuZgMZrf0PMdj1kgNY+Ay+CJPg8kj1rR3X/GS9kxaoJVFaB6QkxIX5TBX65mpAZGQH3HaoCFMj6/GxuYgDyTsyup1hfxwxVN+F08ANGANyf8jqAPaBpranJvhxV+VV08JGPVScmcL8W4EIuAFWFHMZrUkUfNC3WtIsEaFogMWJRl839MES61w1cjMUsI1fb7GKaoENMOdFNykzXPz2mlwekkXjV4ioO9b15rZWZd4AaCL9cxdSutl8buIOUkd8JTgAy01IKoFoFPhAZr65SbDHgxFIGKi5IpLaKdlafAHxaVWDt2SSZ24LQhEx6aLGyj7RtELDLiA7EiD72ehBiQJo5oPq1nOQMYGAIYoY2AwIrImaA+25P8vZRa0KgqrjnQIaACiom/1G9Sla3GUHVLl/mMl/mxeUPGT0T5seAeeAQtF9WV2F7cX4niJ4DYmBd12oh7jymyRkBuq6M81mQuExHVv313beo9VH3ojfM2zZ8AkTG8X7EeDs6OZw+mrY7E5l/gqQJmZx+YySQAi1/dqQZy0as4FL1d7nrcfd1kjWTX1ZIYESTUCnuPZE7+anrqcxlz3diUX2HowHCf15S3AvxrnhRxeMwtQACGYGKZ7wGjNl7vH73MHdP8s/vSXM0FiRqMnPowfbjRsfe6n7nZ/FGIyfgF6+A/t1XTrcWB3Q42AxkMOfMfuJotRPgqGqFMfB8KO6eN+BEpO8F2eLZ18YO0GUdmEDcXMcNey+XuOfvP5P35guSVxAzWRYUpIoSuZiJrJ/p4zPouw0pwX+6XwpIcyNWEcJ/uf5Svuyx+ncTfhmotEhIBPe/8f961F/jI5aQfSs3WFOwChnZZxPk+HQjZu/WBuDFVwobZnoLISBOdkmNLFPE9iadiImsgTcdTDKA8dj1qBT518Xcg6+6L0Yl/nqCLeH+b46InkCSETTBzEQBRoPEwS9lKVUkpEx426M3oIMHYQLhK/B6jHvgXw6if4+YM4mlJdWDpLw4MhHgjwBZgIt+ZJdAVENOEkiv6mY4yy5nFPjnQmGfGVy0IqP+cmbsWF7Se/rT+5ZBzHPdKfajHW2ouWldPJaoTDJ3GUYTNMV/IyaiPYqQuX0VPXK+ra3Mc8c5Wlkp4D/e5S5htjXU3HnPPJsBXraRM/rSpOMX99zMoVradRl9AMxJdVPIYgf8Rhu0DvLM739A5rmjJ51QcW9SFXjcvR85oYOhSKTsd65pqdKWIV59ZO/7kKTDJLbvYw9XVRIyTXKJdfm4rOjE18yT8IHM/euZa0Z0fLvBSIh7h925QLoXR80WNfnqOHHP7Qk5aj+dTLX4E3hhIkafoGd15/IDT/lPTVSVr233dy6OkJtiLm0yBu+byeE2Yc59pVrDdKyPjxgD4h6r6vcFwpYNHMxVBaE2ApmfyTTjf5jQnWRymG7iAAAAAElFTkSuQmCC);
  border-color: #bdc6ff #59639a #59639a #bdc6ff;
  color: #ffff00;
}

.botao:active {
  background-color: #a6a6a6;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.3);
}

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
  padding-bottom: 0px;
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

.main1 h1 {
  margin-top: 10px;
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

.texto {
  font-family: "MinecraftiaRegular";
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
