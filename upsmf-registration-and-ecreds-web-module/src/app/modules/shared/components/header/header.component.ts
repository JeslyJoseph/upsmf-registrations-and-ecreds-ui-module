import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService,
    private router: Router){

  }

  navigateToProfilePage(){
   
  }

  logout(){
  this.authService.logout()
  this.router.navigate(['/'])
  }

}
