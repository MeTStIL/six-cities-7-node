interface IGetMongoUriProps {
  username: string;
  password: string;
  host: string;
  port: string;
  dbName: string;
}

export const getMongoUri = ({ username, password, host, port, dbName }: IGetMongoUriProps): string =>
  `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
