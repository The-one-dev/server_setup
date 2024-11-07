import { Optional } from "sequelize";

export interface UserAttributes {
  id?: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "uuid"> {}

export interface PostAttributes {
  id?: number;
  uuid?: string;
  userId: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostCreationAttributes
  extends Optional<UserAttributes, "uuid"> {}
