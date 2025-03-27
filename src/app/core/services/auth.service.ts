import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(email: string): Observable<string> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username: email }).pipe(
            map(response => {
                console.log('response', response);
                
                localStorage.setItem('token', response.token);
                return response.token;
            }),
            catchError(error => {
                if (error.status === 404) throw new Error('User not found');
                throw error;
            })
        );
    }

    createUser(email: string): Observable<string> {
        return this.http.post<{ user: any; token: string }>(`${this.apiUrl}/createUser`, { username: email }).pipe(
            map(response => {
                localStorage.setItem('token', response.token);
                return response.token;
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}