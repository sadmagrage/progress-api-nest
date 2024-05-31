import { Response } from "express";
import { LoginDto } from "../login/login.dto";
import { AuthenticationService } from "./authentication.service";
export declare class AuthenticationController {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    authentication(res: Response, loginDto: LoginDto): Promise<void>;
}
