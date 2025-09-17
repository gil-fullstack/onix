<script setup>
import { ref, computed, onMounted } from "vue";
import { useDisplay } from 'vuetify';
import { useRouter } from "vue-router";
import MyModal from "../components/MyModal.vue";

const display = useDisplay();
const router = useRouter();
const isMobile = computed(() => display.smAndDown.value);

// Cliente data structure
const cliente = ref({
  "name": null,
  "cnpj": null,
  "ie": null,
  "contact": null,
  "cellphone": null,
  "email": null,
  "address": null,
  "district": null,
  "city": null,
  "state": null
});

// Form validation
const valid = ref(true);
const nameRules = [
  v => !!v || 'Nome é obrigatório',
];
const cnpjRules = [
  v => !!v || 'CNPJ é obrigatório',
  v => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(v) || 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'
];
const emailRules = [
  v => !!v || 'E-mail é obrigatório',
  v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
];

// Modal state
const dialogMessage = ref(false);
const message = ref("");

// Register a new client
const registerCliente = async () => {
  try {
    const response = await fetch('http://localhost:8082/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente.value)
    });

    if (response.ok) {
      message.value = "Cliente cadastrado com sucesso!";
      dialogMessage.value = true;
      // Reset form
      resetForm();
    } else {
      message.value = "Erro ao cadastrar cliente. Por favor, tente novamente.";
      dialogMessage.value = true;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    message.value = "Erro ao cadastrar cliente. Por favor, tente novamente.";
    dialogMessage.value = true;
  }
};

// Reset form
const resetForm = () => {
  cliente.value = {
    "name": null,
    "cnpj": null,
    "ie": null,
    "contact": null,
    "cellphone": null,
    "email": null,
    "address": null,
    "district": null,
    "city": null,
    "state": null
  };
};

// Close message dialog
const closeMessageModal = () => {
  dialogMessage.value = false;
  message.value = "";
};

// Brazilian states for select
const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
</script>

<template>
  <div class="cliente-register">
    <v-container>
      <v-card class="mx-auto pt-1 pb-4 pl-4 pr-4" :max-width="isMobile ? '100%' : '800px'">
        <v-card-title
            :class="!isMobile ? 'text-center text-h4 mb-2 mt-n3' : 'text-center text-h5 mb-4 mt-n3'"
            style="color: #DF5E19"
        >
          Cadastro de Cliente
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="registerCliente">
          <v-row dense>
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.name"
                label="Nome"
                placeholder="Nome da empresa"
                :rules="nameRules"
                required
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.cnpj"
                label="CNPJ"
                placeholder="XX.XXX.XXX/XXXX-XX"
                :rules="cnpjRules"
                required
                prepend-inner-icon="mdi-identifier"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense>
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.ie"
                label="Inscrição Estadual"
                placeholder="Inscrição Estadual"
                prepend-inner-icon="mdi-card-account-details-outline"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.contact"
                label="Contato"
                placeholder="Nome do contato"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense>
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.cellphone"
                label="Celular"
                placeholder="(XX) XXXXX-XXXX"
                prepend-inner-icon="mdi-cellphone"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" :md="6">
              <v-text-field
                v-model="cliente.email"
                label="E-mail"
                placeholder="email@exemplo.com"
                :rules="emailRules"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="cliente.address"
                label="Endereço"
                placeholder="Rua, número, complemento"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row dense>
            <v-col cols="12" :md="4">
              <v-text-field
                v-model="cliente.district"
                label="Bairro"
                placeholder="Bairro"
                prepend-inner-icon="mdi-home-city-outline"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" :md="4">
              <v-text-field
                v-model="cliente.city"
                label="Cidade"
                placeholder="Cidade"
                prepend-inner-icon="mdi-city"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" :md="4">
              <v-select
                v-model="cliente.state"
                label="Estado"
                :items="states"
                placeholder="Selecione um estado"
                prepend-inner-icon="mdi-map"
                variant="outlined"
                density="comfortable"
              ></v-select>
            </v-col>
          </v-row>
          
          <v-row dense class="mt-n1 pa-4" justify="space-around">
              <v-btn
                color="error"
                variant="outlined"
                @click="resetForm"
                :block="isMobile"
              >
                Limpar
              </v-btn>
              
              <v-btn
                color="primary"
                type="submit"
                :disabled="!valid"
                :block="isMobile"
              >
                Cadastrar Cliente
              </v-btn>

          </v-row>
        </v-form>
      </v-card>
    </v-container>
    
    <!-- Message Dialog -->
    <my-modal
      v-if="dialogMessage"
      title="Cadastro de Cliente"
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
@use '../styles/colors' as *;
.cliente-register {
  background: linear-gradient(360deg, rgba(251, 161, 53, 0.81), white);
  padding: 0 2rem 0.7rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0.7rem 0.2rem;
  }
}
</style>