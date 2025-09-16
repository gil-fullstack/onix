<script setup>
import { ref, shallowRef } from "vue";
import MyModal from "../../components/MyModal.vue";

// Special Offers form data
const specialOffer = ref({
  "name": null,
  "image": null,
  "description": null,
  "title": null,
  "subtitle": null,
  "phrase": null,
  "title2": null,
  "subtitle2": null,
  "phrase2": null
});

const offers = ref([]);
const modalSpecialOffer = shallowRef(false);
const isEditingOffer = shallowRef(false);
const offerIdEditing = shallowRef(0);
const dialogMessage = shallowRef(false);
const message = shallowRef("");

// Headers for the data table
const headers = [
  {title: 'Nome', key: 'name', align: 'center'},
  {title: 'Título', key: 'title', align: 'center'},
  {title: 'Subtítulo', key: 'subtitle', align: 'center'},
  {title: 'Descrição', key: 'description', align: 'center'},
  {title: '', key: 'actions', align: 'center'},
];

// Fetch all offers
const getOffers = async () => {
  try {
    // const response = await fetch('https://api.jjautostore.com/offers/all');
    const response = await fetch('http://localhost:8082/offers/all');
    if (response.ok) {
      offers.value = await response.json();
    } else {
      console.error("Failed to fetch offers");
    }
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
};

// Open modal to add a new offer
const openSpecialOfferModal = () => {
  modalSpecialOffer.value = true;
  isEditingOffer.value = false;
  specialOffer.value = {
    "name": null,
    "image": null,
    "description": null,
    "title": null,
    "subtitle": null,
    "phrase": null,
    "title2": null,
    "subtitle2": null,
    "phrase2": null
  };
};

// Close the special offer modal
const closeSpecialOfferModal = () => {
  modalSpecialOffer.value = false;
  isEditingOffer.value = false;
  specialOffer.value = {
    "name": null,
    "image": null,
    "description": null,
    "title": null,
    "subtitle": null,
    "phrase": null,
    "title2": null,
    "subtitle2": null,
    "phrase2": null
  };
};

// Submit the special offer form
const submitSpecialOffer = async () => {
  const offerData = {
    "name": specialOffer.value.name,
    "image": specialOffer.value.image,
    "description": specialOffer.value.description,
    "title": specialOffer.value.title,
    "subtitle": specialOffer.value.subtitle,
    "phrase": specialOffer.value.phrase,
    "title2": specialOffer.value.title2,
    "subtitle2": specialOffer.value.subtitle2,
    "phrase2": specialOffer.value.phrase2
  };

  try {
    // const response = await fetch('https://api.jjautostore.com/offers', {
    const response = await fetch('http://localhost:8082/offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offerData)
    });

    if (response.ok) {
      modalSpecialOffer.value = false;
      message.value = "Sua oferta especial foi cadastrada com sucesso!";
      dialogMessage.value = true;
      await getOffers(); // Refresh the offers list
    } else {
      modalSpecialOffer.value = false;
      message.value = "Ocorreu um erro ao cadastrar a oferta especial.";
      dialogMessage.value = true;
    }
  } catch (error) {
    console.error("Error submitting special offer:", error);
    modalSpecialOffer.value = false;
    message.value = "Ocorreu um erro ao cadastrar a oferta especial.";
    dialogMessage.value = true;
  }
};

// Edit an existing offer
const editOffer = (item) => {
  isEditingOffer.value = true;
  offerIdEditing.value = item.id;
  modalSpecialOffer.value = true;
  specialOffer.value = { ...item };
};

