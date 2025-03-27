import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.authService.getToken()}`
        });
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/getTasks`, { headers: this.getHeaders() });
    }

    createTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/createTask`, task, { headers: this.getHeaders() });
    }

    updateTask(id: string, updates: Partial<Task>): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/updateStatusTask/${id}`, updates, { headers: this.getHeaders() });
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteTask/${id}`, { headers: this.getHeaders() });
    }
}