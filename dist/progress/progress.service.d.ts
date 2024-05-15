import { Progress } from "./progress.entity";
import { Repository } from "typeorm";
import { ProgressDto } from "./progress.dto";
export declare class ProgressService {
    private progressRepository;
    constructor(progressRepository: Repository<Progress>);
    findAll(): Promise<Progress[]>;
    findLast(): Promise<Progress>;
    findOne(id: string): Promise<Progress>;
    save(progressDto: ProgressDto): Promise<Progress>;
    update(progressDto: ProgressDto, id: string): Promise<Progress>;
    delete(id: string): void;
}
