import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { ProgressModule } from "../../src/progress/progress.module";
import { ProgressService } from "../../src/progress/progress.service";
import { Progress } from "../../src/progress/progress.entity";
import { AuthorizationMiddleware } from "../../src/authorization/authorization.middleware";
import { NextFunction, Request, Response } from "express";
import { AuthorizationService } from "../../src/authorization/authorization.service";

describe('ProgressController', () => {

    let app: INestApplication;

    let progressService = { 
        findAll: () => [new Progress()]
    };

    let authorizationMiddleware = {
        use: (req: Request, res: Response, next: NextFunction) => next()
    };

    let authorizationService = {
        authorize: (token: string) => null
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ProgressModule],
        })
            .overrideProvider(ProgressService)
            .useValue(progressService)
            // .overrideProvider(AuthorizationService)
            // .useValue(authorizationService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    describe('findAll', () => {
        it('/GET progress', () => {
            return request(app.getHttpServer())
                .get('/progress')
                .expect(200)
                .expect({
                    data: progressService.findAll()
                });
        });
    });

    afterAll(async () => {
        await app.close();
    })
});