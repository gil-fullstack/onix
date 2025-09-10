<script setup>
import { useDisplay } from 'vuetify'
import {computed, ref, onMounted} from "vue";
const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)

// const carImageBaseUrl = "http://localhost:8082/photos/onix/"
const carImageBaseUrl = "https://api.jjautostore.com/photos/onix/"
function resolveSrc(path) {
  // already a full URL → use as-is
  if (path.startsWith('http')) return path
  // only a file name or relative path → prepend base URL
  return carImageBaseUrl + path
}
const parts = ref([])

const getParts = () => {
  // fetch('http://localhost:8082/parts/all')
  fetch('https://api.jjautostore.com/parts/all')
  .then(response => response.json())
  .then(data => {
    parts.value.push(...data)
    // parts.forEach(part => {
    //   part.photoPaths = carImageBaseUrl + part.photoPaths
    // })
    console.log(parts)
  })
  .catch(error => console.log(error))
}
onMounted(() => {
  getParts()
})
</script>

<template>
<div class="sale_main">
  <h2 class="text-center">Peças com <i style="font-style:oblique">destaque</i> na semana:</h2>
  <hr />

  <main class="part-grid">
  <div v-for="(part, k) in parts" :key="part.id" class="part-card">
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-img
          v-if="part.photoPaths"
          :src="resolveSrc(part.photoPaths)"
          max-height="260"
          cover
      />

      <hr />
      <v-card-title class="ml-5 mt-2">
        {{ part.name }}
      </v-card-title>
      <v-card-text class="mb-4">
        <v-card-subtitle class="text-md-body-1">
          Marca: {{ part.brand }}
        </v-card-subtitle>
        <p class="part-year ml-4">Anos compatíveis: {{ part.years }}</p>
        <p v-if="part.price" class="part-price  ml-4 mb-n3">Preço: <span>{{ part.price }}</span></p>
      </v-card-text>

    </v-card>
  </div>
  </main>
</div>
</template>

<style scoped lang="scss">
@use '../styles/colors' as *;

.sale_main{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4% 7%;
  h2{
    color: $primaryColor;
  }
  .part-grid {
    background-color: #eae9e9;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    padding: 2rem;
    //max-width: 1200px;
    max-width: 88%;
    margin: 0 auto;
    .part-card {
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      overflow-x: auto;
      transition: transform 0.3s, box-shadow 0.3s;
      min-height: 370px;
    }
  }

}
@media screen and (max-width: 608px){
  .sale_main{
    padding: 2% 1%;
    h2{
      font-size: 1.3rem;
      margin-bottom: 0.7rem;
    }
    .part-grid {
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      min-width: 99%;
      .part-card{
        min-width: 99%;
      }
    }
  }
}
</style>