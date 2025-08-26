<script setup>
import { useDisplay } from 'vuetify'
import {computed} from "vue";
const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)
</script>

<template>
  <div class="my_main">
    <div class="banner">
      <img v-if="!isMobile" src="../assets/banner2_site_1.jpg" width="100%" alt="banner ONIX">
      <img v-else src="../assets/page.jpg" width="100%" alt="banner ONIX">
    </div>
    <div class="my_text">
      <h2 class="text-center">SUSPENSÃO - FREIO - FILTROS</h2>
      <p>A <strong>Onix Automotive</strong> é seu melhor fornecedor de suspensão e freios e filtros, com preços competitívos e excelência no atendimento. A Onix oferece ainda uma linha de peças variadas para para fixação e estabildade do carro.</p>
      <p class="mt-2">A <strong>Onix Automotive</strong>  ainda ajuda você a controlar o estoque, tem pessoal treinado para te orientar
      com visitas presenciais com apoio técnico e aplicação dos produtos</p>
    </div>
    <div class="highlight">
      <img src="../assets/bigger_logo.png" width="50%" class="logo" alt="Vite logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my_main{
  background-color: #242424;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .my_text{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    background-color: white;
    font-size: 1.2em;
    padding: 4%;
  }
  .highlight{
    padding: 1.4% 2.8%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
  }
  .banner{
    width: 100%;
    display: flex;
  }
}
@media (max-width: 768px) {
  .my_main{
    padding: 0;
    .my_text{
      h2{
        font-size: 1em;
      }
      p{
        font-size: 0.88em;
      }
    }
    .highlight{
      padding: 3% 2.8%;
      max-width: 100%;
      img{
        width: 30%;
      }
    }  }
}
</style>