create table "public"."medidor_grandeza" (
    "medidor_id" bigint not null,
    "grandeza_id" bigint not null,

    FOREIGN KEY (medidor_id) REFERENCES public.medidores(id) ON DELETE CASCADE,
    FOREIGN KEY (grandeza_id) REFERENCES public.grandezas(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX medidor_grandeza_pkey ON public.medidor_grandeza USING btree (medidor_id, grandeza_id);
alter table "public"."medidor_grandeza" add constraint "medidor_grandeza_pkey" PRIMARY KEY using index "medidor_grandeza_pkey";

alter table "public"."medidor_grandeza" enable row level security;
CREATE POLICY "Todos podem atualizar medidor_grandeza" ON public.medidor_grandeza FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Todos podem visualizar medidor_grandeza" ON public.medidor_grandeza FOR SELECT TO authenticated USING (true);
CREATE POLICY "Todos podem inserir medidor_grandeza" ON public.medidor_grandeza FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Todos podem apagar medidor_grandeza" ON public.medidor_grandeza FOR DELETE TO authenticated USING (true);