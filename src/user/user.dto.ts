import { UserRole } from "./user.enum";

export class UserDto {
    username: string;
    password: string;
    role: UserRole;
}