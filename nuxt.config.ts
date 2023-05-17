export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
    ],
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
            secure: true,
        },
        storage: 'cookies',
    },
})
