import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userDto: UserDto): Promise<User>;
}
