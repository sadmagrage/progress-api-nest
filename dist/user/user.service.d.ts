import { User } from "./user.entity";
import { UserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userDto: UserDto): Promise<User>;
}
