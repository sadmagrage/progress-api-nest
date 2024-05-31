import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AuthorizationService } from "../../src/authorization/authorization.service";
import { User } from "../../src/user/user.entity";
import { UserRole } from "../../src/user/user.enum";
import { UserService } from "../../src/user/user.service";

describe('AuthorizationService', () => {

    let authorizationService: AuthorizationService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthorizationService,
                {
                    provide: UserService,
                    useValue: {
                        findUserByUsername: jest.fn()
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        verify: jest.fn()
                    }
                }
            ]
        }).compile();

        authorizationService = module.get<AuthorizationService>(AuthorizationService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('authorize', () => {
        it('Should verify and authorize', async () => {
            const token = "Bearer token";
            const username = "username";

            const user: User = new User();

            user.username = username;
            user.password = "password";
            user.role = UserRole.ADMIN;

            jest.spyOn(jwtService, "verify").mockReturnValue({ username });
            jest.spyOn(userService, "findUserByUsername").mockResolvedValue(user);

            const result = await authorizationService.authorize(token);

            expect(jwtService.verify).toHaveBeenCalledWith("token");
            expect(userService.findUserByUsername).toHaveBeenCalledWith(user.username);
            expect(result).toBeNull();
        });
    });
});