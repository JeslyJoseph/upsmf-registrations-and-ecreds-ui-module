import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    MaterialModule,
    
  ]
})
export class SuperAdminModule { }
