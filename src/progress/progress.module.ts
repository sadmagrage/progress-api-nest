import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProgressController } from "./progress.controller";
import { ProgressService } from "./progress.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Progress } from "./progress.entity";
import { AuthorizationService } from "src/authorization/authorization.service";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthorizationMiddleware } from "src/authorization/authorization.middleware";
import { ProgressRepository } from "./progress.repository";
import { UserRepository } from "src/user/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Progress, User]), ConfigModule.forRoot()],
    providers: [ProgressService, ProgressRepository, AuthorizationService, UserService, UserRepository],
    controllers: [ProgressController]
})
export class ProgressModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizationMiddleware)
            .exclude(
                { method: RequestMethod.GET, path: "progress" },
                { method: RequestMethod.GET, path: "progress/last" },
                { method: RequestMethod.GET, path: "progress/search" }
            )
            .forRoutes(ProgressController)
    }
}