import { defineStore } from "pinia";
import { Grandeza } from "./MedidorStore";

export const useGrandeza = defineStore('grandeza', {
    persist: true,
    state: () => ({
        grandezas: [] as Grandeza[],
        lastUpdate: new Date(),
    }),

    actions: {
        async refreshAll(force = false) {
            if (this.checkExpired()) force = true;
            const ehVazioOuForcado = this.grandezas.length == 0 || force;
            if (!ehVazioOuForcado) return;
            const supabase = useSupabaseClient();
            let grandezas = await supabase.from('grandezas').select('id, nome, unidade').order('nome', { ascending: true });
            this.grandezas = grandezas.data! as Grandeza[];
        },
        search(term: string) {
            return this.grandezas.filter(g => g.nome.includes(term));
        },
        checkExpired() {
            const expired = ((new Date()).getTime() - (new Date(this.lastUpdate)).getTime()) > 3600 * 1000;
            if (expired) {
                this.lastUpdate = new Date();
                return true;
            }
            return false;
        }
    }
});