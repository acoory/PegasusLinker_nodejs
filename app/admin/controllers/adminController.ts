import { Request, Response } from "express";

export default class AdminController {
    static async index(req: Request, res: Response) {
        res.send({success: true, message: "Admin route"});
    }
}