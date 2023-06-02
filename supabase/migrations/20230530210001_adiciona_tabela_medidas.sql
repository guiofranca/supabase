create table "public"."medidas" (
    "instante" timestamp not null default now(),
    "medidor_id" bigint not null,
    "grandeza_id" bigint not null,
    "valor" decimal(10,10) not null,

    FOREIGN KEY (grandeza_id) REFERENCES public.grandezas(id) ON DELETE CASCADE,
    FOREIGN KEY (medidor_id) REFERENCES public.medidores(id) ON DELETE CASCADE
);

SELECT create_hypertable('medidas', 'instante');
SELECT add_dimension('medidas', 'medidor_id', 1);
SELECT add_dimension('medidas', 'grandeza_id', 1);

CREATE UNIQUE INDEX medidas_pkey ON public.medidas (instante, medidor_id, grandeza_id);

alter table "public"."medidas" enable row level security;
CREATE POLICY "Todos podem atualizar medidas" ON public.medidas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Todos podem visualizar medidas" ON public.medidas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Todos podem inserir medidas" ON public.medidas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Todos podem apagar medidas" ON public.medidas FOR DELETE TO authenticated USING (true);