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
const offers = ref([])

// Testimonials in Brazilian Portuguese
const testimonials = [
  {
    text: "Encontrei exatamente a peça que precisava para o meu Onix. Entrega rápida e produto de qualidade!",
    author: "Carlos Silva"
  },
  {
    text: "Preços imbatíveis e atendimento de primeira. Recomendo a todos os proprietários de Onix!",
    author: "Mariana Oliveira"
  },
  {
    text: "Já é a terceira vez que compro aqui. Nunca me decepcionou. Peças originais e garantia de verdade!",
    author: "Roberto Santos"
  }
]

const getParts = () => {
  // fetch('http://localhost:8082/parts/all')
  fetch('https://api.jjautostore.com/parts/all')
  .then(response => response.json())
  .then(data => {
    parts.value.push(...data)
  })
  .catch(error => console.log(error))
}
const getOffers = () => {
  // fetch('http://localhost:8082/offers/last')
  fetch('https://api.jjautostore.com/offers/last')
      .then(response => response.json())
      .then(data => {
        offers.value = data
        // console.log(offers.value)
      })
      .catch(error => console.log(error))
}
onMounted(() => {
  getParts()
  getOffers()
})
</script>

<template>
<div class="sale_main">
  <!-- Hero Section -->
  <section  class="hero-section">
    <div v-if="offers.title" class="hero-content">
      <h1 v-if="offers" class="hero-title">{{ offers.title }}</h1>
      <h2 v-if="offers" class="hero-subtitle mt-n4">{{ offers.subtitle }}</h2>
      <p v-if="offers"  class="hero-description mt-n4">{{ offers.phrase }}</p>
      <a href="#produtos" class="cta-button">VER OFERTAS ESPECIAIS</a>
    </div>
    <div v-else class="hero2">
      <h1>O Melhor da Ônix Automotive para você</h1>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="benefits-section">
    <div class="benefit-item">
      <v-icon size="x-large" color="primary">mdi-truck-delivery</v-icon>
      <h3>Entrega Rápida</h3>
      <p>Receba suas peças em tempo recorde</p>
    </div>
    <div class="benefit-item">
      <v-icon size="x-large" color="primary">mdi-shield-check</v-icon>
      <h3>Garantia de Qualidade</h3>
      <p>Todas as peças com garantia</p>
    </div>
    <div class="benefit-item">
      <v-icon size="x-large" color="primary">mdi-cash-multiple</v-icon>
      <h3>Melhor Preço</h3>
      <p>Economia garantida em suas compras</p>
    </div>
  </section>

  <!-- Products Section -->
  <section id="produtos" class="products-section mt-n8">
    <h2 v-if="offers.title2" class="section-title">{{ offers.title2 }}</h2>
    <h2 v-else class="section-title">OFERTAS IMPERDÍVEIS DA SEMANA</h2>
    <p v-if="offers.phrase2" class="section-subtitle mt-n3">{{ offers.phrase2 }}</p>
    <p v-else class="section-subtitle mt-n3">Peças selecionadas com os melhores preços para você!</p>

    <div v-if="parts.length === 0" class="empty-message">
      <p>Aguarde! Em breve as melhores promoções estarão disponíveis aqui!</p>
    </div>

    <div v-else class="part-grid">
      <div v-for="(part, k) in parts" :key="part.id" class="part-card">
        <v-card class="mx-auto product-card" max-width="344">
          <div class="product-badge">OFERTA</div>
          <v-img
              v-if="part.photoPaths"
              :src="resolveSrc(part.photoPaths)"
              max-height="260"
              cover
              class="product-image"
          />

          <v-card-title class="product-title">
            {{ part.name }}
          </v-card-title>
          <v-card-text class="product-details">
            <p class="product-brand">Marca: <strong>{{ part.brand }}</strong></p>
            <p class="product-year">Anos compatíveis: <strong>{{ part.years }}</strong></p>
            <p v-if="part.price" class="product-price">
              <span class="price-label">Por apenas:</span>
              <span class="price-value">R$ {{ part.price }}</span>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="elevated" block class="buy-button">
              COMPRAR AGORA
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials-section">
    <h2 class="section-title">O QUE NOSSOS CLIENTES DIZEM</h2>
    <div class="testimonials-container">
      <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
        <v-icon size="large" color="primary" class="quote-icon">mdi-format-quote-close</v-icon>
        <p class="testimonial-text">{{ testimonial.text }}</p>
        <p class="testimonial-author">- {{ testimonial.author }}</p>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="cta-section">
    <h2>NÃO PERCA TEMPO!</h2>
    <p>Aproveite agora mesmo nossas ofertas exclusivas para o seu Onix.</p>
    <a href="#produtos" class="cta-button">VER TODAS AS OFERTAS</a>
  </section>
