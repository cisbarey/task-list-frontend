import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../core/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: false
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Partial<Task> = { title: '', status: false };
  isLoading = false;
  isUpdating = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading tasks:', err);
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  addTask(): void {
    if (!this.newTask.title) return;
    this.isLoading = true;
    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = { title: '', status: false };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.isLoading = false;
      }
    });
  }

  updateTask(task: Task): void {
    this.isUpdating = true;
    this.taskService.updateTask(task.id, { status: task.status }).subscribe({
      next: () => {
        this.isUpdating = false;
        console.log('Task updated');
      },
      error: (err) => {
        this.isUpdating = false;
        console.error('Error updating task:', err);
      }
    });
  }

  deleteTask(id: string): void {
    this.isUpdating = true;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.isUpdating = false;
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error: (err) => {
        this.isUpdating = false;
        console.error('Error deleting task:', err)
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  trackById(index: number, task: Task): string {
    return task.id;
  }
}