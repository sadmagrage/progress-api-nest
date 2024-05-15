"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const progress_module_1 = require("./progress/progress.module");
const typeorm_1 = require("@nestjs/typeorm");
const progress_entity_1 = require("./progress/progress.entity");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./user/user.entity");
const authentication_module_1 = require("./authentication/authentication.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DB_URI,
                entities: [progress_entity_1.Progress, user_entity_1.User],
                synchronize: true,
            }),
            progress_module_1.ProgressModule,
            authentication_module_1.AuthenticationModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map