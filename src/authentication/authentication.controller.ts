import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LoginDto } from "../login/login.dto";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "../user/user.service";
import { UserDto } from "../user/user.dto";

@Controller("auth")
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService,
        // private userService: UserService
    ){}

    @Post("login")
    async authentication(@Res() res: Response, @Body() loginDto: LoginDto) {
        try {
            var token = await this.authenticationService.authenticate(loginDto);

            res.status(HttpStatus.OK).json(token);
        } catch (error) {
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
        }
    }

    // @Post("register")
    // async createUser(@Res() res: Response, @Body() userDto: UserDto) {
    //     try {
    //         await this.userService.createUser(userDto);

    //         res.status(HttpStatus.CREATED);
    //     } catch (error) {
    //         res.status(HttpStatus.CONFLICT).json({ message: error.message });
    //     }
    // }
}