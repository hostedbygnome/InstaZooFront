import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    exports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatDividerModule,
        MatCardModule,
        MatDialogModule
    ]
})

export class MaterialModule {

}
