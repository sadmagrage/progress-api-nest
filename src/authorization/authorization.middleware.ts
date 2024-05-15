import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {

    constructor(private authozationService: AuthorizationService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const response = await this.authozationService.authorize(req.header("Authorization"));

        if (!response) next();
        else res.status(response.status).json({ message: response.message });
    }
}