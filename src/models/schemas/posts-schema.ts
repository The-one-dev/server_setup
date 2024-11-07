import { DataTypes, Model } from "sequelize";
import sequelize from "../../configs/connections/sequelize-connection";
import {
  PostAttributes,
  PostCreationAttributes,
} from "../../models/model-interfaces";

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Post.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      field: "author_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "posts",
    indexes: [
      {
        unique: true,
        fields: ["uuid", "id"],
      },
    ],
  }
);

export default Post;
