import * as express from "express";
import * as path from "path";

const userRoutes = require("./routes/user.routes");

interface Route {
    path: string;
    router: express.Router;
}

const routes: Route[] = [
    {path: "/api/user", router: userRoutes},
    {path: "/uploads", router: express.static(path.join(__dirname, 'uploads'))},
];

module.exports = { routes };
