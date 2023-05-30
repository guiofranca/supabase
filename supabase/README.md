# Supabase
Supabase é um Backend as a Service [open source](https://github.com/supabase/supabase), baseado principalmente em Postgres SQL. A empresa possui um excelente serviço de hospedagem de toda a Stack, em [supabase.com](https://supabase.com/) temos mais informações.


Possui um [plano gratuito de até 500Mb de armazenamento](https://supabase.com/pricing#compare-plans) e algumas outras limitações, mas ótimo pra tirar alguma ideia do papel e hospedar uma aplicação completa gratuitamente, seja um app de celular em Flutter ou um SPA hospedado estaticamente.

# Projeto
Essa pasta possui partes específicas do projeto vinculado ao Supabase, como as [Edge Functions](https://supabase.com/docs/guides/functions), [Migrações de banco de dados](https://supabase.com/docs/reference/cli/supabase-db) e ferramental para [desenvolvimento local](https://supabase.com/docs/guides/getting-started/local-development). O Docker deve estar instalado para funcionamento do desenvolvimento local.

# Ambiente Local
Iniciar o ambiente
```
npx supabase start
```
Parar o ambiente
```
npx supabase stop
```

Para envio de e-mails existe o [Inbucket](http://localhost:54324/monitor), que é executado juntamente com a inicialização do ambiente.


# Edge Functions
Edge Functions é a funcionalidade serverless do Supabase. Para processamentos em plano de fundo, tarefas agendadas, etc.

Para capturar as requisições das Edge Functions localmente é necessário executar o seguinte comando:
```
npx supabase functions serve
```
As funções ficam disponíveis pela url `http://localhost:54321/functions/v1/<nome-da-funcao>`. É o mesmo host da API do projeto, portanto integra-se totalmente como se fosse em produção.

Adicionar uma nova função pode ser feita pela estrutura de pastas diretamente ou pelo comando:
```
npx supabase functions new nome-da-funcao
``` 
Antes de fazer o deploy das Edge Functions, é preciso estar logado no projeto, com:
```
npx supabase login
```

Para fazer o deploy de uma Edge Function, usamos o comando:
```
npx supabase functions deploy hello-world
```
Com isso a função fica disponível em produção. Idealmente o deploy deve fazer parte do processo de CI/CD.

# Banco de dados
Uma das partes mais interessantes do Supabase é que é um Postgres SQL. Podemos conectar no projeto com o DBeaver ou qualquer outro gerenciador de banco de dados, trazendo o conforto de acesso aos dados que todo desenvolvedor Back-End gosta.

## Migrações
As migrações aqui são em SQL puro e só pra frente. Portanto temos que testar bem localmente para garantir o funcionamento em produção. Normalmente essa prática é rara para produção, mas caso precise reverter uma alteração é necessário que seja feita uma nova migração com as informações.

Um aspecto interessante é que podemos atualizar o banco de dados pelo [Supabase Studio](http://localhost:54323/project/default/editor) e detectar as aterações diferenciais diretamente para um arquivo de migração, usando o comando:
```
npx supabase db diff >> supabase/migrations/20230527180000_novas_mudancas.sql
```

Para adicionar novas migrações do zero, podemos simplesmente criar o arquivo na pasta `supabase/migrations` ou pelo comando:
```
npx supabase migration new nova_migracao
```
Onde será criado um arquivo corretamente formatado: `20230527205822_nova_migracao.sql`.

Para aplicar as migrações localmente usamos o comando:
```
npx supabase migration up
```
Também podemos usar o comando de reset, que usará o arquivo `supabase/seed.sql` para popular a aplicação de desenvolvimento local.
```
npx supabase migration reset
```
Para aplicar em produção, o comando abaixo executará as migrações pedentes. Lembrando que migrações no Supabase não dão ré!
```
npx supabase db push
```

# Geração de tipos
Para gerar os tipos do Typescript ligados a modelagem do Banco de Dados usamos o comando:
```
npx supabase gen types typescript --local --schema public > types/supabase.ts
```