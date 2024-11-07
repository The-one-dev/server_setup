import sequelize from "../configs/connections/sequelize-connection";
import User from "./schemas/users-schema";
import Post from "./schemas/posts-schema";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

export { sequelize, User, Post };
