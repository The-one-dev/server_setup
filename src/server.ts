import app from "./app";

const port = process.env.PORT || 9999;

const server = app.listen(port, () => {
  console.log("Time sheet server listening on port: ", port);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, ":", err.message);
  console.log("UNHANDLED REJECTION 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err: Error) => {
  console.log(err.name, ":", err.message);
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
