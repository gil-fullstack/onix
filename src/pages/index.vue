<script setup>
import {useDisplay} from 'vuetify'
import {computed} from "vue";
import revisao from './../assets/REVISAO.jpg'
import supencao from './../assets/supencao.jpg'
import freio from './../assets/FREIO.jpg'

const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)
</script>

<template>
  <div class="my_main">
    <div class="banner">
      <img v-if="!isMobile" src="../assets/banner_01.jpg" width="100%" alt="banner ONIX">
      <img v-else src="../assets/page.jpg" width="100%" alt="banner ONIX">
    </div>
    <div class="my_text">
      <h3 class="text-center">SUSPENSÃO - FREIO - ITENS de REVISÃO</h3>
      <p>A <strong>Ônix Automotive</strong> é seu melhor fornecedor de suspensão e freios e itens de Revisão, com preços
        competitívos e excelência no atendimento. A Ônix oferece ainda uma linha de peças variadas para para fixação e
        estabilidade do carro.</p>
      <p class="mt-2">A <strong>Ônix Automotive</strong> ainda ajuda você a controlar o estoque, tem pessoal treinado
        para te orientar
        com visitas presenciais com apoio técnico e aplicação dos produtos</p>
    </div>
    <div class="info_links">
      <h4 class="text-center">Click na imagem abaixo para abrir/baixar os catálogos:</h4>
    </div>
    <div class="parts mb-7">
      <a href="/suspencao.pdf" class="mb-10" :class="isMobile ? 'mt-7': ''" :style="isMobile ? 'width: 77%; border: none;': 'width: 20%; border: none;'" target="_blank" rel="noopener">
        <v-card
            width="100%"
        >
          <v-img
              :src="supencao"
              cover
          ></v-img>
        </v-card>
      </a>
      <a href="/freios.pdf" class="mb-10" :class="isMobile ? 'mt-7': ''" :style="isMobile ? 'width: 77%; border: none;': 'width: 20%; border: none;'" target="_blank" rel="noopener">
        <v-card
            width="100%"
        >
          <v-img
              :src="freio"
              cover
          ></v-img>
        </v-card>
      </a>
      <a href="/diversos.pdf" class="mb-10" :class="isMobile ? 'mt-7': ''" :style="isMobile ? 'width: 77%; border: none;': 'width: 20%; border: none;'" target="_blank" rel="noopener">
        <v-card
            width="100%"
        >
          <v-img

              :src="revisao"
              cover
          ></v-img>
        </v-card>
      </a>
    </div>
    <div class="info_links">
      <h4 class="text-center">Click no botão abaixo, faça seu cadastro e tenha informações especiais</h4>
      <v-btn variant="flat" color="secondary" class="mb-4" to="/ClienteRegister">Cadastro</v-btn>
    </div>
    <div class="highlight">
      <img src="../assets/LOGO_prata.svg" width="100%" class="logo" alt="Vite logo"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my_main {
  background-color: #242424;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .my_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    background-color: white;
    font-size: 1.2em;
    padding: 2% 7%;
  }

  .parts {
    padding: 2% 5%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 100%;
    min-width: 100%;
  }
  .info_links{
    background: linear-gradient(360deg, rgba(251, 169, 73, 0.81), white);
    width: 100%;
    padding-top: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4{
      margin-bottom: 1.4%;
    }
  }
  .highlight {
    padding: 0.7% 2.8%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
  }

  .banner {
    width: 100%;
    display: flex;
  }
}

@media (max-width: 768px) {
  .my_main {
    padding: 0;

    .my_text {
      h2 {
        font-size: 1em;
      }

      p {
        font-size: 0.88em;
      }
    }

    .parts {
      flex-direction: column;
      margin-top: 1%;
      padding: 2% 1%;
      max-width: 100%;
      min-width: 100%;
      gap: 7%;
    }

    .highlight {
      margin-top: 5.5%;
      padding: 2% 2.8%;
      max-width: 100%;
      img {
        width: 50%;
        margin-top: -7%;
      }
    }
  }
}
@media (height: 1080px) {
  .my_main {
    .my_text {
      h2 {
        font-size: 0.8em;
      }
    }
    .info_links{
      h4{
        font-size: 1.6rem;
      }
    }
  }
}
</style>