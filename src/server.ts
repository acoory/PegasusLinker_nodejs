import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

const { routes } = require("./router");
import Database from "../config/database";

class MyExpressApp {
  private app: express.Application;
  private Database: Database;

  constructor() {
    this.app = express();
    this.setup();
    this.Database = new Database();
  }

  private setup(): void {
    const env: dotenv.DotenvParseOutput = dotenv.config().parsed;
    const port = env.SERVER_PORT || 3000;

    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", `${env.CLIENT_URL}`);
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      );
      res.setHeader("Cross-Origin-Resource-Policy", "same-site");
      next();
    });

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());

    for (const route of routes) {
      this.app.use(route.path, route.router);
    }

    this.app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }
}

// Créer une instance de la classe
const myExpressApp = new MyExpressApp();
