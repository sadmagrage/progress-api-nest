import { Injectable } from "@nestjs/common";
import { Progress } from "./progress.entity";
import { ProgressDto } from "./progress.dto";
import { ProgressRepository } from "./progress.repository";

@Injectable()
export class ProgressService {
    constructor(private progressRepository: ProgressRepository){}

    findAll(): Promise<Progress[]> {
        try {
            var progress = this.progressRepository.findAllAndOrderByAttempt();

            return progress;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    findLast(): Promise<Progress> {
        try {
            var progress = this.progressRepository.findLast();

            return progress;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    findOne(id: string): Promise<Progress> {
        try {
            var progress = this.progressRepository.findById(id);

            return progress;
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
            var progress = await this.progressRepository.findById(id);
    
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
            var progress = this.progressRepository.findById(id);
    
            if (!progress) throw new Error("Progress not found");
    
            this.progressRepository.delete({ id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}