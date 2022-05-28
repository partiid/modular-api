import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuthDto } from '../users/dto/userAuth.dto';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async validateUser(userAuth: UserAuthDto): Promise<any> {
        const { username, password } = userAuth;
        const user = await this.usersService.getUserByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
