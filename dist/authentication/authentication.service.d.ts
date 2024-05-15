import { UserService } from "src/user/user.service";
import { LoginDto } from "src/login/login.dto";
import { TokenDto } from "src/token/token.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthenticationService {
    private userService;
    private jwtService;
    private secret;
    constructor(userService: UserService, jwtService: JwtService);
    authenticate(loginDto: LoginDto): Promise<TokenDto>;
}
