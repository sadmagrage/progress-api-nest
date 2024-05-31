import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { ProgressService } from "../../src/progress/progress.service";
import { ProgressController } from "../../src/progress/progress.controller";
import { Progress } from "../../src/progress/progress.entity";
import { randomUUID } from "crypto";
import { ProgressDto } from "../../src/progress/progress.dto";

describe('ProgressController', () => {

    let app: INestApplication;

    let progressService: ProgressService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProgressController],
            providers: [
                {
                    provide: ProgressService,
                    useValue: {
                        findAll: jest.fn(),
                        findLast: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        })
            .compile();
        
        progressService = module.get<ProgressService>(ProgressService);

        app = module.createNestApplication();
        await app.init();
    });

    describe('findAll', () => {
        it('/GET progress', async () => {
            const progress: Progress = new Progress();

            progress.attempt = 1;
            progress.timestamp = 1000;

            const progressList: Progress[] = [progress];

            jest.spyOn(progressService, "findAll").mockResolvedValue(progressList);

            const response = await request(app.getHttpServer())
                .get('/progress');
            
            expect(progressService.findAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(progressList);
        });
    });

    describe('findLast', () => {
        it('/GET progress/last', async () => {
            const progress: Progress = new Progress();

            progress.attempt = 1;
            progress.timestamp = 1000;

            jest.spyOn(progressService, "findLast").mockResolvedValue(progress);

            const response = await request(app.getHttpServer())
                .get('/progress/last');
            
            expect(progressService.findLast).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(progress);
        });
    });

    describe('findOne', () => {
        it('/GET progress/search', async() => {
            const id = randomUUID();

            const progress: Progress = new Progress();

            progress.attempt = 1;
            progress.timestamp = 1000;

            jest.spyOn(progressService, "findOne").mockResolvedValue(progress);

            const response = await request(app.getHttpServer())
                .get(`/progress/search?id=${ id }`);
            
            expect(progressService.findOne).toHaveBeenCalledWith(id);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(progress);
        });
    });

    describe('save', () => {
        it('/POST progress', async () => {
            const progress: Progress = new Progress();
            const progressDto: ProgressDto = new ProgressDto();
            
            progressDto.attempt = 1;
            progressDto.timestamp = 1000;

            progress.attempt = 1;
            progress.timestamp = 1000;

            jest.spyOn(progressService, "save").mockResolvedValue(progress);

            const response = await request(app.getHttpServer())
                .post(`/progress`)
                .send(progressDto);
            
            expect(progressService.save).toHaveBeenCalledWith(progressDto);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(progress);
        });
    });

    describe('update', () => {
        it('/PUT progress', async () => {
            const id = randomUUID();

            const progress: Progress = new Progress();
            const progressDto: ProgressDto = new ProgressDto();
            
            progressDto.attempt = 1;
            progressDto.timestamp = 1000;

            progress.attempt = 1;
            progress.timestamp = 1000;

            jest.spyOn(progressService, "update").mockResolvedValue(progress);

            const response = await request(app.getHttpServer())
                .put(`/progress/${ id }`)
                .send(progressDto);
            
            expect(progressService.update).toHaveBeenCalledWith(progressDto, id);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(progress);
        });
    });

    describe('delete', () => {
        it('/DELETE progress', async () => {
            const id = randomUUID();

            jest.spyOn(progressService, "delete").mockImplementation(() => {});

            const response = await request(app.getHttpServer())
                .delete(`/progress/${ id }`);

            expect(progressService.delete).toHaveBeenCalledWith(id);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Deleted sucessfully" });
        })
    });

    afterAll(async () => {
        await app.close();
    })
});