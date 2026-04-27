# CÓDIGO SIMULANDO A API DE UM RESTAURANTE
## Descrição
Esse é um código que criei para praticar a criação de APIs com nodejs. Nesse código, eu simulei uma API de um restaurante que se conecta a um banco de dados MySQL,
criando tabelas e inserindo dados.

## Objetivo do modelo
Construir uma API REST com Node.js + Express + MySQL, com CRUD de Cardápio e Pedidos, testada via Postman.

## Visão geral do projeto
Fluxo de inicialização:
1. `index.js` inicia a conexão com o MySQL.
2. `infraestrutura/tabelas.js` cria as tabelas.
3. `config/customExpress.js` monta o app e carrega as rotas.
4. O servidor sobe na porta 3000.

## Organização de pastas
- `config/`: configuração do Express (middlewares + carregamento automático de rotas).
- `controllers/`: definição das rotas HTTP e ligação com os modelos.
- `infraestrutura/`: conexão com MySQL e criação das tabelas.
- `models/`: regras de negócio, validações e acesso ao banco.

## Arquivos principais
- `index.js`: ponto de entrada; conecta no MySQL, inicializa tabelas e inicia o servidor.
- `config/customExpress.js`: instancia o Express, configura `body-parser` e injeta controllers via `consign`.
- `infraestrutura/conexao.js`: lê variáveis de ambiente e cria a conexão MySQL.
- `infraestrutura/tabelas.js`: cria as tabelas `Cardapio` e `Pedidos` se não existirem.
- `controllers/cardapio.js` e `controllers/pedido.js`: definem rotas GET/POST/PATCH/DELETE.
- `models/cardapio.js` e `models/pedido.js`: validações, regras (ex.: preço e entrega) e queries SQL.

## Bibliotecas usadas
- `express`: servidor e rotas.
- `body-parser`: leitura de JSON e formulário.
- `mysql`: conexão e queries no banco.
- `consign`: auto-carregamento de controllers.
- `nodemon` (dev): reinício automático no desenvolvimento.

## Rotas principais
- `GET /cardapio`, `GET /cardapio/:id`, `POST /cardapio`, `PATCH /cardapio/:id`, `DELETE /cardapio/:id`.
- `GET /pedidos`, `GET /pedidos/:id`, `POST /pedidos`, `PATCH /pedidos/:id`, `DELETE /pedidos/:id`.

## Validações essenciais
- Tamanho mínimo de texto para campos de nome/detalhes/pedido.
- Preço precisa ser numérico.
- Entrega é booleana (`true`/`false`).
- Endereço obrigatório quando entrega é `true`.

## Como usar o modelo
1. No diretório do código, digite `npm i` para instalar os pacotes utilizados.
2. Crie um arquivo `.env` baseado no `.env.example` e preencha as credenciais do MySQL.
3. Utilize o Postman para fazer GET, POST, DELETE e PATCH de acordo com as rotas dos `controllers`.
4. Dê um `npm start` no terminal para rodar o servidor.

## Ciclo de execução
`npm i` → configurar `.env` → `npm start` → testar no Postman.

## Observações práticas
- Use o `.env.example` como base para as variáveis de ambiente.
- Ajuste as credenciais do MySQL e a porta conforme o seu ambiente (porta padrão: 3000).
- Respostas padrão usam JSON com status `200` em sucesso e `400` em erros de validação ou banco.
