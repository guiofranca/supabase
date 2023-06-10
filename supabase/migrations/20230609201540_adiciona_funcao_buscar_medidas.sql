create function public.buscar_medidas(medidor bigint, grandeza bigint, intervalo interval, inicio timestamptz, fim timestamptz, timezone varchar default 'America/Recife') 
returns table(x timestamptz, y double precision) as 
$$
declare
	indice bigint;
begin
	select id into indice from public.medidor_grandeza where grandeza_id = grandeza and medidor_id = medidor;
	return query select time_bucket(intervalo, instante, timezone) as bucket, 
		avg(valor) as v
		from public.medidas 
		where medidor_grandeza_id = indice
		and instante between inicio and fim
		group by bucket
		order by bucket asc;
end;
$$ language plpgsql volatile;