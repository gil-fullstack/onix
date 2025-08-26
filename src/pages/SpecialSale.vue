<script setup>
import { useDisplay } from 'vuetify'
import {computed} from "vue";
const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)
const parts = [
  {
    "id": 1,
    "name": "Pastilha de Freio",
    "category": "Freios",
    "brand": "Monroe",
    "year": "2023",
    "price": "R$ 320.00",
    "mileage": "N/A",
    "photoPaths": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ppQSGokkeOJiUzprrHjYaKjCRY-v6h0_2NCsqWFQZV2cZbv9WY521K4&s"
  },
  {
    "id": 2,
    "name": "Amortecedor",
    "category": "Suspensão",
    "brand": "KYB",
    "year": "2023",
    "price": "R$ 290.00",
    "mileage": "N/A",
    "photoPaths": "https://lojachevroletnova.vtexassets.com/arquivos/ids/13361853-300-300?v=638862888352900000&width=300&height=300&aspect=true"
  },
  {
    "id": 3,
    "name": "Brake Disc",
    "category": "Brakes",
    "brand": "Bosch",
    "year": "2024",
    "price": "R$ 450.00",
    "mileage": "N/A",
    "photoPaths": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRL_MI48-1bbeDqLnbuN8i5MhFxUObd9ZkuOfyfFfb09_dWjuDLdaQd1nVzegVP8MjO_Ru8tn2vCNDKVGoWITmnow1LSg3uV2rtnmcB4S9HCu0x9ul6cdI3BQ"
  },
  {
    "id": 4,
    "name": "Brake Pad Set",
    "category": "Brakes",
    "brand": "TRW",
    "year": "2024",
    "price": "R$ 220.00",
    "mileage": "N/A",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 5,
    "name": "Oil Filter",
    "category": "Filters",
    "brand": "Fram",
    "year": "2024",
    "price": "R$ 60.00",
    "mileage": "Replace every 10,000 km",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 6,
    "name": "Filtro de Ar",
    "category": "Filters",
    "brand": "Mann",
    "year": "2024",
    "price": "R$ 80.00",
    "mileage": "Replace every 15,000 km",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 7,
    "name": "Fluído",
    "category": "Filters",
    "brand": "Mahle",
    "year": "2024",
    "price": "R$ 100.00",
    "mileage": "Replace every 20,000 km",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  }
]
</script>

<template>
<div class="sale_main">
  <h2 class="text-center">Peças com preços especiais na semana</h2>
  <hr />
  Abaixo as peças com desconto da semana:
  <main class="part-grid">
  <div v-for="(part, k) in parts" :key="part.id" class="part-card">
    <v-card
        class="mx-auto"
        :max-width="isMobile ? '95%' : '99%'"
        min-height="370px"
    >
      <v-img
          max-height="240px"
          :src="part.photoPaths"
          cover
      ></v-img>

      <v-card-title>
        {{ part.name }}
      </v-card-title>
      <v-card-subtitle class="text-md-body-1">
        Marca: {{ part.brand }}
      </v-card-subtitle>
      <p class="part-year ml-4">Year: {{ part.year }}</p>
      <p class="part-price  ml-4 mb-n3">Price: <span>{{ part.price }}</span></p>

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
      font-size: 1.1rem;
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