declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      email: number
      password: string
      created_at: string
    }
    meals: {
      id: string
      title: string
      description: number
      on_diet: boolean
      created_at: string
    }
  }
}
