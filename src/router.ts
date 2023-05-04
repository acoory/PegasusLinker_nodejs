import { Router } from "express";
const userRoutes = require("./routes/user.routes");

interface Route {
  path: string;
  router: Router;
}

const routes: Route[] = [{ path: "/api/user", router: userRoutes }];

module.exports = { routes };
