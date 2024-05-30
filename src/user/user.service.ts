import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository){}

    async findUserByUsername(username: string) : Promise<User | null> {
        try {
            var user = await this.userRepository.findByUsername(username);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(userDto: UserDto) {
        try {
            userDto.password = await bcrypt.hash(userDto.password, 12);

            var user = this.userRepository.create(userDto)

            return await this.userRepository.save(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}