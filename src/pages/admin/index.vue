<script setup>
import {computed, onMounted, ref} from "vue";
import {useDisplay} from 'vuetify'
import {useRouter} from "vue-router";

const display = useDisplay()
const router = useRouter()
const isMobile = computed(() => display.smAndDown.value)
const parts = ref([])
const part = ref({
  "id": null,
  "name": null,
  "category": null,
  "brand": null,
  "brand_code": null,
  "auto_parts_code": null,
  "cars_models": null,
  "years": null,
  "price": null,
  "photoPaths": null
})
const headers = [
  {title: 'Peça', key: 'name', align: 'center'},
  {title: 'Marca', key: 'brand', align: 'center'},
  {title: 'Código', key: 'auto_parts_code', align: 'center'},
  {title: 'Carros', key: 'cars_models', align: 'center'},
  {title: 'Anos', key: 'years', align: 'center'},
]
const getParts = async () => {
  const response = await fetch('http://localhost:8082/parts/all')
  parts.value = await response.json()
  console.log(parts.value, 'parts')
}

onMounted( () => {
  getParts()
})
</script>

<template>
<div class="admin_main">
  <v-card width="98%" class="pt-1 pl-2 pr-2 text-center">
    <v-data-table
        :headers="headers"
        :hide-default-footer="parts.length < 11"
        :items="parts"
    >
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Peças Onix Automotive</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="primary" variant="flat" color="primary">
            <v-icon icon="mdi-plus"></v-icon>
            Nova Peça
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</div>
</template>

<style scoped lang="scss">
.admin_main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>