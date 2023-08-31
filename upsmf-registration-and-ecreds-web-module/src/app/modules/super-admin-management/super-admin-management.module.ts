import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminManagementRoutingModule } from './super-admin-management-routing.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
  declarations: [
    DasboardComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    SuperAdminManagementRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SuperAdminManagementModule { }
