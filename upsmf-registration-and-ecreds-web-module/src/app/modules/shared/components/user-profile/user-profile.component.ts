import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/modules/super-admin-management/service/super-admin.service';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { BreadcrumbItem } from '../../interfaces';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
userEmail:string = ''
userDetails:any;
userRole:any;
endPointUrl:string = ''
breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', url: '/' },
  {label: 'Profile', url: '/user-profile'},
];
  constructor(private superadminservice: SuperAdminService,
    private baseService: BaseServiceService,
    private router: Router,private configService: ConfigService){
  }

  ngOnInit(): void {
    this.userRole = this.baseService.getUserRole()[0];
   this.userEmail = this.baseService.getUserEmail()
    // this.getUserDetails()
    this.getUserProfile()
  }

  getUserProfile(){
    switch (this.userRole) {
      case 'StudentFromUP':
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS
        this.getUserDetails()
        break;
      case 'Regulator':
        this.endPointUrl = this.configService.urlConFig.URLS.ADMIN.GET_ADMIN_DETAILS
        this.getUserDetails()
        break;
      case 'SuperAdmin':
        this.endPointUrl = this.configService.urlConFig.URLS.SUPERADMIN.GET_SUPERADMIN_DETAILS
        this.getUserDetails()
        break;
      default:
        return '';
    }
    return
    
  }
  getUserDetails(){
   this.baseService.getCandidatePersonalDetails$(this.endPointUrl).subscribe({
      next:(res)=>{
      this.userDetails= res.responseData[0]
      console.log('res',this.userDetails)
      }
    })
  }
  // getUserDetails(){
  //   const reqObj = {
  //     "request":{
  //       "fieldName":"email",
  //       "fieldValue":this.userEmail
  //   }
  //   }

  //   this.superadminservice.getEmails(reqObj).subscribe({
  //     next:(res)=>{
  //       console.log('getData',res)
  //       this.userDetails=  res[0]
  //     }
  //   })
  // }

  goToHome() {
    this.router.navigate(['/']);
  }

}
