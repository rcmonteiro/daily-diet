import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('name')
    table.string('email')
    table.string('password')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.string('title')
    table.text('description')
    table.boolean('on_diet')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('meals')
}
