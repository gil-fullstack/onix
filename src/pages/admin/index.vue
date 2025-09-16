<script setup>
import {computed, onMounted, ref, shallowRef} from "vue";
import {useDisplay} from 'vuetify'
import {useRouter} from "vue-router";
import MyModal from "../../components/MyModal.vue";
import SpecialOffers from "./SpecialOffers.vue";

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
  {title: '', key: 'actions', align: 'center'},
  {title: 'Fotos', key: 'uploads', align: 'center'},
]
const getParts = async () => {
  // const response = await fetch('http://localhost:8082/parts/all')
  const response = await fetch('https://api.jjautostore.com/parts/all')
  parts.value = await response.json()
}
const edit = (item) => {
  isEditing.value = true
  console.log(item, 'item')
  IdEditing.value = item.id
  modalAddPart.value = true
  part.value = {
    "id": item.id,
    "name": item.name,
    "category": item.category,
    "brand": item.brand,
    "brand_code": item.brand_code,
    "auto_parts_code": item.auto_parts_code,
    "cars_models": item.cars_models,
    "years": item.years,
    "price": item.price,
  }
}
const closeModal = () => {
  modalAddPart.value = false
  isEditing.value = false
  part.value = {
    "id": null,
    "name": null,
    "category": null,
    "brand": null,
    "brand_code": null,
    "auto_parts_code": null,
    "cars_models": null,
  }
}
const closeMessageModal = () => {
  dialogMessage.value = false
  message.value = ""
  router.go()
}
const remove = async (id) => {
  console.log(id, 'id')
  // const response = await fetch(`http://localhost:8082/parts/${id}`, {
  const response = await fetch(`https://api.jjautostore.com/parts/${id}`, {
    method: 'DELETE'
  })
  console.log(response)
  if (response.ok) {
    await getParts()
    message.value = "Sua peça foi removida com sucesso!"
    dialogMessage.value = true
  } else{
    message.value = "Ocorreu um erro durante a remoção da peça!"
    console.log("Anything went wrong!")
    dialogMessage.value = true
  }
}
const prepareOpenAddPart = () => {
  console.log("prepareOpenAddPart")
  modalAddPart.value = true
  isEditing.value = false
}
const modalAddPart = shallowRef(false)
const dialogMessage = shallowRef(false)
const message = shallowRef("")
const isEditing = shallowRef(false)
const IdEditing = shallowRef(0)

const addPart = async () => {
  console.log(part.value, 'part.value')
  const myPart = {
    "name": part.value.name,
    "category": part.value.category,
    "brand": part.value.brand,
    "brand_code": part.value.brand_code,
    "auto_parts_code": part.value.auto_parts_code,
    "cars_models": part.value.cars_models,
    "years": part.value.years,
    "price": part.value.price,
    "photoPaths": part.value.photoPaths
  }
  // const response = await fetch('http://localhost:8082/parts/save', {
  if(!isEditing.value){
    const response = await fetch('https://api.jjautostore.com/parts/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myPart)
    })
    if (response.ok) {
      console.log(response, " into if")
      modalAddPart.value = false
      // await router.go()
      message.value = "Sua peça foi cadastrada com sucesso!"
      dialogMessage.value = true
    }
  }else {
    // const response = await fetch('http://localhost:8082/parts/update/' + IdEditing.value, {
    const response = await fetch('https://api.jjautostore.com/parts/update/' + IdEditing.value, {
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myPart)
    })
    if (response.ok) {
      console.log(response, " into else")
      modalAddPart.value = false
      // await router.go()
      message.value = "Sua peça foi atualizada com sucesso!"
      dialogMessage.value = true
    } else{
      modalAddPart.value = false
      message.value = "Algo de errado na atualização"
    }
  }

}
/* ────────────────────────────────────────────────
   Photo-upload modal state
──────────────────────────────────────────────────*/
const responseDialog = shallowRef(false)
const uploadDialog = shallowRef(false)  // open / close modal
const uploadFile = ref(null)
const uploading = ref(false)         // request in-flight
const multiple = ref(false)         // request in-flight
const uploadProgress = ref(0)
const uploadPartId = ref(0)// 0-100
const uploadPartName = ref("")// 0-100
const openUpload = (item) => {
  uploadPartId.value = item.id
  uploadPartName.value = item.name
  uploadFile.value = null
  uploadProgress.value = 0
  uploading.value = false
  uploadDialog.value = true
}
/* POST /photos/upload/{id} – single photo */
async function uploadOnePhoto(){
  const formData = new FormData()
  formData.append(
      'partId',
      uploadPartId.value
  )
  formData.append('file', uploadFile.value[0])
  // const response = await fetch(`http://localhost:8082/photos/upload/name/onix/` + uploadPartName.value + '/' + uploadPartId.value, {
  const response = await fetch(`https://api.jjautostore.com/photos/upload/name/onix/` + uploadPartName.value + '/' + uploadPartId.value, {
    method: 'POST',
    body: formData
  })
  if (response.ok) {
    await getParts()
    uploadDialog.value = false
    message.value = "Seu upload foi realizado com sucesso!"
    dialogMessage.value = true
  }else{
    uploadDialog.value = false
    message.value = "Ocorreu um erro ao realizar o upload! Tente novamente mais tarde.\n Se necessário avise o administrador do sistema"
    dialogMessage.value = true
  }
}
const closeDialogMessage = () => {
  dialogMessage.value = false
  router.go()
}


