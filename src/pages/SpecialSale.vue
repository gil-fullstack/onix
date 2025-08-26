<script setup>
const parts = [
  {
    "id": 1,
    "name": "Front Shock Absorber",
    "category": "Suspension",
    "brand": "Monroe",
    "year": "2023",
    "price": 320.00,
    "mileage": "N/A",
    "photoPaths": "https://lojachevroletnova.vtexassets.com/arquivos/ids/13361853-300-300?v=638862888352900000&width=300&height=300&aspect=true"
  },
  {
    "id": 2,
    "name": "Rear Shock Absorber",
    "category": "Suspension",
    "brand": "KYB",
    "year": "2023",
    "price": 290.00,
    "mileage": "N/A",
    "photoPaths": "https://lojachevroletnova.vtexassets.com/arquivos/ids/13361853-300-300?v=638862888352900000&width=300&height=300&aspect=true"
  },
  {
    "id": 3,
    "name": "Brake Disc",
    "category": "Brakes",
    "brand": "Bosch",
    "year": "2024",
    "price": 450.00,
    "mileage": "N/A",
    "photoPaths": "https://acdn-us.mitiendanube.com/stores/646/838/pr…ution-efbe4e1227485ef3f817501670232689-480-0.webp"
  },
  {
    "id": 4,
    "name": "Brake Pad Set",
    "category": "Brakes",
    "brand": "TRW",
    "year": "2024",
    "price": 220.00,
    "mileage": "N/A",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 5,
    "name": "Oil Filter",
    "category": "Filters",
    "brand": "Fram",
    "year": "2024",
    "price": 60.00,
    "mileage": "Replace every 10,000 km",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 6,
    "name": "Air Filter",
    "category": "Filters",
    "brand": "Mann",
    "year": "2024",
    "price": 80.00,
    "mileage": "Replace every 15,000 km",
    "photoPaths": "https://images.tcdn.com.br/img/img_prod/1027273/filtro_de_ar_do_motor_gm_chevrolet_cobalt_onix_prisma_spin_joy_joy_plus_tecfil_arl8830_177_1_52fda62772843665a5d57d408fea9648.jpg"
  },
  {
    "id": 7,
    "name": "Fuel Filter",
    "category": "Filters",
    "brand": "Mahle",
    "year": "2024",
    "price": 95.00,
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
  <div v-for="(part, k) in parts" :key="part.id" class="part-card">
    <!--        <img :src="carImageBaseUrl + '/'+ part.id +'/main_' + part.id +'.jpg'" :alt="part.name" class="part-image" />-->
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-img
          height="240px"
          :src="part.photoPaths"
          cover
      ></v-img>

      <v-card-title>
        {{ part.name }}
      </v-card-title>

      <v-card-subtitle class="text-md-body-1">
        Mileage: {{ part.mileage }}
      </v-card-subtitle>
      <p class="part-year mt-2 ml-4">Year: {{ part.year }}</p>
      <p class="part-price mt-2 ml-4 mb-n3">Price: <span>{{ part.price }}</span></p>
<!--      <v-card-actions>-->
<!--        <v-btn-->
<!--            color="orange-lighten-2"-->
<!--            text="Explore"-->
<!--        ></v-btn>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn-->
<!--            :icon="expandedId === part.id  ? 'mdi-chevron-up' : 'mdi-chevron-down'"-->
<!--            @click="toggleCard(part.id, k)"-->
<!--        ></v-btn>-->
<!--      </v-card-actions>-->
<!--      <v-expand-transition v-if="k === timeId" >-->
<!--        <div v-show="expandedId === part.id">-->
<!--          <v-divider></v-divider>-->
<!--          <v-card-text>-->
<!--            This part has been fully inspected, all the paperwork is up to date, and it’s ready to be financed.-->
<!--          </v-card-text>-->
<!--          <v-btn class="font-weight-bold mb-5 ml-4" color="primary" @click="goToCarDetails(part.id)">See more</v-btn>-->
<!--        </div>-->
<!--      </v-expand-transition>-->
    </v-card>
  </div>
</div>
</template>

<style scoped lang="scss">
.sale_main{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4% 7%;
  .part-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    padding: 2rem;
    //max-width: 1200px;
    max-width: 88%;
    margin: 0 auto;
  }
  .part-card {
    background-color: transparent;
    //border-radius: 8px;
    //box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    //overflow: hidden;
    overflow-x: auto;
    overflow-y: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .part-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .part-image {
    max-width: 100%;
    //width: 100%;
    height: auto;
    object-fit: fill;
    //object-fit: contain;
  }

  .part-details {
    padding: 1rem;
    text-align: center;
  }

  .part-name {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }

  .part-year {
    font-size: 1rem;
    margin: 0.25rem 0;
    color: #555;
  }

  .part-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #cc0000;
    margin: 0.75rem 0;
  }
}
@media screen and (max-width: 608px){
  .sale_main{
    h2{
      font-size: 1.1rem;
    }
  }
}
</style>