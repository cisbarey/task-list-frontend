import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../core/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: false
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask(task: Partial<Task>) {
    this.taskService.createTask(task).subscribe(newTask => {
      this.tasks.push(newTask);
    });
  }

  toggleTask(task: Task) {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe(updated => {
      task.completed = updated.completed;
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  trackById(index: number, task: Task): string {
    return task.id;
  }
}