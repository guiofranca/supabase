import { defineStore } from 'pinia';
import { useNotification } from './NotificationStore';

export interface Grandeza {
    id: number,
    nome: string,
    unidade: string
}

export interface Medidor {
    id?: number,
    nome: string,
    descricao: string,
    grandezas?: Grandeza[]
}

export interface MedidorEdit {
    id?: number,
    nome: string,
    descricao: string,
    grandezas: number[]
}

export const useMedidor = defineStore('medidor', {
    persist: true,
    state: () => ({
        medidores: [] as Medidor[]
    }),

    actions: {
        async refreshAll() {
            const supabase = useSupabaseClient();
            const medidores = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)').order('id', { ascending: true });
            this.medidores = medidores.data as Medidor[];
        },
        async refreshSingle(id: number) {
            const supabase = useSupabaseClient();
            const medidor = await supabase.from('medidores').select('id, nome, descricao, grandezas(id, nome, unidade)').eq('id', id).single();
            this.medidores = this.medidores.filter(m => m.id != medidor.data?.id);
            this.medidores.push(medidor.data as Medidor);
            this.medidores = this.medidores.sort((a, b) => a.id! - b.id!);
        },
        async add(medidor: Medidor) {
            const supabase = useSupabaseClient();
            const { data, error } = await supabase.from('medidores').insert(medidor).select('id, nome, descricao').single();
            if (error != null) throw error;
            this.medidores.push(data);
            useNotification().success('Medidor criado!');
        },
        async remove(medidor: Medidor) {
            const supabase = useSupabaseClient();
            const { count } = await supabase.from('medidores').delete({ count: 'exact' }).eq('id', medidor.id);
            if (count == 0) {
                useNotification().error('Houve um erro ao excluir');
                return;
            }
            this.medidores = this.medidores.filter(m => m.id != medidor.id);
            useNotification().success(`Medidor ${medidor.nome} excluído`);
        },
        getById(id: number) {
            const medidor = this.medidores.find(m => m.id == id);
            if (medidor == undefined) {
                throw showError({ statusCode: 404, message: 'Medidor não encontrado' });
            }
            return medidor;
        },
        async edit(newValues: MedidorEdit, medidor: Medidor) {
            const m = this.medidores.filter(m => m.id != medidor.id);
            if (m == undefined) {
                throw showError({ statusCode: 404, message: 'Medidor não encontrado' });
            }
            const supabase = useSupabaseClient();
            const count = await supabase.from('medidores').update({ nome: newValues.nome, descricao: newValues.descricao }, { count: 'exact' }).eq('id', medidor.id);

            if (count == null) {
                useNotification().error('Houve um erro ao editar');
                return;
            }

            const grandezasMudaram = newValues.grandezas.sort().join() != medidor.grandezas?.map(g => g.id).join();
            if (grandezasMudaram) {
                await supabase.from('medidor_grandeza').delete().eq('medidor_id', medidor.id);
                await supabase.from('medidor_grandeza').insert(newValues.grandezas.map(g => ({ grandeza_id: g, medidor_id: medidor.id! })))
                await this.refreshSingle(medidor.id!);
            } else {
                this.medidores = this.medidores.map(m => {
                    if (m.id == medidor.id) {
                        m.nome = newValues.nome;
                        m.descricao = newValues.descricao;
                    }
                    return m;
                });
            }

            useNotification().success('Medidor atualizado');
        },
    }
});