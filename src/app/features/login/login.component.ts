import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;
        const email = this.loginForm.value.email;

        this.isLoading = true;
        this.authService.login(email).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/tasks']);
            },
            error: (err) => {
                this.isLoading = false;
                if (err.message === 'User not found') {
                    this.openConfirmationDialog(email);
                }
            }
        });
    }

    openConfirmationDialog(email: string) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: { message: 'User not found. Would you like to create one?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isLoading = true;
                this.authService.createUser(email).subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.router.navigate(['/tasks']);
                    },
                    error: () => {
                        this.isLoading = false;
                    }
                });
            }
        });
    }
}