onMounted(() => {
  getParts()
})

</script>

<template>
  <div class="admin_main">
    <v-card width="98%" class="pt-1 pl-2 pr-2 text-center mb-4">
      <v-data-table
          :headers="headers"
          :hide-default-footer="parts.length < 11"
          :items="parts"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Peças Ônix Automotive</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                class="primary"
                variant="flat"
                color="primary"
                @click="prepareOpenAddPart"
            >
              <v-icon icon="mdi-plus"></v-icon>
              Nova Peça
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon icon="mdi-pencil" color="primary" @click="edit(item)"></v-icon>
            <v-icon icon="mdi-delete" color="error" small @click="remove(item.id)"/>
          </div>
        </template>
        <template v-slot:item.uploads="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-btn color="secondary" class="font-weight-bold" size="x-small" @click="openUpload(item)">
              SUBIR IMAGEM
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="modalAddPart" max-width="500">
      <v-card
          :subtitle="`${isEditing ? 'Update' : 'Create'} your part`"
          :title="`${isEditing ? 'Edit' : 'Add'} a part`"
      >
        <v-card-text>
          <v-text-field
              v-model="part.name"
              label="Nome da Peça"
              class="mt-n3"
              dense
              required
              :rules="[v => !!v || 'Name is required']"
              prepend-inner-icon="mdi-car-cog"
          />
          <v-text-field
              v-model="part.brand"
              label="Marca"
              class="mt-n3"
              dense
              required
              :rules="[v => !!v || 'Brand is required']"
              prepend-inner-icon="mdi-factory"
          />
          <!--                <v-text-field-->
          <!--                    v-model="part.model"-->
          <!--                    label="Model"-->
          <!--                    class="mt-n3"-->
          <!--                    dense-->
          <!--                    required-->
          <!--                    :rules="[v => !!v || 'Model is required']"-->
          <!--                    prepend-inner-icon="mdi-part-info"-->
          <!--                />-->
          <v-text-field
              v-model="part.auto_parts_code"
              label="Código Ônix"
              class="mt-n3"
              dense
              required
              :rules="[v => !!v || 'Codigo is required']"
              prepend-inner-icon="mdi-palette"
          />
          <v-text-field
              v-model="part.cars_models"
              label="Carros"
              class="mt-n3"
              dense
              required
              :rules="[v => !!v || 'Carros is required']"
              prepend-inner-icon="mdi-car"
          />
          <v-text-field
              v-model="part.years"
              label="Anos Compatíveis"
              class="mt-n3"
              dense
              prepend-inner-icon="mdi-calendar"
          />
          <v-text-field
              v-model="part.price"
              label="Preço"
              class="mt-n3"
              dense
              required
              :rules="[v => !!v || 'Price is required']"
              prepend-inner-icon="mdi-cash"
          />

        </v-card-text>
        <div style="display: flex; justify-content: space-around; padding: 4%" class=" mt-n8">
          <v-btn text="Cancel" @click="closeModal"></v-btn>
          <v-btn color="primary" @click="addPart">GRAVAR</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <my-modal
        v-if="dialogMessage"
        title="Nova Peça"
        size="mySize3"
        btn="OK"
        style="z-index: 101"
        @close-modal="closeDialogMessage"
        @btn-modal="closeMessageModal"
    >
      <v-card width="90%">
        <v-card-title>Ônix Automotive</v-card-title>
        <v-card-text class="mt-2 mb-7">
          <h3>{{ message }}</h3>
        </v-card-text>
      </v-card>
    </my-modal>
    <MyModal
        v-if="uploadDialog"
        size="mySize5"
        title="Suba a imagem correspondente a sua peça"
        btn="UPLOAD"
        cancelBtn="CANCEL"
        style="z-index: 100"
        @close-modal="uploadDialog = false"
        @btn-modal="uploadOnePhoto()"
        @cancel-modal="uploadDialog = false"
    >
      <div class="myUpload" style="width: 100%; padding: 2.8%">
        <v-file-input
            v-model="uploadFile"
            accept="image/*"
            multiple
            chips
            counter
            label="Select a photo"
            prepend-icon="mdi-camera"
            :disabled="uploading"
        />

        <v-progress-linear
            v-if="uploading"
            :model-value="uploadProgress"
            height="6"
            color="primary"
            class="mt-4"
            striped
            indeterminate="uploadProgress === 0"
        />
      </div>
    </MyModal>

    <!-- Special Offers Component -->
    <special-offers></special-offers>
  </div>
</template>

<style scoped lang="scss">
.admin_main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
