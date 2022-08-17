import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../services/post.service';
import {ImageUploadService} from '../../services/image-upload.service';
import {CommentService} from '../../services/comment.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-user-posts',
    templateUrl: "./user-posts.component.html",
    styleUrls: ['./styles/user-posts.style.css']
})
export class UserPostsComponent implements OnInit {
    isUserPostsLoaded = false;
    public posts!: Post[];
    
    constructor(private postService: PostService,
                private imageService: ImageUploadService,
                private commentService: CommentService,
                private notificationService: NotificationService) {
    }
    
    ngOnInit(): void {
        this.postService.getPostForCurrentUser()
            .subscribe(data => {
                console.log(data);
                this.posts = data;
                this.getImagesToPosts(this.posts);
                this.getCommentsToPosts(this.posts);
                this.isUserPostsLoaded = true;
            });
    }
    
    getImagesToPosts(posts: Post[]): void {
        posts.forEach(post => {
            if (post.id) {
                this.imageService.getImageToPost(post.id)
                    .subscribe(data => {
                        console.log(data);
                        post.image = data.imageBytes;
                    });
            }
            
        });
    }
    
    getCommentsToPosts(posts: Post[]): void {
        posts.forEach(post => {
            if (post.id) {
                this.commentService.getCommentToPost(post.id)
                    .subscribe(data => {
                        post.comments = data;
                    });
            }
            
        });
    }
    
    removePost(post: Post, index: number): void {
        console.log(post);
        const result = confirm('Do you really want to delete this post?');
        if (result && post.id) {
            this.postService.deletePost(post.id)
                .subscribe(() => {
                    this.posts?.splice(index, 1);
                    this.notificationService.showSnackBar('Post deleted');
                });
        }
    }
    
    formatImage(img: any): any {
        if (img == null) {
            return null;
        }
        return 'data:image/jpeg;base64,' + img;
    }
    
    deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
        const post = this.posts[postIndex];
        console.log(post);
        
        this.commentService.deleteComment(commentId)
            .subscribe(() => {
                this.notificationService.showSnackBar('Comment removed');
                post.comments?.splice(commentIndex, 1);
            });
    }
}
