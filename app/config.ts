import { knexSnakeCaseMappers } from 'objection';
import { Model } from 'objection';

export const config = {
  database: {
    client: process.env.DB_CLIENT,
    connection: {
      filename: process.env.DB_FILENAME,
      database: process.env.DB_NAME,
      charset: 'utf8',
      timezone: process.env.DB_TIMEZONE || '+00:00',
    },
    debug: false,
    // change snake case db names and fields to camel case in the code
    ...knexSnakeCaseMappers(),
  },
  mailer: {
    host: process.env.MAILER_HOST || '',
    port: parseInt(process.env.MAILER_PORT || '', 10),
    tls: {
      rejectUnauthorized: true,
    }
  },
  mailFrom: process.env.MAILER_FROM
}

export class KnexConfig {
  public build() {
    // db setup
    const knex = require('knex')(config.database);
    Model.knex(knex);
    return config;
  }
}
