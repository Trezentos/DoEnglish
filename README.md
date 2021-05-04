## DoEnglish 

Aplicativo em que o dono deste pode administrar uma rede de professores e usuários que buscam agendar horarios com algum professor de inglês.

Neste projeto há padrões como ORM, Repositories, SOLID para a manutenabilidade e sustentabilidade do aplicativo


## Funcionalidades
- Recuperação de senha
  - **Requisitos Funcionais**
    - O usuário deve receber um e-mail com instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha
    - O usuário deve poder recuperar sua senha informando o seu e-mail;

  - **Requisitos Não-Funcionais**
    - Utlizar ethereal para testar envios em ambiente de desenvolvimento;
    - O envio de e-mails deve acontecer em segundo plano;

  - **Regras de Negócios**
    - O link enviado por e-mail para resetar a senha deve expirar em 2h;
    - O usuário precisa confirmar a nova senha ao resetar;

- Atualização do perfil
  - **Requisitos Funcionais**
    - O usuário deve poder atualizar seu nome, e-mail e senha

  - **Regras de Negócios**
    - O usuário não pode alterar seu e-mail para um já utilizado por outro usuário;
    - Para atualizar sua senha, o usuário deve informar a senha antiga;

- Painel do professor
  - **Requisitos Funcionais**
    - O usuário deve poder listar seus agendamentos de um dia específico;

  - **Requisitos Não-Funcionais**
    - Os agendamentos do professor no dia devem ser armazenados em cache;


- Agendamento das aulas
  - **Requisitos Funcionais**
    - O usuário deve poder listar todos os professores cadastrados;
    - O usuário deve poder listar os dias, com pelo menos um horário disponível, de um professor em um mês específico;
    - O usuário deve poder listar os horários disponíveis em um dia específico de um professor;
    - O usuário deve poder realizar um novo agendamento com um professor;


  - **Regras de Negócios**
    - Cada agendamento deve duar 1h exatamente;
    - Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h e último às 17h);
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário não pode agendar em um horário que já passou;
    - O usuário não pode agendar serviços consigo mesmo;
---

## Tecnologias
  - **Back end**
    - nodeJS
    - express
    - typescript
    - typeorm
    - postgres
    - redis
    - uuidv4
    - date-fns
    - multer
    - celebrate/joi
    - dotenv
    - class-transformer
    - jest/ts-jest

  - **Front end**
    - react
    - typescript
    - axios
    - react-router-dom
    - styled-components
    - polished
    - react-spring
    - yup
    - date-fns
    - react-day-picker

  - **Outros**
    - Docker
    
---

> Para iniciar, clone o repositorio para ter acesso a essas pastas
```bash
  # Para clonar o repositório
  git clone https://github.com/Trezentos/DoEnglish

```

## 💻 Instruções para o back end

  Começaremos criando as instâncias dos nossos bancos de dados. Para esse projeto, o **docker** foi utilizado. Abaixo, seguem os comandos para criar os containers e inicializar as instâncias:

  ```bash
    # Criando container com instância do postgres
    docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

    # Criando container com instância do redis
    docker run --name redis -p 6379:6379 -d -t redis:alpine

    # Inicializando as instâncias
    docker start postgres redis
  ```
  Assim você vai ter que criar um arquivo contendo as informações de acesso ao seu banco de dados. Essa aplicação foi feita utilizando o **Postgres**. Crie um arquivo com o nome *ormconfig.json* na pasta `backend` e preencha conforme o arquivo modelo *ormconfig.example.json*. antes de rodar as migration com o typeorm, crie o banco de dados e informar o nome da sua base do arquivo *ormconfig.json*

  
  ```bash
    # Acessar a pasta do back end
    cd backend

    # Baixar as dependências
    yarn

    # Executar as migrations
    yarn typeorm migration:run

    # Inicializar o servidor de desenvolvimento
    yarn dev:server
  ```

  Crie um arquivo chamado *.env*, que conterá as variáveis de ambiente. Use *.env.example* como modelo.

---

##  Instruções para o front end
 
  Após executar o passo anterior e garantir que o back end está rodando, você poderá inicializar o front end:

  ```bash
    # Acessar a pasta do front end
    cd frontend

    # Baixar as dependências
    yarn

    # Inicializar a aplicação
    yarn start
  ```

##  Executando testes

  ```bash
    # Acessar a pasta do back end
    cd backend

    # Executando testes
    yarn test
  ```
