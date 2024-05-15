import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "src/login/login.dto";
import { TokenDto } from "src/token/token.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
    private secret: string = process.env.SECRET;

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async authenticate(loginDto: LoginDto) {
        try {
            var user = await this.userService.findUserByUsername(loginDto.username);

            if (!user) throw new Error("Could not authenticate");

            var passwordIsEqual = await bcrypt.compare(loginDto.password, user.password);

            if (!passwordIsEqual) throw new Error("Could not authenticate");

            var token = this.jwtService.sign({ username: user.username });

            var tokenDto = new TokenDto(token);

            return tokenDto;   
        } catch (error) {
            throw new Error(error.message);
        }
    }
}