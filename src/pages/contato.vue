<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from "vue";
import api from '../plugins/axios';


// Constants
const API_ENDPOINT = '/sendmail/register';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Display properties
const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)

// Form data
const name = ref('');
const email = ref('');
const fone = ref('');
const message = ref('');
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');
function updateFone(e) {
  // You can trim or further process as needed
  fone.value = e.target.value;
}
// Validation rules
const emailRules = [
  v => !!v || 'E-mail é obrigatório',
  v => EMAIL_REGEX.test(v) || 'E-mail deve ser válido'
];

// Send email function
const sendEmail = async () => {
  // Validate form
  if (!name.value || !email.value || !fone.value || !message.value) {
    showSnackbar('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  if (!EMAIL_REGEX.test(email.value)) {
    showSnackbar('Por favor, insira um e-mail válido.', 'error');
    return;
  }

  loading.value = true;

  const sendEmail = {
    emailTo: 'fabiobruno.sp@gmail.com',
    subject: 'Email enviado pelo site ONIX Automotive',
    text: `${name.value} com email: ${fone.value} enviou essa mensagem: \n\n ${message.value}` ,
  }
  try {
    const response = await api.post(API_ENDPOINT, sendEmail);

    if (response.status === 200) {
      showSnackbar('Mensagem enviada com sucesso!', 'success');
      resetForm();
    } else {
      showSnackbar('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    showSnackbar('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
  } finally {
    loading.value = false;
  }
};

// Helper functions
const showSnackbar = (text, color) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  fone.value = '';
  message.value = '';
};
</script>

<template>
  <div class="geral_contact">
    <v-card class="my-card" :width="isMobile ? '96%':'80%'" elevation="7">
      <v-card-title>
        <h3 style="color: #DF5E19;">Fale conosco</h3>
        <img src="../assets/logo_preto.png" :width="isMobile ? '49%': '22%'" alt="log">
      </v-card-title>

      <p class="mb-2" style="word-wrap: break-word; overflow-wrap: break-word;"
      >Estamos aqui para te esclarecer sobre qualquer peça ou dificuldade no conserto do carro.</p>

      <form @submit.prevent="sendEmail">
        <v-text-field
            v-model="name"
            ref="usuario"
            label="* Nome:"
            name="name"
            placeholder="Digite seu nome completo"
            dense
            required
            @keyup.enter="$nextTick( () => $refs.emailRef.focus())"
        ></v-text-field>

        <v-text-field
            v-model="email"
            ref="emailRef"
            label="* Email"
            placeholder="email@exemplo.com"
            :rules="email ? emailRules : []"
            dense
            required
            @keyup.enter="$nextTick( () => $refs.phone.focus())"
        ></v-text-field>
        <v-mask-input
            ref="phone"
            v-model="fone"
            dense
            name="fone"
            mask="(##) #####-####"
            label="* Celular/Whatsapp"
            placeholder="(00) 00000-0000"
            required
            @keyup.enter="$nextTick( () => $refs.messageRef.focus())"
        ></v-mask-input>


        <v-textarea
            v-model="message"
            ref="messageRef"
            label="* Mensagem"
            name="message"
            placeholder="Digite sua mensagem"
            required
        ></v-textarea>
        <v-row justify="end">
          <v-btn
              type="submit"
              color="primary"
              class="mt-3 mr-4 mb-7 font-weight-bold"
              :loading="loading"
              :disabled="loading"
              @click="sendEmail"
          >
            {{ loading ? 'Enviando...' : 'Enviar' }}
          </v-btn>
        </v-row>
      </form>
    </v-card>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="5000"
      bottom
      right
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

    <div class="whatsappBase mt-7">
      <h3>Ou fale conosco pelo WhatsApp:</h3>
      <div class="whatsapp">
        <a href="https://wa.me/5535984326202" target="_blank" class="mt-1" rel="noopener noreferrer">
          <img src="../assets/social/whatsapp.svg" alt="WhatsApp" width="28" height="50"></img>
        </a>
        <span>(35) 984326202</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.geral_contact{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3% 14% 7% 14%;
  .my-card {
    padding: 2% 7% 4% 7%;
  }
  .whatsappBase{
    h3{
      color: #DF5E19;
    }
    .whatsapp{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      span{
        color: #676767;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
@media (max-width: 600px) {
  .geral_contact{
    padding: 3% 0.5% 7% 0.5%;
  }
}
</style>
