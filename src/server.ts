import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
const { routes } = require("./router");

const app = express();

const env: dotenv.DotenvParseOutput = dotenv.config().parsed;

const port = env.SERVER_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${env.CLIENT_URL}`);

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // éviter les erreurs par rapport à helmet, quand les ressources ne sont pas de la même origine
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});


for (const route of routes) {
  app.use(route.path, route.router);
}
