import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import {  FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseServiceService } from 'src/app/services/base-service.service';


@Component({
  selector: 'app-new-regn-certificate',
  templateUrl: './new-regn-certificate.component.html',
  styleUrls: ['./new-regn-certificate.component.scss']
})
export class NewRegnCertificateComponent {


  fileList: File[] = [];
  listOfFiles: any[] = [];
  isLoading = false;
  submitted = false;
  details:Observable<any>;


  originTypesArray = [
    'From UP', 'Outside UP'
  ]
  councilsTypesArray= [
    'Paramedical', 'Nursing'
  ]

  qualificationsTypesArray = [
    'MSC', 'BSC', 'POST BASIC', 'NURSING PRACtitioner'
  ]

  claimsTypesArray= [
    'Permanent', 'Additional', 'Provisional', 'Others'
  ]

  degreesTypesArray= [
    'degree', 'Diploma'
  ]



  @Input()  newRegCertformGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,private baseService: BaseServiceService      ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.newRegCertformGroup = this.formBuilder.group({
      rollNo: new FormControl('', [
        Validators.required]),
      claimType: new FormControl('', [
        Validators.required]),
      qualificationType: new FormControl('', [
        Validators.required]),
      councilName: new FormControl('', [
        Validators.required]),
      origin: new FormControl('', [
        Validators.required]),
      endDate: new FormControl('', [
        Validators.required,this.validateMinAge(20) as ValidatorFn]),
      degree: new FormControl('', [
        Validators.required]),
    });


  }
  validateMinAge(minAge: number) {
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - selectedDate.getFullYear();

      if (age < minAge) {
        return { invalidMinAge: true };
      }

      return null;
    };
  }
  

 


  onSubmit(value:any){
    var data = this.newRegCertformGroup.value;
    var myPostObject = {
      councilName:data.councilName,
      claimType:data.claimType,
      origin:data.origin,
      degree:data.degree,
    } 
    this.baseService.makeClaim$(myPostObject).subscribe(
      (response) =>{
        console.log(response);

      },
      

    )
  }

  
  onNewRegnCertformSubmit(value : any){
    console.log(value)
    this.submitted = true;
    if( this.newRegCertformGroup.valid){
      this.router.navigate(['claims/new-regn-cert-details'],{state:{body:value}});
    }
    
  }
 

  radioChecked(e: any, e1: any) {
    console.log(e)
  }

  grievanceSelected(grievance: Event) {
    console.log(grievance)
  }

  councilSelected(e: Event) {
    console.log(e)
  }

  qualificationSelected(e: Event) {
    console.log(e)
  }

  claimSelected(e: Event) {
    console.log(e)
  }

  degreeSelected(e: Event) {
    console.log(e)
  }

  onReset() {
    this.submitted = false;
    this.newRegCertformGroup.reset();
    this.listOfFiles = [];
}

  onFileChanged(event?: any){
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];
   
      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        console.log();
        this.listOfFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
      }
    }
  }

  removeSelectedFile(index: any) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
claimData(){
  
}


}
