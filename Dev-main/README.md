 Folhagem & Cia API

API REST desenvolvida em Node.js, TypeScript e Prisma ORM para gerir o inventário, vendas e valor de mercado de uma loja de plantas.

 Tecnologias Utilizadas

Node.js & Express (Framework backend)

TypeScript (Superset tipado para JavaScript)

Prisma ORM (Gestão e migrações da base de dados)

PostgreSQL (Base de dados relacional)

 Como Executar o Projeto

Clone o repositório ou abra o projeto no VS Code.

Instale as dependências:

yarn install


Configure as variáveis de ambiente:
Certifique-se de que o ficheiro .env está configurado com a URL correta da sua base de dados PostgreSQL (DATABASE_URL).

Execute as migrações do Prisma:

yarn prisma migrate dev


Inicie o servidor de desenvolvimento:

yarn dev


O servidor estará operacional em http://localhost:3003.

 Endpoints da API

Plantas

Cadastrar Planta

POST /plantas

Body JSON: nome, especie, preco (em centavos), estoque, luminosidade (SOMBRA, MEIA_SOMBRA, SOL_PLENO), petFriendly (booleano), regaACadaDias.