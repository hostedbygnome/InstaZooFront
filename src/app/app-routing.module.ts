import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./user/profile/profile.component";
import {UserPostsComponent} from "./user/user-posts/user-posts.component";
import {AddPostComponent} from "./user/add-post/add-post.component";

const routes: Routes = [
    {path: 'signin', component: LoginComponent},
    {path: 'signup', component: RegistrationComponent},
    {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
            {path: '', component: UserPostsComponent, canActivate: [AuthGuardService]},
            {path: 'add', component: AddPostComponent, canActivate: [AuthGuardService]}
        ]
    },
    {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
