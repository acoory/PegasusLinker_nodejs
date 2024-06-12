import { Request, Response } from "express";

export default class AdminController {
    static async index(req: Request, res: Response) {
     try {
       res.status(200).send("Hello World");
     } catch (error) {
            res.status(500).send(error);
        }
    }
}