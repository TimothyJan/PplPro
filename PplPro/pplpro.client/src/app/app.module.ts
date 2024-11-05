import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentCreateComponent } from './components/department-create/department-create.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { RoleCreateComponent } from './components/role-create/role-create.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    LoadingSpinnerComponent,
    EmployeeCreateComponent,
    DepartmentCreateComponent,
    DepartmentListComponent,
    RoleCreateComponent,
    RoleListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
