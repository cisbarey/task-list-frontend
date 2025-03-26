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
    standalone: false,
})
export class LoginComponent {
    loginForm: FormGroup;

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
        console.log('submit', this.loginForm.invalid);
        
        if (this.loginForm.invalid) return;
        const email = this.loginForm.value.email;

        this.authService.login(email).subscribe({
            next: () => this.router.navigate(['/tasks']),
            error: (err) => {
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
                this.authService.createUser(email).subscribe(() => this.router.navigate(['/tasks']));
            }
        });
    }
}