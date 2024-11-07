import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../../configs/connections/sequelize-connection";
import {
  UserAttributes,
  UserCreationAttributes,
} from "../../models/model-interfaces";
import { CONSTANTS } from "../../utilities/constants/values.constant";
import { catchFunctionErrors } from "../../utilities/functions/global-utilities";

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public hashPassword = catchFunctionErrors(
    async (password: string): Promise<string> => {
      const saltRounds = CONSTANTS.saltRounds;
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    }
  );

  public validatePassword = catchFunctionErrors(
    async (password: string): Promise<boolean> => {
      return await bcrypt.compare(password, this.password);
    }
  );
}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: CONSTANTS.roles.user,
    },
  },
  {
    sequelize,
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["email", "uuid"],
      },
      {
        fields: ["role"],
      },
    ],
  }
);

export default User;
