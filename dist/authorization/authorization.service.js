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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_enum_1 = require("../user/user.enum");
const user_service_1 = require("../user/user.service");
let AuthorizationService = class AuthorizationService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.secret = process.env.SECRET;
    }
    async authorize(token) {
        try {
            if (!token)
                return { message: "No token has been provided", status: 403 };
            if (token.startsWith("Bearer "))
                token = token.replace("Bearer ", "");
            const { username } = this.jwtService.verify(token);
            const user = await this.userService.findUserByUsername(username);
            if (!user)
                return { message: "No user has been found", status: 403 };
            if (user.role != user_enum_1.UserRole.ADMIN)
                return { message: "No role required", status: 403 };
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map