import { Progress } from "./progress.entity";
import { ProgressDto } from "./progress.dto";
import { ProgressRepository } from "./progress.repository";
export declare class ProgressService {
    private progressRepository;
    constructor(progressRepository: ProgressRepository);
    findAll(): Promise<Progress[]>;
    findLast(): Promise<Progress>;
    findOne(id: string): Promise<Progress>;
    save(progressDto: ProgressDto): Promise<Progress>;
    update(progressDto: ProgressDto, id: string): Promise<Progress>;
    delete(id: string): void;
}
