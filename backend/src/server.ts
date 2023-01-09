import { createServer, Server } from "http";
import { config as loadEnvConfig } from "dotenv";
import { connect, close } from "./utils/database";
import { app } from "./app";

// Load environment variables from .env file
loadEnvConfig();

// Create HTTP server
const server: Server = createServer(app);

// Get port from environment and store in Express.
const port: string | number = process.env.PORT || "4000";
app.set("port", port);

// Connect to the database and then start the HTTP server
connect()
  .then(() => {
    console.log("Connected to the database");

    // Start the HTTP server
    server.listen(port, () => {
      console.log(`API running on localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
    close();
  });

// Close the database connection on exit
process.on("SIGINT", () => {
  close()
    .then(() => {
      console.log("Database connection closed");
      process.exit();
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
});
