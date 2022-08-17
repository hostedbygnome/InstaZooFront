import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./styles/add-post.style.css']
})
export class AddPostComponent implements OnInit {
    isPostCreated = false;
    createdPost!: Post;
    previewImageURL: any = "/assets/icons/no-image.png";
    postForm!: FormGroup
    selectedFile!: File
    
    constructor(private postService: PostService,
                private imageUploadService: ImageUploadService,
                private notificationService: NotificationService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }
    
    ngOnInit(): void {
        this.postForm = this.createPostForm();
    }
    
    createPostForm(): FormGroup {
        return this.formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            caption: ['', Validators.compose([Validators.required])],
            location: ['', Validators.compose([Validators.required])],
        });
    }
    
    submitPost(): void {
        this.postService.createPost({
            title: this.postForm.value.title,
            caption: this.postForm.value.caption,
            location: this.postForm.value.location,
        }).subscribe(data => {
            this.createdPost = data;
            console.log(data);
            
            if (this.createdPost.id != null) {
                this.imageUploadService.uploadImageToPost(this.selectedFile, this.createdPost.id)
                    .subscribe(() => {
                        this.notificationService.showSnackBar('Post created successfully');
                        this.isPostCreated = true;
                        this.router.navigate(['/profile']);
                    });
            }
        });
    }
    
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
        
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
            this.previewImageURL = reader.result;
        };
    }
}
