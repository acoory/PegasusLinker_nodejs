import * as express from "express";
import * as path from "path";
import adminRoutes from "../app/admin/routes";

interface Route {
  path: string;
  router: express.Router;
}

const routes: Route[] = [
  { path: "/uploads", router: express.static(path.join(__dirname, "uploads")) },
  { path: adminRoutes.path, router: adminRoutes.router },
];

module.exports = { routes };
