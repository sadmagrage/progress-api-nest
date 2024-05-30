import { DataSource, Repository } from "typeorm";
import { Progress } from "./progress.entity";
export declare class ProgressRepository extends Repository<Progress> {
    private dataSource;
    constructor(dataSource: DataSource);
    findAllAndOrderByAttempt(): Promise<Progress[]>;
    findLast(): Promise<Progress>;
    findById(id: string): Promise<Progress>;
}
