import { UserService } from "../../src/user/user.service";
import { AuthenticationService } from "../../src/authentication/authentication.service";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { LoginDto } from "../../src/login/login.dto";
import { User } from "../../src/user/user.entity";
import { randomUUID } from "crypto";
import * as bcrypt from "bcryptjs";
import { TokenDto } from "../../src/token/token.dto";

describe('AuthenticationService', () => {

    let authenticationService: AuthenticationService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthenticationService,
                {
                    provide: UserService,
                    useValue: {
                        findUserByUsername: jest.fn()
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn()
                    }
                }
            ]
        }).compile();

        authenticationService = module.get<AuthenticationService>(AuthenticationService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('Authentication', () => {
        it('Should verify the user and authenticate', async () => {
            jest.mock("bcryptjs", () => ({
                compare: jest.fn()
            }));

            var loginDto: LoginDto = new LoginDto();

            var user: User = new User();

            var token = new TokenDto(randomUUID());

            loginDto.username = "username";
            loginDto.password = "password";

            user.username = loginDto.username;
            user.password = "hashed_pass";

            jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
            jest.spyOn(userService, "findUserByUsername").mockResolvedValue(user);
            jest.spyOn(jwtService, "sign").mockReturnValue(token.token);

            const result = await authenticationService.authenticate(loginDto);

            expect(result).not.toBeNull();
            expect(userService.findUserByUsername).toHaveBeenCalledWith(loginDto.username);
            expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.password);
            expect(jwtService.sign).toHaveBeenCalledWith({ username: user.username });
            expect(result).toEqual(token);
        });
    });
});