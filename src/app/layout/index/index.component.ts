import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {NotificationService} from "../../services/notification.service";
import {ImageUploadService} from "../../services/image-upload.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./styles/index.style.css']
})
export class IndexComponent implements OnInit {
    isPostsLoaded = false;
    isUserDataLoaded = false;
    posts!: Post[];
    user!: User;
    public commentForm: any;
    
    constructor(private _postService: PostService,
                private _userService: UserService,
                private _commentService: CommentService,
                private _notificationService: NotificationService,
                private _imageService: ImageUploadService,
                private _formBuilder: FormBuilder) {
    }
    
    ngOnInit(): void {
        this._postService.getAllPosts()
            .subscribe(data => {
                console.log(data);
                this.posts = data;
                this.getImagesToPosts(this.posts);
                this.getCommentsToPost(this.posts);
                this.isPostsLoaded = true;
            });
        
        this._userService.getCurrentUser()
            .subscribe(data => {
                this.user = data;
                this.isUserDataLoaded = true;
            });
        
        this.commentNewForm();
    }
    
    getImagesToPosts(posts: Post[]): void {
        posts.forEach(post => {
            if (post.id != null) {
                this._imageService.getImageToPost(post.id)
                    .subscribe(data => {
                        post.image = data.imageBytes;
                    });
            }
        });
    }
    
    getCommentsToPost(posts: Post[]): void {
        posts.forEach(post => {
            if (post.id != null) {
                this._commentService.getCommentToPost(post.id)
                    .subscribe(data => {
                        post.comments = data;
                    });
            }
        });
    }
    
    likePost(postId: number, postIndex: number): void {
        const post = this.posts[postIndex];
        console.log(post);
        if (!post.usersLiked?.includes(this.user.username)) {
            this._postService.likePost(postId, this.user.username)
                .subscribe(() => {
                    post.usersLiked?.push(this.user.username);
                    this._notificationService.showSnackBar('Liked post');
                });
        } else {
            this._postService.likePost(postId, this.user.username)
                .subscribe(() => {
                    const index = post.usersLiked?.indexOf(this.user.username, 0);
                    if (typeof index != "undefined" && index > -1) {
                        post.usersLiked?.splice(index, 1);
                    }
                });
        }
    }
    
    postComment(postId: number, postIndex: number): void {
        const post = this.posts[postIndex];
        console.log(post);
        console.log(this.commentForm.value.comment);
        this._commentService.addCommentToPost(postId, this.commentForm.value.comment)
            .subscribe(data => {
                console.log(data);
                post.comments?.push(data);
            });
        this.commentNewForm();
    }
    
    formatImage(image: any): any {
        if (image == null) {
            return null;
        }
        return 'data:image/jpeg;base64,' + image;
    }
    
    createCommentForm(): FormGroup {
        return this._formBuilder.group({
            comment: ['', Validators.compose([Validators.required])]
        });
    }
    
    commentNewForm(): any {
        this.commentForm = this.createCommentForm()
    }
}

