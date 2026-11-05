import convict from 'convict';
import validator from 'convict-format-with-validator';
import { DB_NAME } from '../../constants';

convict.addFormats(validator);

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
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
    doc: `IP address of the ${DB_NAME} server`,
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: `Username to connect to the ${DB_NAME}`,
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: `Password to connect to the ${DB_NAME}`,
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: `Port to connect to the ${DB_NAME}`,
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: `${DB_NAME} name`,
    format: String,
    env: 'DB_NAME',
    default: 'buy-and-sell',
  },
});
