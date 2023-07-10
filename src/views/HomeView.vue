<template>
  <div class="home">
    <Invetario />
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
