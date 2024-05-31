import { UserService } from "../user/user.service";
import { LoginDto } from "../login/login.dto";
import { TokenDto } from "../token/token.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthenticationService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    authenticate(loginDto: LoginDto): Promise<TokenDto>;
}
