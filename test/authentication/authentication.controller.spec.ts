import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AuthenticationController } from "../../src/authentication/authentication.controller";
import { AuthenticationService } from "../../src/authentication/authentication.service";
import { LoginDto } from "../../src/login/login.dto";
import { TokenDto } from "../../src/token/token.dto";

describe('AuthenticationController', () => {

    let app: INestApplication;

    let authenticationService: AuthenticationService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthenticationController],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: {
                        authenticate: jest.fn()
                    }
                }
            ]
        }).compile();

        authenticationService = module.get<AuthenticationService>(AuthenticationService);

        app = module.createNestApplication();
        await app.init();
    });

    describe('authentication', () => {
        it('/POST auth/login', async () => {
            var loginDto: LoginDto = new LoginDto();

            var tokenDto = new TokenDto("token");

            loginDto.username = "username";
            loginDto.password = "password"

            jest.spyOn(authenticationService, "authenticate").mockResolvedValue(tokenDto);

            const result = await request(app.getHttpServer())
                .post("/auth/login")
                .send(loginDto);

            expect(authenticationService.authenticate).toHaveBeenCalledWith(loginDto);
            expect(result.status).toBe(200);
            expect(result.body).toEqual(tokenDto);
        });
    });
});