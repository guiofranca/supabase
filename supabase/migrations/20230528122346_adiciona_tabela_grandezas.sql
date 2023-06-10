create table "public"."grandezas" (
    "id" bigint generated by default as identity not null,
    "nome" varchar(255) not null,
    "unidade" varchar(10) not null,

    CHECK (char_length(nome) >= 3 AND char_length(nome) <= 255),
    CHECK (char_length(unidade) >= 1 AND char_length(unidade) <= 10)
);
CREATE UNIQUE INDEX grandezas_pkey ON public.grandezas USING btree (id);
alter table "public"."grandezas" add constraint "grandezas_pkey" PRIMARY KEY using index "grandezas_pkey";

alter table "public"."grandezas" enable row level security;
CREATE POLICY "Todos podem atualizar grandezas" ON public.grandezas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Todos podem visualizar grandezas" ON public.grandezas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Todos podem inserir grandezas" ON public.grandezas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Ninguém pode apagar grandezas" ON public.grandezas FOR DELETE TO authenticated USING (true);
