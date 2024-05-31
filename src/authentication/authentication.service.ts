import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "../login/login.dto";
import { TokenDto } from "../token/token.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
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