import Knex from 'knex';

// tabela para anotar as conexao dos alunos com proffs
// salva: id do prof e hora que ocorreu a conexao
export async function up(knex: Knex){
   
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
    
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))  //hora atual
        .notNullable();

    } )
}

export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}