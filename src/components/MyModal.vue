<script setup>
const props = defineProps({
  title: String,
  size: String,
  btn: String,
  cancelBtn: String,
})
</script>

<template>
  <div class="overlay" @click="$emit('close-modal')">
    <div class="modal" :class="size" @click.stop>
      <div class="title">
        <h5 style="color:white">{{ title }}</h5>
        <v-icon color="white" @click="$emit('close-modal')">mdi-close-box</v-icon>
      </div>
      <slot></slot>
      <v-row dense class="actions mt-7">
        <v-spacer></v-spacer>
        <v-btn v-if="cancelBtn"
               class="mr-7"
               color="lightgrey"
               style="font-weight: 800"
               @click="$emit('cancel-modal')">{{ cancelBtn }}</v-btn>
        <v-btn :color="btn.toUpperCase() === 'EXCLUIR' ? 'secondary' : 'primary'" class="mr-7" style="font-weight: 800" @click="$emit('btn-modal')">{{ btn }}</v-btn>
      </v-row>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use '../styles/colors' as *;
.overlay{
 position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(7, 2, 27, 0.6);
  display: flex;
  justify-content: center;
 }
 .detail{
  position: relative;
  margin-top: -3%;
  min-width: 100%;
 }
 .title{
   background-color: $primaryColor;
   min-width: 100%;
   padding-left: 1.4%;
   padding-right: 1.4%;
   display: flex;
   justify-content: space-between;
 }
 .actions{
   width: 100%;
 }
 .cancelColor{
   color: darkred;
 }
  .mySize{
    width: 38%;
    margin-top: 4%;
  }
  .mySize2{
    width: 42%;
    height: 280px;
    margin-top: 7%;
  }
 .mySize3{
    width: 38%;
    height: 244px;
    margin-top: 10%;
  }
.mySize4{
    width: 38%;
    height: 214px;
    margin-top: 10%;
  }
.mySize5{
  position: absolute;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: stretch;*/
  /*align-items: stretch;*/
  background-color: white;
  width: 44%;
  margin-top: 10%;
  height: auto;
  max-height: 99vh;
  overflow:auto;
}
.mySize5 > .actions{
  margin-bottom: 4% !important;
}
 .modal{
  max-height: 90%;
  padding: 0;
  background-color: white;
  /* min-height: 200px; */
  /* max-height: 560px; */
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
 }
@media (max-width: 600px) {
  .mySize{
    width: 90%;
    margin-top: 12%;
  }
  .mySize2{
    width: 90%;
    height: 280px;
    margin-top: 18%;
  }
  .mySize3{
    width: 90%;
    height: 244px;
    margin-top: 21%;
  }
  .mySize5{
    position: absolute;
    background-color: white;
    width: 100%;
    margin-top: 14%;
    height: auto;
    max-height: 99vh;
    overflow:auto;
  }
}
</style>



