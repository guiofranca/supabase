<script setup lang="ts">
import { useNotification } from "~/stores/NotificationStore";

const notificationStore = useNotification();
</script>
<template>
    <div class="p-4 prose min-w-full min-h-full">
        <div class="card bg-base-100 min-h-full">
            <div class="card-body">
                <h1>Sobre esse projeto</h1>
                <div class="text-justify">
                    <p>
                        Olá! Esse projeto serve pra exercitar algumas coisas:
                        principalmente Front-end com
                        <span class="font-bold">Nuxt</span>,
                        <span class="font-bold">Tailwind</span> e
                        <span class="font-bold">DaisyUI</span>, Back-End as a
                        service (Baas) com
                        <span class="font-bold">Supabase</span>, séries
                        temporais com a extensão de PostgreSQL
                        <span class="font-bold">Timescale</span> e CI/CD com
                        <span class="font-bold">Github Actions</span>!
                    </p>
                    <p>
                        Nas seções abaixo, explico um pouco mais sobre as
                        tecnologias usadas no projeto.
                    </p>
                </div>

                <div class="collapse collapse-arrow" tabindex="0">
                    <div
                        class="flex justify-between collapse-title bg-base-300"
                    >
                        <span class="font-bold text-2xl">Front-End</span>
                    </div>
                    <div class="collapse-content bg-base-300 text-justify">
                        <p>
                            Meu front-end realmente é de sobrinho, por enquanto
                            é um código muito procedural, macarrônico, seboso,
                            etc., como dizem por aí. Escolhi
                            <span class="font-semibold">Nuxt3</span> pelas
                            vantagens do Vue3 e da estrutura opinada do próprio
                            Nuxt. Tenho um outro projeto em Nuxt (v2) e consigo
                            desenrolar melhor nesse framework do que nos
                            concorrentes. Outra coisa que gosto muito é poder
                            gerar SPAs estáticos com apenas "ssr: false" na
                            configuração, permitindo fácil integração com
                            qualquer hospedagem estática, como Github-Pages e
                            AWS-Amplify, pra citar alguns.
                        </p>
                        <p>
                            Assim como muitos devs, vim do front-end com jQuery
                            e Bootstrap (na época o 3). Aqui optei por usar o
                            <span class="font-semibold">Tailwind</span>, mas não
                            ele sozinho. Pra desenrolar mais fácil, uso em
                            conjunto o
                            <span class="font-semibold">DaisyUI</span> que usa o
                            próprio Tailwind pra gerar alguns componentes comuns
                            e temas, trazendo uma cadeia de classes parecida com
                            o bootstrap que estou acostumado.
                        </p>
                        <p>
                            Pra integrar com o
                            <span class="font-semibold">Supabase</span>, a
                            biblioteca do próprio Supabase é usada, o
                            <span class="font-semibold">supabase-js</span>.
                            Existe um módulo para Nuxt, mas por enquanto não é
                            possível usá-lo com hospedagem estática. A
                            comunidade até está tentando fazer isso acontecer,
                            mas até que aconteça optei por não usar o módulo e
                            integrar o supabase-js com o projeto manualmente,
                            com Global Middleware e Composables.
                        </p>
                        <p>
                            Pra gerenciamento de estado, é usado o
                            <span class="font-semibold">Pinia</span> via módulo
                            do Nuxt.
                        </p>
                        <p>
                            Até agora está sendo uma experiência pouco
                            produtiva. As ferramentas que eu tinha domínio
                            quando desenvolvia com Laravel ao longo de 4 anos
                            nem se comparam com as usadas nesse projeto. Mas a
                            ideia é ganhar desenvoltura pra desenvolver novos
                            projetos com maior facilidade!
                        </p>
                    </div>
                </div>

                <div class="collapse collapse-arrow" tabindex="0">
                    <div
                        class="flex justify-between collapse-title bg-base-300"
                    >
                        <span class="font-bold text-2xl">Supabase</span>
                    </div>
                    <div class="collapse-content bg-base-300 text-justify">
                        <p>
                            Que projeto legal esse
                            <span class="font-semibold">Supabase</span>! Pode
                            soar como sabotagem um desenvolvedor Back-end dizer
                            que um BaaS é legal, mas a produtividade aqui é
                            muito boa! Começei um projeto boilerplate de backend
                            com ASP.NET core mas as coisas acontecem muito
                            devagar. Quando eu faço Backend com Laravel, é muito
                            rápido implementar autenticação, validações, etc.,
                            mas onde hospedar? Eu precisaria pagar, e não quero
                            ter que fazer isso com projetos de Hobby, muito
                            menos tê-los hospedados somente em localhost.
                        </p>
                        <p>
                            O Supabase possui um free tier generoso pra poder
                            aprender suas funcionalidades. Fora isso ele ainda é
                            um PostgreSQL puro, banco de dados com o qual venho
                            me aproximando, o que torna o desenvolvimento mais
                            produtivo apesar da contradição de fazer backend no
                            banco de dados, mas pelo menos é de graça. Algumas
                            coisas que aprendi agora e achei muito interessante
                            é o Row Level Security do PostgreSQL, que torna
                            possível escrever políticas de acesso a nível de
                            banco de dados, qual outro lugar melhor pra isso?
                            Multi Tenants de verdade! O PostgreSQL ainda conta
                            com muitas extensões interessantes, uma das quais
                            falarei a seguir.
                        </p>
                        <p>
                            O Supabase possui diversos recursos, como login sem
                            senha, login social com configuração mínima, dados
                            em tempo real, tarefas agendadas, funções serverless
                            e armazenamento de arquivos, pra citar alguns. Sem
                            contar que sua licença é Apache-2.0 e de código
                            aberto. Se não quiser pagar, pode hospedar você
                            mesmo.
                        </p>
                        <p>
                            O Supabase ainda conta com um CLI poderoso que
                            auxilia no desenvolvimento local e atualização do
                            ambiente de produção. Através desse CLI consigo
                            atualizar a produção via Deploy contínuo!
                        </p>
                    </div>
                </div>

                <div class="collapse collapse-arrow" tabindex="0">
                    <div
                        class="flex justify-between collapse-title bg-base-300"
                    >
                        <span class="font-bold text-2xl">Timescale</span>
                    </div>
                    <div class="collapse-content bg-base-300 text-justify">
                        <p>
                            Venho tentando me aproximar dessa extensão de
                            PostgreSQL há algum tempo. Foi muito conveniente o
                            Supabase ser executado em cima de um banco de dados
                            desses, permitindo habilitar o
                            <span class="font-semibold">Timescale</span>
                            via painel.
                        </p>
                        <p>
                            O Timescale possui dois modelos de licença, uma
                            completa chamada
                            <span class="font-semibold">Timescale License</span>
                            que permite-nos usar livremente o Timescale desde
                            que seja valor agregado ao nosso serviço, não
                            podemos expor nenhuma funcionalidade nativa regida
                            por essa licença ao usuário final, tal como criação
                            de agregadores de dados, compactadores e etc. Como o
                            Timescale é oferecido através do Supabase, o
                            Supabase não pode usar a licença completa pelos
                            motivos citados, então nesse projeto fico restrito
                            as funcionalidades regidas pela licença
                            <span class="font-semibold">Apache-2.0</span>
                            do Timescale. Infelizmente, muita coisa extremamente
                            útil fica de fora por conta da licença. Pra resolver
                            isso, basta hospedar eu mesmo um PostgreSQL que
                            posso instalar a versão completa.
                        </p>
                        <p>
                            Existem alguns bancos de dados especializados em
                            séries temporais. Já tive um breve contato com o
                            InfluxDB, mas sua sintaxe de queries exige um pouco
                            mais de capacitação. O Timescale, por outro lado, é
                            SQL, tornando esse obstáculo menor para se começar a
                            usar.
                        </p>
                        <p>
                            Ao criar uma tabela, podemos marcá-la como uma
                            <span class="font">Hyper Table</span>. Quando o
                            fazemos, essa tabela herda todas as funcionalidades
                            do Timescale. Logo ao convertê-la, essa tabela é
                            automaticamente particionada (por padrão em blocos
                            de 7 dias), formando blocos (chunks) de dados que
                            tornam as operações mais eficientes. O Timescale
                            também permite a criação de agregadores contínuos de
                            dados através de Materialized Views. Então se temos
                            dados a cada minuto, posso criar um Continuous
                            Aggregate de 1 hora, 1 dia, 1 mês, 1 ano, etc., pra
                            facilitar a consulta aos dados em integralicações
                            mais comuns. Também é possível criar tarefas em
                            plano de fundo que fazem a manutenção dos Chunks,
                            como compactação e exclusão. Usando o serviço
                            geranciado do Timescale, é posível enviar esses
                            Chunks mais antigos para armazenamento frio, como um
                            S3 da Amazon.
                        </p>
                        <p>
                            Existe um
                            <span class="font-semibold">Toolkit</span> do
                            próprio Timescale (somente sob licença Timescale
                            License) que adiciona funcionalidades muito úteis na
                            consulta dos dados. Algumas funções interessantes do
                            Toolkit são: preenchimento de lacunas (os dados
                            podem ser nulos ou interpolados), downsampling,
                            cálculos temporais (como integrais) e outras
                            diversas funções estatísticas.
                        </p>
                        <p>
                            Pra testar um pouco a capacidade de consulta de
                            dados, criei nesse projeto uma estrutura mínima para
                            visualização de dados e geração de gráficos usando o
                            <span class="font-semibold">ApexCharts</span>.
                        </p>
                    </div>
                </div>

                <div class="collapse collapse-arrow" tabindex="0">
                    <div
                        class="flex justify-between collapse-title bg-base-300"
                    >
                        <span class="font-bold text-2xl">Github Actions</span>
                    </div>
                    <div class="collapse-content bg-base-300 text-justify">
                        <p>
                            Costumo usar muito as
                            <span class="font-semibold">Github Actions</span>
                            para gerar uma
                            <span class="font-semibold">Github Page</span>. Para
                            esse projeto, também uso as Actions em conjunto com
                            o CLI do Supabase para executar as migrações de
                            banco de dados do sistema em produção.
                        </p>
                        <p>
                            Sempre que um novo código é enviado para a branch
                            <span class="font-semibold">main</span>, é executada
                            a pipeline de deploy da página e atualização do
                            Supabase. Muito legal!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
