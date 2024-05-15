import { ProgressService } from "./progress.service";
import { Response } from "express";
import { ProgressDto } from "./progress.dto";
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    findAll(res: Response): Promise<void>;
    findLast(res: Response): Promise<void>;
    findOne(res: Response, id: string): Promise<void>;
    save(res: Response, progressDto: ProgressDto): Promise<void>;
    update(res: Response, progressDto: ProgressDto, id: string): Promise<void>;
    delete(res: Response, id: string): void;
}
