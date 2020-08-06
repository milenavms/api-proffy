import knex from  'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        // cria um arquivo nesse diretório atual com o nome database.sqlite
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default db;
