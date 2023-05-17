import { defineStore } from "pinia"

const supabase = useSupabaseClient();

export const useUser = defineStore('user', {
    persist: true,
    state: () => ({
        id: '' as string | undefined,
        full_name: '' as string | undefined,
        has_avatar: false as boolean | undefined,
        avatar_url: '' as string | undefined,
    }),

    actions: {
        async signIn(user: any) {
            let profile = await supabase.from('profiles').select(`id, full_name, has_avatar`).eq('id', user?.id).single();
            this.id = profile.data?.id;
            this.full_name = profile.data?.full_name;
            this.has_avatar = profile.data?.has_avatar;
            this.avatar_url = profile.data?.has_avatar ? supabase.storage.from('avatars').getPublicUrl(`public/${profile.data.id}`).data.publicUrl : '';
        },

        signOut() {
            this.id = undefined;
            this.full_name = undefined;
            this.has_avatar = undefined;
            this.avatar_url = undefined;
            navigateTo('/');
        },
    },

    getters: {
        first_letter: (state) => state.full_name?.charAt(0) ?? '?',
        authenticated: (state) => state.id != undefined,
    }
})