import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './helper/auth-interceptor.service';
import {authErrorInterceptorProvider} from './helper/error-interceptor.service';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {IndexComponent} from './layout/index/index.component';
import {ProfileComponent} from "./user/profile/profile.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {AddPostComponent} from "./user/add-post/add-post.component";
import {UserPostsComponent} from "./user/user-posts/user-posts.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        NavigationComponent,
        IndexComponent,
        ProfileComponent,
        EditUserComponent,
        AddPostComponent,
        UserPostsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [authInterceptorProviders, authErrorInterceptorProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
