import Knex from 'knex';

// tabela para definir os horarios que cada professor da a aula
export async function up(knex: Knex){
    // criando tabelas users
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        
        // dia da semana, hora inicial, hora final de atendimento
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

    } )
}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}