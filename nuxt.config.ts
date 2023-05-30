export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            SupabaseUrl: process.env.SUPABASE_URL,
            SupabaseAnonKey: process.env.SUPABASE_KEY,
        }
    },
    app: {
        //Precisa para funcionamento correto do Github Pages.
        baseURL: process.env.BASE_URL
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
