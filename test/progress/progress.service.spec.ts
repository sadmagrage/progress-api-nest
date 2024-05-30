import { ProgressService } from "../../src/progress/progress.service";
import { Test } from "@nestjs/testing";
import { Progress } from "../../src/progress/progress.entity";
import { ProgressRepository } from "../../src/progress/progress.repository";
import { ProgressDto } from "../../src/progress/progress.dto";
import { UUID, randomUUID } from "crypto";

describe('ProgressService', () => {

    let progressService: ProgressService;
    let progressRepository: ProgressRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProgressService,
                {
                    provide: ProgressRepository,
                    useValue: {
                        findAllAndOrderByAttempt: jest.fn(),
                        findLast: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile();

        progressService = module.get<ProgressService>(ProgressService);
        progressRepository = module.get<ProgressRepository>(ProgressRepository);
    });

    describe('findAll', () => {
        it('Should return a list of Progress', async () => {
            const progress: Progress[] = [new Progress()];

            jest.spyOn(progressRepository, "findAllAndOrderByAttempt").mockResolvedValue(progress);

            const result = await progressService.findAll();

            expect(result).not.toBeNull();
            expect(progressRepository.findAllAndOrderByAttempt).toHaveBeenCalled();
            expect(result).toBe(progress);
        });
    });

    describe('findLast', () => {
        it('Should return the first element of the array of Progress', async () => {
            const progress: Progress[] = [new Progress(), new Progress()];

            jest.spyOn(progressRepository, "findLast").mockResolvedValue(progress[0]);

            const result = await progressService.findLast();

            expect(result).not.toBeNull();
            expect(progressRepository.findLast).toHaveBeenCalled();
            expect(result).toEqual(progress[0]);
        });
    });

    describe('findOne', () => {
        it('Should return a Progress according to his ID', async () => {
            const progress: Progress = new Progress();
            const id: UUID = randomUUID();

            jest.spyOn(progressRepository, "findById").mockResolvedValue(progress);

            const result = await progressService.findOne(id);

            expect(result).not.toBeNull();
            expect(result).toEqual(progress);
            expect(progressRepository.findById).toHaveBeenCalledWith(id);
        });
    })

    describe('save', () => {
        it('Should save and store a new Progress', async () => {
            const progressDto: ProgressDto = new ProgressDto();

            const progress: Progress = new Progress();

            jest.spyOn(progressRepository, "create").mockReturnValue(progress);
            jest.spyOn(progressRepository, "save").mockResolvedValue(progress);

            const result = await progressService.save(progressDto);

            expect(result).not.toBeNull();
            expect(progressRepository.create).toHaveBeenCalledWith(progressDto);
            expect(progressRepository.save).toHaveBeenCalledWith(progress);
            expect(result).toEqual(progress);
        });
    })

    describe('update', () => {
        it('Should update a Progress', async () => {
            const id = randomUUID();

            const progressDto: ProgressDto = new ProgressDto();

            const progress: Progress = new Progress();
            const newProgress: Progress = new Progress();

            progressDto.attempt = 1;
            progressDto.timestamp = 100000;

            newProgress.attempt = progressDto.attempt;
            newProgress.timestamp = progressDto.timestamp;

            jest.spyOn(progressRepository, "findById").mockResolvedValue(progress);
            jest.spyOn(progressRepository, "save").mockResolvedValue(newProgress);

            const result = await progressService.update(progressDto, id);

            expect(result).not.toBeNull();
            expect(progressRepository.findById).toHaveBeenCalledWith(id);
            expect(progressRepository.save).toHaveBeenCalledWith(newProgress);
            expect(result).toEqual(newProgress);
        });
    });

    describe('delete', () => {
        it('Should delete a Progress', () => {
            const id = randomUUID();

            const progress: Progress = new Progress();

            jest.spyOn(progressRepository, "findById").mockResolvedValue(progress);

            progressService.delete(id);

            expect(progressRepository.findById).toHaveBeenCalledWith(id);
            expect(progressRepository.delete).toHaveBeenCalledWith({ id });
        });
    });
})