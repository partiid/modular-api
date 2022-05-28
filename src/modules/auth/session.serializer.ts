import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void): void {
        done(null, true);
    }

    deserializeUser(payload: any, done: (err: Error, user: any) => void): void {
        done(null, payload);
    }
}
