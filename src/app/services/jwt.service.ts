import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {
    key = 'jwtToken';

    getToken(): string {
        return window.localStorage[this.key];
    }

    saveToken(token: string) {
        window.localStorage[this.key] = token;
    }

    destroyToken() {
        window.localStorage.removeItem(this.key);
    }

}
