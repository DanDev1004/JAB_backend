import { Request, Response } from "express";
import { UserService } from "../../application/services/user.service";

export class UserController {
    private _userService: UserService;

    constructor(userService: UserService){
        this._userService = userService;
    }

    public async addUser(req: Request, res: Response): Promise<void>{
        const { DNI, nombres, email, telefono, password, rol } = req.body;

        try {

            const user = await this._userService.addUser(
                DNI, nombres, email, telefono, password, rol
            );
            res.status(201).json(user);

        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        try {

            const user = await this._userService.getUserById(Number(id));
            res.status(200).json(user);

        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async editUser(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const updatedData = req.body;

        try {

            const user = await this._userService.editUser(Number(id), updatedData);
            res.status(200).json(user);

        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getAllUsers(_req: Request, res: Response): Promise<void> {
        try {
            const Users = await this._userService.getAllUsers();
            res.status(200).json(Users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllInActiveUsers(_req: Request, res: Response): Promise<void> {
        try {
            const InactiveUsers = await this._userService.getAllInActiveUsers();
            res.status(200).json(InactiveUsers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deactivateUser(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        try{
            const deactivatedUser = await this._userService.deactivateUser(Number(id));
            res.status(200).json(deactivatedUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async activateUser(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        try{
            const activateUser = await this._userService.activateUser(Number(id));
            res.status(200).json(activateUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async logicalUserDeletion(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        try{
            const deletedUser = await this._userService.logicalUserDeletion(Number(id));
            res.status(200).json(deletedUser);
        } catch (error: any) {
            res.status(500).json({ 
                error: error.name,
                message: error.message 
            });
        }
    }

}