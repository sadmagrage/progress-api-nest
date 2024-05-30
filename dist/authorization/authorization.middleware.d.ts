import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthorizationService } from "./authorization.service";
export declare class AuthorizationMiddleware implements NestMiddleware {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
