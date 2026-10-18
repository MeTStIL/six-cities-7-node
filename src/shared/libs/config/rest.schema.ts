import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export const REST_SCHEMA_CONFIG = convict<TRestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4444,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: '',
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
});
