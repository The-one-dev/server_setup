import { CONSTANTS } from "../../utilities/constants/values.constant";
import { configs } from "../configs/sequelize-config";
import { Sequelize } from "sequelize";

const environment = CONSTANTS.environment;

const sequelize = new Sequelize(configs.postgres, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: environment !== "test",
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
