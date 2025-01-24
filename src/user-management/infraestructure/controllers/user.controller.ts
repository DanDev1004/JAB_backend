import { Request, Response } from "express";
import { UserService } from "../../application/user.service";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
    }

    public async addUser(req: Request, res: Response): Promise<void>{
        const { DNI, nombres, email, telefono, password, rol } = req.body;

        try {

            const user = await this.userService.addUser(
                DNI, nombres, email, telefono, password, rol
            );
            res.status(201).json(user);

        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }
}