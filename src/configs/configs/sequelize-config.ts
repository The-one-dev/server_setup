import { CONSTANTS } from "../../utilities/constants/values.constant";
import { DataBaseOptions } from "./config-interfaces";

let databaseUrl: string;

const environment = CONSTANTS.environment;

const pgConfigs = {
  development: {
    name: process.env.DEV_DATABASE_NAME,
    user: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT,
  },
  production: {
    name: process.env.PROD_DATABASE_NAME,
    user: process.env.PROD_DATABASE_USER,
    password: process.env.PROD_DATABASE_PASSWORD,
    host: process.env.PROD_DATABASE_HOST,
    port: process.env.PROD_DATABASE_PORT,
  },
  test: {
    name: process.env.LOCAL_DATABASE_NAME,
    user: process.env.LOCAL_DATABASE_USER,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    host: process.env.LOCAL_DATABASE_HOST,
    port: process.env.LOCAL_DATABASE_PORT,
  },
};

const pg: DataBaseOptions = pgConfigs[environment];

(() => {
  if (!pg) {
    throw new Error(
      `Missing database configurations for the ${environment} environment`
    );
  }
  if (!pg.name || !pg.user || !pg.password || !pg.host || !pg.port) {
    throw new Error(
      `Missing required database credentials for '${environment}' environment`
    );
  }
  if (environment === "test") {
    databaseUrl = `postgresql://${pg.user}:${pg.password}@${pg.host}:${pg.port}/${pg.name}`;
  } else {
    databaseUrl = `postgresql://${pg.user}:${pg.password}@${pg.host}:${pg.port}/${pg.name}?sslmode=no-verify`;
  }
  console.log("Successfully loaded database configurations");
  console.log("Environment:", environment);
  console.log("Database:", pg.name);
  console.log("User:", pg.user);
  console.log("Password:", pg.password);
  console.log("Host:", pg.host);
  console.log("Port:", pg.port);
  console.log("Database URL:", databaseUrl);
  console.log("----------------------------------------");
  console.log("");
})();

export const configs = {
  postgres: databaseUrl,
};
