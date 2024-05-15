import { Response } from "express";
import { LoginDto } from "src/login/login.dto";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "src/user/user.service";
import { UserDto } from "src/user/user.dto";
export declare class AuthenticationController {
    private authenticationService;
    private userService;
    constructor(authenticationService: AuthenticationService, userService: UserService);
    authentication(res: Response, loginDto: LoginDto): Promise<void>;
    createUser(res: Response, userDto: UserDto): Promise<void>;
}
