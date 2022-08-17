import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./styles/registration.style.css']
})
export class RegistrationComponent implements OnInit {
    public registrationForm: any;
    
    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder
    ) {
    }
    
    ngOnInit(): void {
        this.creatNewForm();
    }
    
    createRegistrationForm(): FormGroup {
        return this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            username: ['', Validators.compose([Validators.required])],
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])]
        });
    }
    
    submitForm(): void {
        console.log(this.registrationForm.value);
        this.authService.registerUser({
            email: this.registrationForm.value.email,
            username: this.registrationForm.value.username,
            firstname: this.registrationForm.value.firstname,
            lastname: this.registrationForm.value.lastname,
            password: this.registrationForm.value.password,
            confirmPassword: this.registrationForm.value.confirmPassword,
        }).subscribe(data => {
            console.log(data);
            this.notificationService.showSnackBar('Successfully registered')
        });
        this.creatNewForm();
    }
    
    creatNewForm(): void {
        this.registrationForm = this.createRegistrationForm();
    }
}
