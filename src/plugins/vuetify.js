/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: 'rgba(232,144,18,0.89)',
                    secondary: '#676767',
                    special: '#3c3b3b',
                    error: '#FF5252', // Error color
                }
            },
            dark: {
                dark: false,
                colors: {
                    // Override specific colors in the dark theme
                    primary: 'rgba(232,144,18,0.89)', // Custom primary color (example blue shade)
                    secondary: '#676767', // Custom secondary color (example yellow shade)
                    background: '#121212', // Background color
                    surface: '#1E1E1E', // Surface color
                    success: '#4CAF50', // Success color
                    warning: '#FB8C00', // Warning color
                    error: '#FF5252', // Error color
                    info: '#2196F3', // Info color
                },
            },
        }
    },
})
