create table
  public.medidores_grandezas (
    medidor_id bigint not null,
    grandeza_id bigint not null,
    constraint medidores_grandezas_pkey primary key (medidor_id, grandeza_id),
    constraint medidores_grandezas_grandeza_id_fkey foreign key (grandeza_id) references grandezas (id) on delete cascade,
    constraint medidores_grandezas_medidor_id_fkey foreign key (medidor_id) references medidores (id) on delete cascade
  ) tablespace pg_default;