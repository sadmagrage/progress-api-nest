import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
export declare class AuthorizationService {
    private userService;
    private jwtService;
    private secret;
    constructor(userService: UserService, jwtService: JwtService);
    authorize(token: string): Promise<{
        message: string;
        status: number;
    }>;
}
