<<<<<<< HEAD
import { DataSource } from 'typeorm';
import { env } from './env';
import City from './entity/City';
import Category from './entity/Category';
import Poi from './entity/Poi';
import User from './entity/User';

export default new DataSource({
  type: 'postgres',
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: true,
  entities: [City, Category, Poi, User],
=======
import { DataSource } from "typeorm";
import { loadEnv } from "./env";
import { City } from "./entity/City";

loadEnv();

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [City],
>>>>>>> origin
  logging: ["error"],
});