</div>
</template>

<style scoped lang="scss">
@use '../styles/colors' as *;

.sale_main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, $primaryColor 0%, rgba(255, 102, 0, 0.8) 10%, rgba(255, 102, 0, 0.4) 30%, rgba(255, 255, 255, 0.9) 70%, #ffffff 100%);
  color: #333;

  /* Hero Section */
  .hero-section {
    width: 100%;
    padding: 5rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, $primaryColor, $secondColor);
    color: white;
    border-radius: 0 0 50% 50% / 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .cta-button {
      display: inline-block;
      background-color: white;
      color: $primaryColor;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      }
    }
  }

  /* Benefits Section */
  .benefits-section {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 3rem 1rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    .benefit-item {
      flex: 1;
      min-width: 250px;
      text-align: center;
      padding: 2rem;
      margin: 1rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-10px);
      }

      h3 {
        color: $primaryColor;
        font-size: 1.5rem;
        margin: 1rem 0;
      }

      p {
        color: #666;
        font-size: 1rem;
      }
    }
  }

  /* Products Section */
  .products-section {
    width: 100%;
    padding: 4rem 2rem;
    text-align: center;

    .section-title {
      color: $primaryColor;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 3rem;
    }

    .empty-message {
      background-color: white;
      padding: 3rem;
      border-radius: 8px;
      text-align: center;
      margin: 2rem auto;
      width: 80%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      p {
        font-size: 1.5rem;
        color: $primaryColor;
        font-weight: 500;
      }
    }

    .part-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;

      .part-card {
        position: relative;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
          transform: translateY(-10px);
        }

        .product-card {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          background-color: white;
          position: relative;
        }

        .product-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: $primaryColor;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          z-index: 1;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .product-image {
          transition: transform 0.5s ease;

          &:hover {
            transform: scale(1.05);
          }
        }

        .product-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: $primaryColor;
          padding: 1rem;
        }

        .product-details {
          padding: 0 1rem 1rem;

          p {
            margin-bottom: 0.5rem;
            font-size: 1rem;
          }

          .product-price {
            margin-top: 1rem;

            .price-label {
              display: block;
              font-size: 0.9rem;
              color: #666;
            }

            .price-value {
              display: block;
              font-size: 1.8rem;
              font-weight: 700;
              color: $primaryColor;
            }
          }
        }

        .buy-button {
          margin: 0 1rem 1rem;
          padding: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          transition: all 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }

  /* Testimonials Section */
  .testimonials-section {
    width: 100%;
    padding: 4rem 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;

    .section-title {
      color: $primaryColor;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
    }

    .testimonials-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;

      .testimonial-card {
        flex: 1;
        min-width: 300px;
        max-width: 400px;
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        position: relative;

        .quote-icon {
          position: absolute;
          top: -15px;
          left: 20px;
          background-color: white;
          border-radius: 50%;
          padding: 5px;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
          color: #555;
        }

        .testimonial-author {
          font-weight: 700;
          color: $primaryColor;
          text-align: right;
        }
      }
    }
  }

  /* Call to Action Section */
  .cta-section {
    width: 100%;
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, $primaryColor, $secondColor);
    color: white;
    margin-top: 3rem;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: white;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      display: inline-block;
      background-color: white;
      color: $primaryColor;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .sale_main {
    .hero-section {
      padding: 3rem 1rem;

      .hero-title {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1.4rem;
      }
    }

    .benefits-section {
      .benefit-item {
        min-width: 100%;
        margin: 0.5rem 0;
      }
    }

    .products-section {
      padding: 3rem 1rem;

      .section-title {
        font-size: 2rem;
      }

      .empty-message {
        width: 95%;
        padding: 2rem 1rem;

        p {
          font-size: 1.2rem;
        }
      }

      .part-grid {
        grid-template-columns: 1fr;
      }
    }

    .testimonials-section {
      padding: 3rem 1rem;

      .section-title {
        font-size: 2rem;
      }

      .testimonial-card {
        min-width: 100%;
      }
    }

    .cta-section {
      padding: 3rem 1rem;

      h2 {
        font-size: 2rem;
      }
    }
  }
}
</style>
