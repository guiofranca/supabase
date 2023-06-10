import { useGrandeza } from "~/stores/GrandezaStore";
import { useMedidor } from "~/stores/MedidorStore";
import { useNotification } from "~/stores/NotificationStore";

export type Intervalo = "5 minute" | "15 minute" | "1 hour" | "1 day" | "1 week" | "1 month";
export const intervaloLabels = [
    '5 minutos',
    '15 minutos',
    '1 hora',
    '1 dia',
    '1 semana',
    '1 mês',
];

export interface FiltroDeBusca {
    medidor: number,
    grandeza: number,
    intervalo: Intervalo,
    inicio: string,
    fim: string,
    timezone?: string,
}

export const intervalos = [
    { value: "5 minute", text: "5 minutos" },
    { value: "15 minute", text: "15 minutos" },
    { value: "1 hour", text: "1 hora" },
    { value: "1 day", text: "1 dia" },
    { value: "1 week", text: "1 semana" },
    { value: "1 month", text: "1 mês" },
];

export interface ConsultaMedidas {
    dados: {
        x: string,
        y: number
    }[],
    unidade: string;
    medidor: string;
    grandezaId: number;
    medidorId: number;
}

export async function BuscarMedidas(filtro: FiltroDeBusca): Promise<ConsultaMedidas> {
    const { data, error } = await useSupabaseClient().rpc("buscar_medidas", filtro);
    const grandeza = useGrandeza().grandezas.filter(g => g.id == filtro.grandeza)[0];
    const medidor = useMedidor().medidores.filter(m => m.id == filtro.medidor)[0];

    if (error != null) {
        useNotification().error(`Erro ao buscar grandeza ${filtro.grandeza} do medidor ${filtro.medidor}`);
    }

    return {
        dados: data ?? [],
        unidade: grandeza.unidade,
        medidor: medidor.nome,
        grandezaId: filtro.grandeza,
        medidorId: filtro.medidor
    };
}

export function milisegundosNoIntervalo(intervalo: Intervalo): number {
    switch (intervalo) {
        case '5 minute':
            return 5 * 60 * 1000;
        case '15 minute':
            return 15 * 60 * 1000;
        case '1 hour':
            return 60 * 60 * 1000;
        case '1 day':
            return 24 * 60 * 60 * 1000;
        case '1 week':
            return 7 * 24 * 60 * 60 * 1000;
        case '1 month':
            return 30 * 24 * 60 * 60 * 1000;
        default:
            return 1;
    }
}
