import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataTablePaginatorComponent } from './data-table-paginator/data-table-paginator.component';
import { DataTableSearchbarComponent } from './data-table-searchbar/data-table-searchbar.component';
import { DataFormActivationButtonComponent } from './data-form-activation-button/data-form-activation-button.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

// import { HttpClientModule } from '@angular/common/http';

// imports from material
// import {MatDrawerContainerModule, MatDrawerModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DataFormComponent,
    DataTablePaginatorComponent,
    DataTableSearchbarComponent,
    DataFormActivationButtonComponent,
    DeleteUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
