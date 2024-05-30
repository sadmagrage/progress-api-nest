import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Progress } from "./progress.entity";

@Injectable()
export class ProgressRepository extends Repository<Progress> {
    constructor(private dataSource: DataSource) {
        super(Progress, dataSource.createEntityManager());
    }

    findAllAndOrderByAttempt(): Promise<Progress[]> {
        var progress = this.find({ order: { attempt: "ASC" } });

        return progress;
    }

    async findLast(): Promise<Progress> {
        var progress = await this.find({ order: { attempt: "DESC" } });

        return progress[0];
    }

    async findById(id: string): Promise<Progress> {
        var progress = await this.findOne({ where: { id } });

        return progress;
    }
}