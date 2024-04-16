# Daily Diet Control REST API

API feita em Node.js com Fastify, feita apenas para praticar.

# Regras da aplicação

- [ ] Deve ser possível criar um usuário
- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou



# Rotas
- POST /sign-up > Cadastra o usuário, e registra o cookie de sessão
- POST /sign-in > Identifica um usuário já cadastrado, e registra o cookie de sessão
- POST /meals > Cria uma refeição
- PUT /meals/:id > Edita uma refeição
- DELETE /meals/:id > Apaga uma refeição
- GET /meals > Lista as refeições do usuário
- GET /meals/:id > Recupera os dados de um única refeição
- GET /profile > Recupera os dados do usuário
- GET /profile/stats > Recupera as estatísticas do usuário


# Entidades

Usuário
```json
  User {
    id: string
    name: string
    email: string
    password: string
    created_at: Datetime
  }
```

Refeição
```json
  Meal {
    id: string
    user_id: string
    title: string
    description: string
    on_diet: boolean
    created_at: Datetime
  }
```


