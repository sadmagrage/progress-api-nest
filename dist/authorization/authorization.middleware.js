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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
let AuthorizationMiddleware = class AuthorizationMiddleware {
    constructor(authozationService) {
        this.authozationService = authozationService;
    }
    async use(req, res, next) {
        const response = await this.authozationService.authorize(req.header("Authorization"));
        if (!response)
            next();
        else
            res.status(response.status).json({ message: response.message });
    }
};
exports.AuthorizationMiddleware = AuthorizationMiddleware;
exports.AuthorizationMiddleware = AuthorizationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationMiddleware);
//# sourceMappingURL=authorization.middleware.js.map