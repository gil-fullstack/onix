<script setup>

</script>

<template>
<div class="sale_main">
  <h2 class="text-center">Peças com preços especiais na semana</h2>
  <hr />
  Abaixo as peças com desconto da semana:
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
}
@media screen and (max-width: 608px){
  .sale_main{
    h2{
      font-size: 1.1rem;
    }
  }
}
</style>