// Remove an offer
const removeOffer = async (id) => {
  try {
    const response = await fetch(`https://api.jjautostore.com/offers/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await getOffers();
      message.value = "Sua oferta especial foi removida com sucesso!";
      dialogMessage.value = true;
    } else {
      message.value = "Ocorreu um erro durante a remoção da oferta!";
      dialogMessage.value = true;
    }
  } catch (error) {
    console.error("Error removing offer:", error);
    message.value = "Ocorreu um erro durante a remoção da oferta!";
    dialogMessage.value = true;
  }
};

// Close message dialog
const closeMessageModal = () => {
  dialogMessage.value = false;
  message.value = "";
  getOffers(); // Refresh the offers list
};

// Fetch offers on component mount
getOffers();
</script>

<template>
  <div class="special-offers">
    <v-card width="98%" class="pt-1 pl-2 pr-2 text-center">
      <v-data-table
        :headers="headers"
        :hide-default-footer="offers.length < 11"
        :items="offers"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Ofertas Especiais</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              class="secondary"
              variant="flat"
              color="secondary"
              @click="openSpecialOfferModal"
            >
              <v-icon icon="mdi-star"></v-icon>
              Nova Oferta Especial
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon icon="mdi-pencil" color="primary" @click="editOffer(item)"></v-icon>
            <v-icon icon="mdi-delete" color="error" small @click="removeOffer(item.id)"/>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Special Offer Modal -->
    <v-dialog v-model="modalSpecialOffer" max-width="600">
      <v-card
        title="Cadastrar Oferta Especial"
        subtitle="Preencha os dados da oferta especial"
      >
        <v-card-text>
          <v-text-field
            v-model="specialOffer.name"
            label="Nome da Oferta"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Nome é obrigatório']"
            prepend-inner-icon="mdi-tag"
          />
          <v-text-field
            v-model="specialOffer.image"
            label="URL da Imagem"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Imagem é obrigatória']"
            prepend-inner-icon="mdi-image"
          />
          <v-textarea
            v-model="specialOffer.description"
            label="Descrição"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Descrição é obrigatória']"
            prepend-inner-icon="mdi-text"
            rows="3"
          />
          <v-text-field
            v-model="specialOffer.title"
            label="Título"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Título é obrigatório']"
            prepend-inner-icon="mdi-format-title"
          />
          <v-text-field
            v-model="specialOffer.subtitle"
            label="Subtítulo"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Subtítulo é obrigatório']"
            prepend-inner-icon="mdi-format-title"
          />
          <v-text-field
            v-model="specialOffer.phrase"
            label="Frase"
            class="mt-n3"
            dense
            required
            :rules="[v => !!v || 'Frase é obrigatória']"
            prepend-inner-icon="mdi-format-quote-close"
          />
          <v-divider class="my-4"></v-divider>
          <v-text-field
            v-model="specialOffer.title2"
            label="Título 2"
            class="mt-n3"
            dense
            prepend-inner-icon="mdi-format-title"
          />
          <v-text-field
            v-model="specialOffer.subtitle2"
            label="Subtítulo 2"
            class="mt-n3"
            dense
            prepend-inner-icon="mdi-format-title"
          />
          <v-text-field
            v-model="specialOffer.phrase2"
            label="Frase 2"
            class="mt-n3"
            dense
            prepend-inner-icon="mdi-format-quote-close"
          />
        </v-card-text>
        <div style="display: flex; justify-content: space-around; padding: 4%" class="mt-n4">
          <v-btn text="Cancelar" @click="closeSpecialOfferModal"></v-btn>
          <v-btn color="secondary" @click="submitSpecialOffer">SALVAR OFERTA</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Message Dialog -->
    <my-modal
      v-if="dialogMessage"
      title="Oferta Especial"
      size="mySize3"
      btn="OK"
      style="z-index: 101"
      @close-modal="closeMessageModal"
      @btn-modal="closeMessageModal"
    >
      <v-card width="90%">
        <v-card-title>Ônix Automotive</v-card-title>
        <v-card-text class="mt-2 mb-7">
          <h3>{{ message }}</h3>
        </v-card-text>
      </v-card>
    </my-modal>
  </div>
</template>

<style scoped lang="scss">
.special-offers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>