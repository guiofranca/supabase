insert into medidores (nome, descricao) values ('Medidor 1', 'O medidor numero um'),('Medidor 2', 'O medidor numero dois'),('Medidor 3', 'O medidor numero três'),('Medidor 4', 'O medidor numero quatro'),('Medidor 5', 'O medidor numero cinco');
insert into grandezas (nome, unidade) values ('Potência', 'W'), ('Temperatura', '°C');
insert into medidor_grandeza (medidor_id, grandeza_id) values (1,1),(1,2),(2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2);

DO $$
DECLARE
    dataInicial Date = '2022-01-01';
    dataFinal Date = '2023-07-01';
    intervalo interval = '1 day';
    n_medidores numeric = 5;
    n_grandezas numeric = 2;
    instante timestamp;
    i numeric;
    medidor_id numeric;
    grandeza_id numeric;
    valor numeric[];
BEGIN
    for INIT IN 1..(n_medidores*n_grandezas) LOOP
        valor[init] := 0;
    END LOOP;
    FOR instante IN SELECT * FROM generate_series(dataInicial, DataFinal, intervalo) LOOP
        FOR i, medidor_id, grandeza_id IN SELECT row_number() OVER () i, * FROM (SELECT *  FROM generate_series(1,n_medidores) medidor_id, generate_series(1,n_grandezas) grandeza_id) AS t LOOP
            INSERT INTO medidas VALUES (instante, medidor_id, grandeza_id, valor[i]);
            valor[i] := valor[i] + 10*(random()-0.5);
        END LOOP;
    END LOOP;
END; $$
