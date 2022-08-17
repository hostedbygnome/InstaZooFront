import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./styles/edit-user.style.css']
})
export class EditUserComponent implements OnInit {
    profileEditForm!: FormGroup;
    
    constructor(private dialogRef: MatDialogRef<EditUserComponent>,
                private notificationService: NotificationService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    
    ngOnInit(): void {
        this.profileEditForm = this.createProfileForm();
    }
    
    createProfileForm(): FormGroup {
        return this.formBuilder.group({
            firstname: [
                this.data.user.firstname,
                Validators.compose([Validators.required])
            ],
            lastname: [
                this.data.user.lastname,
                Validators.compose([Validators.required])
            ],
            bio: [
                this.data.user.bio,
                Validators.compose([Validators.required])
            ]
        });
    }
    
    submit(): void {
        this.userService.updateUser(this.updateUser())
            .subscribe(() => {
                this.notificationService.showSnackBar('User updated successfully');
                this.dialogRef.close();
            });
    }
    
    closeDialog() {
        this.dialogRef.close();
    }
    
    private updateUser(): User {
        this.data.user.firstname = this.profileEditForm.value.firstname;
        this.data.user.lastname = this.profileEditForm.value.lastname;
        this.data.user.bio = this.profileEditForm.value.bio;
        return this.data.user;
    }
}
