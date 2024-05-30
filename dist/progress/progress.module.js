"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressModule = void 0;
const common_1 = require("@nestjs/common");
const progress_controller_1 = require("./progress.controller");
const progress_service_1 = require("./progress.service");
const typeorm_1 = require("@nestjs/typeorm");
const progress_entity_1 = require("./progress.entity");
const authorization_service_1 = require("../authorization/authorization.service");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
const config_1 = require("@nestjs/config");
const authorization_middleware_1 = require("../authorization/authorization.middleware");
const progress_repository_1 = require("./progress.repository");
const user_repository_1 = require("../user/user.repository");
let ProgressModule = class ProgressModule {
    configure(consumer) {
        consumer
            .apply(authorization_middleware_1.AuthorizationMiddleware)
            .forRoutes(progress_controller_1.ProgressController);
    }
};
exports.ProgressModule = ProgressModule;
exports.ProgressModule = ProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([progress_entity_1.Progress, user_entity_1.User]), config_1.ConfigModule.forRoot()],
        providers: [progress_service_1.ProgressService, progress_repository_1.ProgressRepository, authorization_service_1.AuthorizationService, user_service_1.UserService, user_repository_1.UserRepository],
        controllers: [progress_controller_1.ProgressController]
    })
], ProgressModule);
//# sourceMappingURL=progress.module.js.map