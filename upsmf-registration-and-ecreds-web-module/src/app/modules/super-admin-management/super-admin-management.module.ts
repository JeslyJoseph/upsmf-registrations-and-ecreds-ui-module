import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminManagementRoutingModule } from './super-admin-management-routing.module';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SuperAdminManagementRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SuperAdminManagementModule { }
