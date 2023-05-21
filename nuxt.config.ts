export default defineNuxtConfig({
    ssr: false,
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            OauthRedirectUrl: process.env.OAUTH_REDIRECT_URL ?? '/',
            SupabaseUrl: process.env.SUPABASE_URL,
            SupabaseAnonKey: process.env.SUPABASE_KEY,
        }
    },
    app: {
        baseURL: process.env.BASE_URL ?? '/',
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
