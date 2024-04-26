import * as express from "express";
import AdminController from "../controllers/adminController";

class adminRoutes {
    public router: express.Router;
    public path: string;

    constructor() {
        this.router = express.Router();
        this.path = "/admin";
        this.init();
    }

    private init(): void {
        this.router.get('/', AdminController.index);
    }
}

const adminRoutesInstance = new adminRoutes();

export default adminRoutesInstance;

