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
exports.ProgressController = void 0;
const common_1 = require("@nestjs/common");
const progress_service_1 = require("./progress.service");
const progress_dto_1 = require("./progress.dto");
let ProgressController = class ProgressController {
    constructor(progressService) {
        this.progressService = progressService;
    }
    async findAll(res) {
        try {
            var progress = await this.progressService.findAll();
            res.status(common_1.HttpStatus.OK).json(progress);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
    async findLast(res) {
        try {
            var progress = await this.progressService.findLast();
            res.status(common_1.HttpStatus.OK).json(progress);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
    async findOne(res, id) {
        try {
            var progress = await this.progressService.findOne(id);
            res.status(common_1.HttpStatus.OK).json(progress);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
    async save(res, progressDto) {
        try {
            var progress = await this.progressService.save(progressDto);
            res.status(common_1.HttpStatus.CREATED).json(progress);
        }
        catch (error) {
            res.status(common_1.HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }
    async update(res, progressDto, id) {
        try {
            var progress = await this.progressService.update(progressDto, id);
            res.status(common_1.HttpStatus.OK).json(progress);
        }
        catch (error) {
            res.status(common_1.HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }
    delete(res, id) {
        try {
            this.progressService.delete(id);
            res.status(common_1.HttpStatus.OK).json({ message: "Deleted sucessfully" });
        }
        catch (error) {
            res.status(common_1.HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/last"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findLast", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, progress_dto_1.ProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, progress_dto_1.ProgressDto, String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "delete", null);
exports.ProgressController = ProgressController = __decorate([
    (0, common_1.Controller)('progress'),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map