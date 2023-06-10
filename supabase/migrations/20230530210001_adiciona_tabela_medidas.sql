create table "public"."medidas" (
    "instante" timestamptz not null default now(),
    "medidor_grandeza_id" bigint not null,
    "valor" double precision not null,

    FOREIGN KEY (medidor_grandeza_id) REFERENCES public.medidor_grandeza(id) ON DELETE CASCADE
);

SELECT create_hypertable('medidas', 'instante');
SELECT add_dimension('medidas', 'medidor_grandeza_id', 1);

CREATE UNIQUE INDEX medidas_unique_key ON public.medidas (instante, medidor_grandeza_id);

alter table "public"."medidas" enable row level security;
CREATE POLICY "Todos podem atualizar medidas" ON public.medidas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Todos podem visualizar medidas" ON public.medidas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Todos podem inserir medidas" ON public.medidas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Todos podem apagar medidas" ON public.medidas FOR DELETE TO authenticated USING (true);