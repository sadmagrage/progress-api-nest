import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Progress } from "./progress.entity";
import { Repository } from "typeorm";
import { ProgressDto } from "./progress.dto";

@Injectable()
export class ProgressService {
    constructor(
        @InjectRepository(Progress)
        private progressRepository: Repository<Progress>
    ){}

    findAll(): Promise<Progress[]> {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .orderBy('progress.attempt', 'ASC')
                .getMany();   
        } catch (error) {
            throw new Error(error.message);
        }
    }

    findLast(): Promise<Progress> {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .orderBy('progress.attempt', 'DESC')
                .getOne();   
        } catch (error) {
            throw new Error(error.message);
        }
    }

    findOne(id: string): Promise<Progress> {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .where('progress.id = :id', { id })
                .getOne();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    save(progressDto: ProgressDto): Promise<Progress> {
        try {
            var progress = this.progressRepository.create(progressDto);

            return this.progressRepository.save(progress);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(progressDto: ProgressDto, id: string): Promise<Progress> {
        try {
            var progress = await this.progressRepository.findOne({
                where: { id }
            });
    
            if (!progress) throw new Error("Progress not found");
    
            progress.attempt = progressDto.attempt;
            progress.timestamp = progressDto.timestamp;
    
            return this.progressRepository.save(progress);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    delete(id: string) {
        try {
            var progress = this.progressRepository.findOne({
                where: { id }
            });
    
            if (!progress) throw new Error("Progress not found");
    
            this.progressRepository.delete({ id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}