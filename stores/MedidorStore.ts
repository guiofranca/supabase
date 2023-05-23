import { defineStore } from "pinia";
import { useNotification } from "./NotificationStore";

interface Grandeza {
    id: number,
    nome: string,
    unidade: string,
}

export interface Medidor {
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
            const supabase = useSupabaseClient();
            let medidores = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)').order('id', { ascending: true });
            this.medidores = medidores.data!;
        },
        async refreshSingle(id: number) {
            const supabase = useSupabaseClient();
            let medidor = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)').eq('id', id).single();
            this.medidores = this.medidores.filter(m => m.id != medidor.data?.id);
            this.medidores.push(medidor.data!);
        },
        async add(medidor: Medidor) {
            const supabase = useSupabaseClient();
            const { data } = await supabase.from('medidores').insert(medidor).select('id, nome, descricao, grandezas(id, nome, unidade)').single();
            this.medidores.push(data!)
            useNotification().success('Medidor criado!');
        },
        async remove(medidor: Medidor) {
            const supabase = useSupabaseClient();
            const { count } = await supabase.from('medidores').delete().eq('id', medidor.id);
            if (count == 0) {
                useNotification().error('Houve um erro ao excluir');
                return;
            }
            this.medidores = this.medidores.filter(m => m.id != medidor.id);
            useNotification().success(`Medidor ${medidor.nome} excluído`)
        },
        getById(id: number) {
            const medidor = this.medidores.find(m => m.id == id);
            if (medidor == undefined) {
                throw showError({ statusCode: 404, message: 'Medidor não encontrado' });
            }
            return medidor;
        },
        async edit(newValues: Medidor, medidor: Medidor) {
            const m = this.medidores.filter(m => m.id != medidor.id);
            if (medidor == undefined) {
                throw showError({ statusCode: 404, message: 'Medidor não encontrado' });
            }
            const supabase = useSupabaseClient();
            const { count } = await supabase.from('medidores').update(newValues).eq('id', medidor.id);
            if (count == 0) {
                useNotification().error('Houve um erro ao editar');
                return;
            }
            this.medidores = this.medidores.map(m => {
                if (m.id == medidor.id) {
                    m.nome = newValues.nome;
                    m.descricao = newValues.descricao;
                }
                return m;
            });
            useNotification().success('Medidor atualizado');
        }
    },
})