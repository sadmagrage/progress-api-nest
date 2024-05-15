import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "src/user/user.service";
import { AuthenticationController } from "./authentication.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET,
            signOptions: { expiresIn: "15min" }
        })
    ],
    providers: [AuthenticationService, UserService],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}