<script setup>
import { useDisplay } from 'vuetify'
import {computed} from "vue";
const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)
</script>

<template>
  <div class="geral_contact text-cente">
    <v-card class="my-card" :width="isMobile ? '96%':'80%'" elevation="7">
      <v-card-title>
        <h3 style="color: #DF5E19;">Fale conosco</h3>
        <img src="../assets/logo.png" alt="log">
      </v-card-title>

      <p class="mb-2" style="word-wrap: break-word; overflow-wrap: break-word;"
      >Estamos aqui para te esclarecer sobre qualquer peça ou dificuldade no conserto do carro.</p>

      <form>
        <v-text-field
            v-model="name"
            ref="usuario"
            label="* name:"
            name="name"
            placeholder="Será seu name de acesso ao sistema"
            dense
            @keyup.enter="$nextTick( () => $refs.email.focus())"
        ></v-text-field>

        <v-text-field
            v-model="email"
            ref="email"
            label="* Email"
            placeholder="email"
            :rules="emailRules"
            dense
            @keyup.enter="$nextTick( () => $refs.phone.focus())"
        ></v-text-field>
        <v-text-field
            ref="phone"
            v-model="fone"
            dense
            name="fone"
            v-maska="'(##) #####-####'"
            label="* Celular/Whatsapp"
            placeholder="Fone"
            @keyup.enter="$nextTick( () => $refs.message.focus())"
        ></v-text-field>
        <v-textarea
            v-model="message"
            ref="message"
            label="* Mensagem"
            name="message"
            placeholder="Digite sua mensagem"
        ></v-textarea>
        <v-row justify="end">
          <v-btn
              color="primary"
              class="mt-3 mr-4 mb-7 font-weight-bold"
              @click="sendEmail"
          >Enviar
          </v-btn>
        </v-row>
      </form>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.geral_contact{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3% 14% 7% 14%;
  .my-card {
    padding: 2% 7% 4% 7%;
  }
}
@media (max-width: 600px) {
  .geral_contact{
    padding: 3% 0.5% 7% 0.5%;
  }
}
</style>