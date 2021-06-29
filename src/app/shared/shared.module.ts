import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DosenComponent } from './dosen/dosen.component';
import { DosenFormComponent } from './dosen-form/dosen-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    HistoryComponent,
    DashboardComponent,
    DosenComponent,
    DosenFormComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

    // form
    FormsModule,
    ReactiveFormsModule,

    // material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ],
  exports: [
    LoginComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,

    AdminComponent,
    HistoryComponent,
    DashboardComponent,
    DosenComponent,
    DosenFormComponent,
  ],
})
export class SharedModule {}
