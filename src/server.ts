import dotenv from "dotenv";
dotenv.config();

import sequelize from "./configs/connections/sequelize-connection";
import app from "./app";
import { Server } from "http";

const port = process.env.PORT || 9999;

let server: Server | undefined;

process.on("uncaughtException", async (err: Error) => {
  console.error("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.error(err.name, ":", err.message, "\n", err.stack);

  if (sequelize) await sequelize.close();

  server?.close(() => process.exit(1));
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("All models successfully synchronized.");

    server = app.listen(port, () => {
      console.log("Blog server listening on port: ", port);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message, "\n", error.stack);
    process.exit(1);
  }
};

process.on("unhandledRejection", async (err: Error) => {
  console.error("UNHANDLED REJECTION 💥 Shutting down...");
  console.error(err.name, ":", err.message, "\n", err.stack);

  if (sequelize) await sequelize.close();

  server?.close(() => process.exit(1));
});

startServer();
