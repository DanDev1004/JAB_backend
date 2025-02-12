import { Request, Response } from "express";
import { TokenGeneratorService } from "../../application/services/token-generator.service";

export class TokenGeneratorController {
    private _tokenService: TokenGeneratorService;

    constructor(tokenService: TokenGeneratorService) {
        this._tokenService = tokenService;
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
    
        try {
            const token = await this._tokenService.login(email, password);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({
                error: error.name,
                message: error.message
            });
        }
    }
}
