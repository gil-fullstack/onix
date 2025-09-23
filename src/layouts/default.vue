<script setup>
import {computed, ref} from 'vue'
import logo from '@/assets/LOGO_prata.svg'
import {useRouter} from "vue-router";
import {useDisplay} from 'vuetify'
import App from "../App.vue";
import My_footer from "../components/my_footer.vue";

const display = useDisplay();
const router = useRouter();
const isMobile = computed(() => display.smAndDown.value)
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>

    <nav class="my-menu">
      <div class="menu-container">
        <router-link to="/" class="logo-link">
          <img
              :src="logo"
              alt="Ônix Logo"
              class="my-logo"
              :style="isMobile ? 'max-width: 35%; height: auto': 'max-width: 15%; height: auto'"
          />
        </router-link>
        <ul class="nav-links" :class="{ 'is-open': isMobileMenuOpen }">
          <li @click="toggleMobileMenu">
            <router-link to="/">HOME</router-link>
          </li>
          <li @click="toggleMobileMenu">
            <router-link to="/about">Sobre Nós</router-link>
          </li>
          <li @click="toggleMobileMenu">
            <router-link to="/SpecialSale">Promoções</router-link>
          </li>
          <li @click="toggleMobileMenu">
            <router-link to="/contato">CONTATO</router-link>
          </li>
<!--          <li v-if="logged || logged2" :key="count" @click="toggleMobileMenu">-->
<!--            <router-link to="/admin">ADMIN</router-link>-->
<!--          </li>-->
        </ul>
        <div class="menu-actions">
          <button v-if="!isMobile" class="search-btn" aria-label="Account">
<!--                      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"-->
<!--                           viewBox="0 0 24 24">-->
<!--                        <circle cx="11" cy="11" r="7"/>-->
<!--                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>-->
<!--                      </svg>-->

<!--              <v-icon color="white" to="/ClienteRegister">-->
<!--                mdi-account-->
<!--                <v-tooltip-->
<!--                    activator="parent"-->
<!--                    location="bottom"-->
<!--                >Cadastre-se</v-tooltip>-->
<!--              </v-icon>-->
            <v-btn variant="text" color="white" to="/ClienteRegister">
              <v-icon size="x-large">mdi-account</v-icon>
              <v-tooltip
                  activator="parent"
                  location="bottom"
              >Cadastre-se</v-tooltip>
            </v-btn>


          </button>
<!--          <button v-if="(!isMobile && logged) || (!isMobile && logged2)" :key="count" class="search-btn"-->
<!--                  aria-label="Search" @click="logout">-->
<!--                      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"-->
<!--                           viewBox="0 0 24 24">-->
<!--                        <circle cx="11" cy="11" r="7"/>-->
<!--                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>-->
<!--                      </svg>-->
<!--            LOGOUT-->
<!--          </button>-->
          <button v-if="isMobile" class="menu-btn" aria-label="Menu" @click="toggleMobileMenu">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <router-view/>
   <my_footer></my_footer>
</template>

<style lang="scss" scoped>
$ferrari-red: #ff6410;
$ferrari-yellow: #ffe600;
$dark: #5a5a5a;
$white: #fff;
body {
  background-color: $white;
}

.my-menu {
  width: 100%;
  background: $dark;
  box-shadow: 0 2px 18px -8px rgba(0, 0, 0, 0.14);
  position: relative;
  z-index: 100;

  .access-login {
    position: absolute;
    right: 4%;
    top: 14%;
    float: right;
  }

  .menu-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 32px;
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    display: flex;
    align-items: center;

    .my-logo {
      height: 48px;
      width: auto;
      margin-top: 2px;
    }
  }

  .nav-links {
    display: flex;
    gap: 2.4rem;
    list-style: none;
    margin: 0;
    padding: 0;

    li a {
      text-decoration: none;
      font-family: 'Montserrat', Arial, sans-serif;
      font-weight: 600;
      font-size: 0.7rem;
      letter-spacing: 0.09em;
      color: $white;
      padding-bottom: 4px;
      border-bottom: 2px solid transparent;
      transition: color 0.18s, border-bottom 0.18s;

      &:hover, &:focus {
        color: $ferrari-red;
        border-bottom: 2px solid $ferrari-red;
      }
    }
  }

  .menu-actions {
    display: flex;
    align-items: center;
    gap: 0.9rem;

    .search-btn, .menu-btn {
      background: none;
      border: none;
      color: $white;
      padding: 7px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.18s;

      &:hover {
        background: rgba(255, 0, 0, 0.18);
        color: $ferrari-red;
      }

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-btn svg, .menu-btn svg {
      display: block;
    }
  }

  .menu-btn {
    display: none; // Hide hamburger by default
  }
}

.store-footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
}

// --- Responsive Styles ---

@media (max-width: 960px) {
  .my-menu {
    .nav-links {
      display: none; // Hide navigation links
    }

    .menu-btn {
      display: flex; // Show hamburger menu icon
    }

    .search-btn {
      display: none; // Hide search icon to save space
    }

    .nav-links.is-open {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 0;

      // Style as a dropdown panel
      position: absolute;
      top: 63px; // Position below the navbar
      left: 0;
      width: 100%;
      background: $dark;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

      li a {
        font-size: 1rem; // Make text larger for better readability
        border-bottom: none;

        &:hover, &:focus {
          border-bottom: none;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .my-menu .menu-container {
    padding: 0 16px;
  }
  .logo-link .my-logo {
    height: 40px;
  }
}
@media (height: 1080px) {
  .my-menu {
    width: 100%;
    background: $dark;
    box-shadow: 0 2px 18px -8px rgba(0, 0, 0, 0.14);
    position: relative;
    z-index: 100;

    .access-login {
      position: absolute;
      right: 4%;
      top: 14%;
      float: right;
    }

    .menu-container {
      max-width: 1900px;
      margin: 0 auto;
      padding: 0 32px;
      height: 63px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-link {
      display: flex;
      align-items: center;

      .my-logo {
        height: 48px;
        width: auto;
        margin-top: 2px;
      }
    }

    .nav-links {
      display: flex;
      gap: 2.4rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li a {
        text-decoration: none;
        font-family: 'Montserrat', Arial, sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        letter-spacing: 0.09em;
        color: $white;
        padding-bottom: 4px;
        border-bottom: 2px solid transparent;
        transition: color 0.18s, border-bottom 0.18s;

        &:hover, &:focus {
          color: $ferrari-red;
          border-bottom: 2px solid $ferrari-red;
        }
      }
    }

    .menu-actions {
      display: flex;
      align-items: center;
      gap: 0.9rem;

      .search-btn, .menu-btn {
        background: none;
        border: none;
        color: $white;
        padding: 7px;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.18s;

        &:hover {
          background: rgba(255, 0, 0, 0.18);
          color: $ferrari-red;
        }

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .search-btn svg, .menu-btn svg {
        display: block;
      }
    }

    .menu-btn {
      display: none; // Hide hamburger by default
    }
  }
}

</style>
