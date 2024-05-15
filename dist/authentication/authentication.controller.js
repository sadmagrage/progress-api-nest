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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("../login/login.dto");
const authentication_service_1 = require("./authentication.service");
const user_service_1 = require("../user/user.service");
const user_dto_1 = require("../user/user.dto");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
    async authentication(res, loginDto) {
        try {
            var token = await this.authenticationService.authenticate(loginDto);
            res.status(common_1.HttpStatus.OK).json(token);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
    async createUser(res, userDto) {
        try {
            await this.userService.createUser(userDto);
            res.status(common_1.HttpStatus.CREATED);
        }
        catch (error) {
            res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "authentication", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "createUser", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        user_service_1.UserService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map