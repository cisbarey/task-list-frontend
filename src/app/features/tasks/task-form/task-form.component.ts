import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../core/models/task';
import { AuthService } from '../../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
    standalone: false
})
export class TaskFormComponent {
    taskForm: FormGroup;
    @Output() taskAdded = new EventEmitter<Partial<Task>>();

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['']
        });
    }

    onSubmit() {
        if (this.taskForm.invalid) return;
        const token = this.authService.getToken();
        const decodedToken: any = token ? jwtDecode(token) : {};
        const task: Partial<Task> = {
            ...this.taskForm.value,
            userId: decodedToken.userId || ''
        };
        this.taskAdded.emit(task);
        this.taskForm.reset();
    }
}