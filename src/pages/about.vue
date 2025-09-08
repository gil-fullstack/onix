<script setup>

</script>

<template>
<div class="about_main">
  <div class="banner">
    <img src="../assets/banner_parede.jpg"  alt="placa Distribuidora">
  </div>
  <div class="my_text">
    <h2>Sobre Nós</h2>
    <p>Há mais de 30 anos no mercado, a Equipe Ônix Automotive Peças se consolida como uma distribuidora de confiança no
      setor automotivo. De origem familiar, nossa história é marcada pelo compromisso em oferecer não apenas peças
      de qualidade, mas também um atendimento próximo e personalizado, que valoriza cada cliente como parte da nossa trajetória.
    </p>
    <p class="mt-3">
      Nosso time está sempre pronto para atender tanto presencialmente, com visitas que levam soluções diretamente até você,
      quanto de forma online, garantindo agilidade e praticidade no seu dia a dia.
    </p>
    <p class="mt-3">Trabalhamos com uma ampla linha de peças para diversas marcas de veículos, sempre com o cuidado de selecionar produtos
      confiáveis que atendam às necessidades do mercado. Nosso grande diferencial está em três segmentos que dominamos com excelência: Suspensão, Freios e Filtros.
    </p>
    <p class="mt-3">Na Ônix Automotive Peças, mais do que peças, entregamos confiança, tradição e parceria para manter seu veículo em perfeito
      funcionamento.
    </p>
  </div>
</div>

</template>

<style scoped lang="scss">
.about_main{
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .banner{
    width: 100%;
    img{
      margin-left: 2%;
      max-width: 100%;
    }
  }
  .my_text{
    padding: 1% 7.7%;
  }
    width: 100%;
    max-width: 1280px;
    text-align: justify;
    h2{
      font-size: 2.5rem;
      font-weight: 700;
    }
    p{
      font-size: 1.2rem;
    }
}
</style>