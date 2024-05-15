import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findUserByUsername(username: string) : Promise<User | null> {
        try {
            var user = await this.userRepository.findOneBy({ username });

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