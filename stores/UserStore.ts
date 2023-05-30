import { Session } from "@supabase/supabase-js"
import { defineStore } from "pinia"
import { useNotification } from "./NotificationStore"

interface Profile {
    full_name: string | null
    has_avatar: boolean
    id: string
    updated_at: string
}

export const useUser = defineStore('user', {
    persist: true,
    state: () => ({
        profile: null as Profile | null,        
        session: null as Session | null,
    }),

    actions: {
        async signIn() {
            if (this.session == null) {
                console.log("Sessão vazia");
                return;
            }
            const supabase = useSupabaseClient();
            let profile = await supabase.from('profiles').select('id, full_name, has_avatar, updated_at').eq('id', this.session?.user.id).single();
            this.profile = profile.data!;
        },

        signOut() {
            this.profile = null;
            navigateTo('/');
        },

        setSession(session: Session | null) {
            const sameLoggedSession = this.session != null && (this.session.access_token == session?.access_token);
            if (sameLoggedSession) return;

            const isLoggingOut = this.session != null && session == null;
            if (isLoggingOut) {
                this.session = session;
                this.signOut();
                return;
            }

            const isLoggingIn = this.session == null && session != null;
            if (isLoggingIn) {
                this.session = session;
                this.signIn();
                return;
            }
        },
        async setFullName(full_name: string) {
            if (this.profile == undefined) {
                console.log('O perfil não está preenchido.');
                return;
            }

            const { count, error } = await useSupabaseClient().from('profiles').update({ full_name }, { count: 'exact' }).eq('id', this.profile?.id);

            if (error != null) throw error;

            if (count != 1) {
                useNotification().warning('Que estranho... Tente entrar novamente');
                return;
            }

            useNotification().success('Nome atualizado.');
            this.profile!.full_name = full_name;
        }
    },

    getters: {
        first_letter: (state) => state.profile?.full_name?.charAt(0) ?? '?',
        authenticated: (state) => state.session != null,
        avatar_url: (state) => {
            const supabase = useSupabaseClient();
            return state.profile?.has_avatar ? supabase.storage.from('avatars').getPublicUrl(`public/${state.profile.id}`).data.publicUrl : '';
        },
        isLoggedIn: (state) => state.session != null,
        isNotLoggedIn: (state) => state.session == null,
    },
})