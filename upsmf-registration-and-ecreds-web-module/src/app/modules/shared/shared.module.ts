import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedSkeletonLoadingComponent } from './components/shared-skeleton-loading/shared-skeleton-loading.component';
import { MaterialModule } from '../../../app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigService } from './services/config/config.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { AdminRegnCertificateDetailsComponent } from './components/admin-regn-certificate-details/admin-regn-certificate-details.component';
import { AdminGoodStandingForeignVerificationComponent } from './components/admin-good-standing-foreign-verification/admin-good-standing-foreign-verification.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
@NgModule({
  declarations: [
    SharedTableComponent,
    HeaderComponent,
    SharedSkeletonLoadingComponent,
    BreadcrumbComponent,
    DialogBoxComponent,
    ConfirmationPopupComponent,
    AdminRegnCertificateDetailsComponent,
    AdminGoodStandingForeignVerificationComponent,
    UserProfileComponent,
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    
    
  ],
  exports :
  [
    SharedTableComponent,
    HeaderComponent,
    SharedSkeletonLoadingComponent,
    BreadcrumbComponent
    
  ],
  providers: [ConfigService]
})
export class SharedModule { }
