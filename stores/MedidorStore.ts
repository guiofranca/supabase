import { defineStore } from "pinia"
import { Database } from '~/libs/types/Supabase.types';

const supabase = useSupabaseClient<Database>();

interface Grandeza {
    id: number,
    nome: string,
    unidade: string,
}

interface Medidor {
    id?: number,
    nome: string,
    descricao: string,
    grandezas?: Grandeza | Grandeza[] | null
}

export const useMedidor = defineStore('medidor', {
    persist: true,
    state: () => ({
        medidores: [] as Medidor[]
    }),

    actions: {
        async refreshAll() {
            let medidores = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)');
            this.medidores = medidores.data!;
        },
        async refreshSingle(id: number) {
            let medidor = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)').eq('id', id).single();
            this.medidores = this.medidores.filter((m) => m.id != medidor.data?.id);
            this.medidores.push(medidor.data!);
        },
        async add(medidor: Medidor) {
            const { data } = await supabase.from('medidores').insert(medidor).select('id, nome, descricao, grandezas(id, nome, unidade)').single();
            this.medidores.push(data!)
        }
    },

    getters: {
        first_letter: (state) => '?',
        authenticated: (state) => undefined,
    }
})