import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: any;
    
    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private notificationService: NotificationService,
        private router: Router,
        private formBuilder: FormBuilder) {
        if (this.tokenStorage.getUser()) {
            this.router.navigate(['main']);
        }
    }
    
    ngOnInit(): void {
        this.loginForm = this.createLoginForm();
    }
    
    createLoginForm(): FormGroup {
        return this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required])],
        });
    }
    
    submitForm(): void {
        this.authService.loginUser({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        }).subscribe(data => {
            console.log(data);
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.notificationService.showSnackBar('Successfully logged in');
            this.router.navigate(['/']);
            window.location.reload();
        });
    }
}
