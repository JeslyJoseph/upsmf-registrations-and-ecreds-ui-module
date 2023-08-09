import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-regn-cert-details',
  templateUrl: './new-regn-cert-details.component.html',
  styleUrls: ['./new-regn-cert-details.component.scss']
})
export class NewRegnCertDetailsComponent {
  @ViewChild('attachments') attachment: any;

  links = ['Candidate Details', 'Course Details', 'Payment Details']

  newRegCertformGroup: FormGroup;
  public newRegCertDetailsformGroup: FormGroup;
  newRegCourseDetailsformGroup: FormGroup;
  submitted = false;

  candidateDetails: boolean = true;
  paymentDetails: boolean = false;
  stateData: any;

  genderTypesArray = ['Male', 'Female', 'Others']

  listOfFiles: any[] = [];
  fileList: File[] = [];

  listOfCourseFiles: any[] = [];
  courseFileList: File[] = [];
  joinDate = new FormControl(new Date());
  


  constructor(private formBuilder: FormBuilder,
    private location: Location, private baseService: BaseServiceService,
    private router: Router
  ) {
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.newRegCertDetailsformGroup = this.formBuilder.group({
      applicantName: new FormControl('44g4g', [
        Validators.required]),
      motherName: new FormControl('g43g', [
        Validators.required]),
      fatherName: new FormControl('4g42g', [
        Validators.required]),
      dob: new FormControl('g43', [
        Validators.required]),
      al1: new FormControl('e4t', [
        Validators.required]),
      al2: new FormControl('efewf', [
        Validators.required]),
      district: new FormControl('dfgh', [
        Validators.required]),
      state: new FormControl('cvbn', [
        Validators.required]),
      pin: new FormControl('123', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]
      ),
      country: new FormControl('sdfgh', [
        Validators.required]),
      adhr: new FormControl('3456', [
        Validators.required]),
      gender: new FormControl('', [
        Validators.required]),
      email: new FormControl('arun@awe.com', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobNumber: new FormControl('8989786756', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
    });

    this.newRegCourseDetailsformGroup = this.formBuilder.group({
      courseName: new FormControl('', [
        Validators.required]),
      collegeName: new FormControl('', [
        Validators.required]),
      examBody: new FormControl('', [
        Validators.required]),
      joinDate: new FormControl('', [
        Validators.required]),
      rollNum: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]),
      passDate: new FormControl('', [
        Validators.required])
    }
    , { validators: this.dateComparisonValidator() }
    );
  }

  
 

  dateComparisonValidator(){
    console.log("valition")
    return (control: AbstractControl): ValidationErrors | null => {
      // console.log(control.get('joinDate')?.value)
      const joinDate = control.get('joinDate')?.value;
      const passDate = control.get('passDate')?.value;
  
      if (joinDate && passDate && joinDate > passDate) {
        return { dateComparison: true };
      }
  
      return null;
    };
    
  }
  

  newRegCertDetailsformGroupSubmit(value: any) {
    console.log(value)
    this.submitted = true;
    if (this.newRegCertDetailsformGroup.valid) {
      this.candidateDetails = false;
    }

  }
  onSubmit(value: any) {
    var applicant_details = this?.newRegCertDetailsformGroup?.value;
    var course_details = this?.newRegCourseDetailsformGroup?.value;
    var data = this.stateData;
    console.log("first form", this.stateData)
    console.log(applicant_details)
    // console.log(data)

    var updateStudent = {
      registrationType: data.body.degree,
      council: data.body.councilName,
      email: applicant_details.email,
      mothersName: applicant_details.motherName,
      fathersName: applicant_details.fatherName,
      dateOfBirth: applicant_details.dateOfBirth,
      // date: string,
      aadhaarNo: applicant_details.aadhaarNo,
      gender: applicant_details.gender,
      courseName: data.body.claimType,
      nursingCollage: course_details.collegeName,
      joiningMonth: course_details.joinDate,
      // joiningYear: course_details.joinDate,
      passingMonth: course_details.passDate,
      // passingYear: course_details.pass,
      finalYearRollNo: course_details.rollNo,
      // examBody: string

    }
    this.baseService.updateStudent$(updateStudent).pipe(
      mergeMap((response) => {
        console.log("first", response)
        var claimBody = {
          entityId: response.id,
          entityName: course_details.courseName,
          name: applicant_details.applicantName,
          propertiesOSID: {
            studentUPVerification: [response.id

            ]
          }

        }
        console.log(claimBody)

        return this.baseService.createClaim$(claimBody);
      })
    ).subscribe(
      (response) => {
        console.log("second", response)

      }
    );

  }




 

  onFileChanged(event?: any) {
    console.log(event);
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
      }
    }
  }



  onCourseFileChanged(event?: any) {
    console.log(event);
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfCourseFiles.indexOf(selectedFile.name) === -1) {
        this.courseFileList.push(selectedFile);
        this.listOfCourseFiles.push(selectedFile.name.concat(this.formatBytes(selectedFile.size)));
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

  removeSelectedCourseFile(index: any) {
    // Delete the item from fileNames list
    this.listOfCourseFiles.splice(index, 1);
    // delete file from FileList
    this.courseFileList.splice(index, 1);
  }

  showInfo(option: any) {
    console.log(option)
    switch (option) {
      case 'Payment Details':
        this.paymentDetails = !this.paymentDetails
        break;
      case 'Candidate Details':
        this.candidateDetails = true;
        this.paymentDetails = false;
        break;
      case 'Course Details':
        this.candidateDetails = false;
        this.paymentDetails = false;
        break;
      default:

        return '';
    }
    return;
  }

  onReset() {
    console.log("onReset")
    this.submitted = false;
    this.newRegCertDetailsformGroup.reset();
    this.listOfFiles = [];
  }

  navToPreviousPage() {
    console.log("hhh")
    this.location.back()
  }
}
