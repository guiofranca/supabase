DO $$
DECLARE
    dataInicial timestamptz = '2023-06-10T00:00:00-0300';
    dataFinal timestamptz = '2023-06-11T00:00:00-0300';
    intervalo interval = '5 minute';
    n_medidores integer = 5;
    n_grandezas integer = 2;
    instante timestamptz;
    i numeric;
    medidor_id numeric;
    grandeza_id numeric;
	medidor_grandeza_id integer;
    valor numeric[];
BEGIN
    insert into medidores (id, nome, descricao) select id, 'Medidor ' || id as nome, 'descricao ' || id as descricao from generate_series(1,n_medidores) id;
    insert into grandezas (id, nome, unidade) select id, 'Grandeza ' || id as nome, 'UN ' || id as unidade from generate_series(1,n_grandezas) id;
    insert into medidor_grandeza (id, medidor_id, grandeza_id) SELECT row_number() OVER () i, * FROM (SELECT *  FROM generate_series(1,n_medidores) medidor_id, generate_series(1,n_grandezas) grandeza_id) as t;
    SELECT setval('medidor_grandeza_id_seq', n_medidores * n_grandezas) into medidor_grandeza_id;
    for INIT IN 1..(n_medidores*n_grandezas) LOOP
        valor[init] := 0;
    END LOOP;
    FOR instante IN SELECT * FROM generate_series(dataInicial, DataFinal, intervalo) LOOP
	    FOR i, medidor_grandeza_id IN SELECT row_number() OVER () i, * FROM (SELECT *  FROM generate_series(1,n_medidores*n_grandezas) medidor_grandeza_id) AS t LOOP
		    INSERT INTO medidas VALUES (instante, medidor_grandeza_id, valor[i]);
            valor[i] := valor[i] + 10*(random()-0.5);
        END LOOP;
    END LOOP;
END; $$
