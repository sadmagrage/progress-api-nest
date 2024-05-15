"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const progress_entity_1 = require("./progress.entity");
const typeorm_2 = require("typeorm");
let ProgressService = class ProgressService {
    constructor(progressRepository) {
        this.progressRepository = progressRepository;
    }
    findAll() {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .orderBy('progress.attempt', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    findLast() {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .orderBy('progress.attempt', 'DESC')
                .getOne();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    findOne(id) {
        try {
            return this.progressRepository.createQueryBuilder('progress')
                .where('progress.id = :id', { id })
                .getOne();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    save(progressDto) {
        try {
            var progress = this.progressRepository.create(progressDto);
            return this.progressRepository.save(progress);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async update(progressDto, id) {
        try {
            var progress = await this.progressRepository.findOne({
                where: { id }
            });
            if (!progress)
                throw new Error("Progress not found");
            progress.attempt = progressDto.attempt;
            progress.timestamp = progressDto.timestamp;
            return this.progressRepository.save(progress);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    delete(id) {
        try {
            var progress = this.progressRepository.findOne({
                where: { id }
            });
            if (!progress)
                throw new Error("Progress not found");
            this.progressRepository.delete({ id });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map