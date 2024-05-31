import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "../user/user.enum";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthorizationService {
    private secret: string = process.env.SECRET;

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async authorize(token: string) {
        try {
            if (!token) return { message: "No token has been provided", status: 403 };

            if (token.startsWith("Bearer ")) token = token.replace("Bearer ", "");

            const { username } = this.jwtService.verify(token);

            const user = await this.userService.findUserByUsername(username);

            if (!user) return { message: "No user has been found", status: 403 };

            if (user.role != UserRole.ADMIN) return { message: "No role required", status: 403 };

            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}