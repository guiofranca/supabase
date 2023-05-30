export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            SupabaseUrl: process.env.SUPABASE_URL,
            SupabaseAnonKey: process.env.SUPABASE_KEY,
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/tailwindcss',
    ],
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
            secure: true,
        },
        storage: 'localStorage',
    },
})
