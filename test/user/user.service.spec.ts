import { Test } from "@nestjs/testing";
import { UserDto } from "../../src/user/user.dto";
import { User } from "../../src/user/user.entity";
import { UserRole } from "../../src/user/user.enum";
import { UserRepository } from "../../src/user/user.repository";
import { UserService } from "../../src/user/user.service";
import * as bcrypt from "bcryptjs";

describe('UserService', () => {

    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByUsername: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn()
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe('findUserByUsername', () => {
        it('Should return a user according to his username', async () => {
            const username = "username";

            const user: User = new User();

            user.username = "username";
            user.password = "password";
            user.role = UserRole.USER;

            jest.spyOn(userRepository, "findByUsername").mockResolvedValue(user);

            const result = await userService.findUserByUsername(username);

            expect(result).not.toBeNull();
            expect(userRepository.findByUsername).toHaveBeenCalledWith(username);
            expect(result).toEqual(user);
        });
    });

    describe('createUser', () => {
        it('Should save a new user', async () => {
            jest.mock("bcryptjs", () => ({
                hash: jest.fn()
            }));

            const userDto: UserDto = new UserDto();
            const user: User = new User();

            const password = "password";
            const hashedPassword = "hashed_password";

            user.username = "username";
            user.password = password;
            user.role = UserRole.USER;

            userDto.username = "username";
            userDto.password = password;
            userDto.role = UserRole.USER;

            jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword as never);
            jest.spyOn(userRepository, "create").mockReturnValue(user);
            jest.spyOn(userRepository, "save").mockResolvedValue(user);

            const result = await userService.createUser(userDto);

            expect(result).not.toBeNull();
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
            expect(userRepository.create).toHaveBeenCalledWith(userDto);
            expect(userRepository.save).toHaveBeenCalledWith(user);
            expect(result).toEqual(user);
        });
    });
});