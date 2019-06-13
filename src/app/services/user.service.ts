import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private router: Router,
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService
    ) { }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/users/me')
                .subscribe(
                    user => {
                        if (user) {
                            this.setAuth(this.jwtService.getToken(), user);
                        }
                    },
                    err => this.purgeAuth()
                );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(token: string, user: User) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    attemptAuth(credentials): Observable<User> {
        const credentialz = btoa(credentials.email + ':' + credentials.password);
        const basicAuth = 'Basic ' + credentialz;
        return this.apiService.post('/auth', {}, { headers: { Authorization: basicAuth } })
            .pipe(map(
                data => {
                    this.setAuth(data.token, data.user);
                    return data;
                }
            ));
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user): Observable<User> {
        return this.apiService
            .put('/users/me', { user })
            .pipe(map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}
