import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { allStateList } from 'src/models/statemodel';
import { credentialsType } from 'src/models/credentialsTypemodel';
import { BreadcrumbItem, ConfigService } from 'src/app/modules/shared';
import { HttpService } from 'src/app/core/services/http-service/http.service';
import { DialogBoxComponent, DialogModel } from 'src/app/modules/shared/components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { applabels } from '../../../../messages/labels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-admin-regn-certificate-details',
  templateUrl: './admin-regn-certificate-details.component.html',
  styleUrls: ['./admin-regn-certificate-details.component.scss']
})
export class AdminRegnCertificateDetailsComponent {
  labels = applabels;
  links = ['Candidate Details', 'Course Details']

  logo = '../../../../../assets/images/sunbird_logo.png';
  internalLogo = '../../../../../assets/images/up_smf_logo-24_x_24.png'; 
  newRegCertformGroup: FormGroup;
  public newRegCertDetailsformGroup: FormGroup;
  newRegCourseDetailsformGroup: FormGroup;
  submitted = false;

  candidateDetails: boolean = true;
  paymentDetails: boolean = false;

  genderTypesArray = ['male', 'female', 'Others']

  listOfFiles: any[] = [];
  fileList: File[] = [];

  listOfCourseFiles: any[] = [];
  courseFileList: File[] = [];
  isStudent: boolean = true;
  candidateDetailList: any[] = [];
  docsUrl: any[] = [];
  urlData: any[] = [];
  urlList: any;
  updatedUrlList: any;
  urlDataResponse: string;
  docsResponseUrl: string;
  convertUrlList: string;
  getMakeClaimbody: any;
  isInactive = true;

  // breadcrumbItems: BreadcrumbItem[] = [
  //   { label: 'Workspace', url: '/admin' },
  //   { label: 'Claim Manage', url: '/admin/manage-claim' },
  //   { label: 'Claim Certificate', url: '/admin/view-claim' },
  // ];

  osid: string;
  entity: string;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthMap: { [key: string]: string } = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12"
  };
  stateList: any[] = []
  credTypeList: any[] = [];
  userRole: any;
  userEmail: any;
  endPointUrl: any;
  courseList: any[] = [];
  courseUrl: string = ''
  paymentResponse: any;
  updateStudentBody: any;


  stateData: any;
  selectedLink: string = 'Candidate Details';
  requestTypesArray = ['Orignal', 'Correction', 'Name change', 'Dublicate'];


  constructor(private formBuilder: FormBuilder,
    //  private datePipe: DatePipe,
    private location: Location, private baseService: BaseServiceService,
    private router: Router,
    private configService: ConfigService,
    private http: HttpService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.userEmail = this.baseService.getUserRole()[0]
 
    this.stateList = allStateList;
    this.credTypeList = credentialsType
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
    this.stateData = this.stateData?.body
    console.log("data",this.stateData)


  }

  ngOnInit() {
    this.initForm();

    this.route.queryParams.subscribe((param) => {
      if (param['resData']) {
        this.paymentResponse = JSON.parse(param['resData'])
        this.paymentDetails = this.paymentResponse.isPayment
      }
    })

  }

  getCourses(courseUrl: string) {
    this.baseService.getCourses(courseUrl).subscribe((data) => {
      this.courseList = data.responseData['result']
    })
  }

  getEndPoint() {
    switch (this.stateData?.origin) {

      case 'StudentOutsideUP':
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS_OUTSIDE_UP
        this.courseUrl = this.configService.urlConFig.URLS.STUDENT.GET_COURSES_OUTSIDE
        this.getCourses(this.courseUrl)
        break;
      case 'StudentFromUP':
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS
        this.courseUrl = this.configService.urlConFig.URLS.STUDENT.GET_COURSES + 'DEGREE'
        this.getCourses(this.courseUrl)
        break;
      case 'Regulator':
        // this.router.navigate(['claims/new-regn-cert'])
        break;

      default:
        return '';
    }
    return
  }

  requestTypeSelected(e: Event) {
  }

  stateTypeSelected(e: Event) {
  }

  credTypeSelected(e: Event) {

  }

  initForm() {

    this.newRegCertDetailsformGroup = this.formBuilder.group({
      applicantName: new FormControl('', [
        Validators.required]),
      motherName: new FormControl('', [
        Validators.required]),
      fatherName: new FormControl('', [
        Validators.required]),
      dob: new FormControl('', [
        Validators.required]),
      al1: new FormControl('', [
        Validators.required]),
      al2: new FormControl('', [
        Validators.required]),
      district: new FormControl('', [
        Validators.required]),
      state: new FormControl('UP', [
        Validators.required]),
      pin: new FormControl('302001', [
        Validators.required, Validators.minLength(6),
        Validators.pattern("^[0-9]*$")]
      ),
      country: new FormControl('', [
        Validators.required]),
      adhr: new FormControl('', [
        Validators.required]),
      gender: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|91)?[6-9][0-9]{9}$")]),
      credType: new FormControl('', [
        Validators.required]),

    });

    this.newRegCourseDetailsformGroup = this.formBuilder.group({
      courseName: new FormControl('', [
      ]),
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
        Validators.required]),
      requestType: new FormControl('', [
        Validators.required]),
      diplomaNumber: new FormControl(''),
      stateName: new FormControl(''),
      date: new FormControl(''),
      newCouncil: new FormControl(''),
      otherRegnNo: new FormControl(''),
      university: new FormControl('', [
        Validators.required]),
    });
    this.getEndPoint();
    this.newRegCertDetailsformGroup.disable();
    this.newRegCourseDetailsformGroup.disable();
    this.getCandidatePersonalDetails();

  }

  getCandidatePersonalDetails() {
    this.osid = this.stateData?.entityId
    this.entity = this.stateData?.entity
    if (this.entity === "StudentFromUP" && this.userEmail === "Regulator") {
      this.baseService.getCandidatePersonalDetailsRegulator$(this.entity,this.osid)
        .subscribe(
          (response: any) => {

            console.log("c",response.responseData.courseName)
            this.osid = response.responseData.osid;
            this.urlDataResponse = response.responseData.docproof;
            if (!!this.urlDataResponse) {
              this.urlData = this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
              if (this.urlData.length) {
                this.listOfFiles = this.urlData?.map(url => {
                  const parts = url.split('=');
                  const fileNameWithQueryParams = parts[1];
                  const fileName = fileNameWithQueryParams.split('/').pop();
                  const extractLastPart = fileName?.split('_').pop();
                  const getuploadObject = {
                    name: extractLastPart,
                    url: url
                  }
                  return getuploadObject;
                });
              }
            }



            // this.listOfFiles = this.candidateDetailList[0].docproof;
            this.newRegCertDetailsformGroup.patchValue({
              email:response.responseData.email,
              mobNumber: response.responseData.phoneNumber,
              applicantName: response.responseData.name,
              adhr: response.responseData.aadhaarNo,
              motherName: response.responseData.mothersName,
              fatherName: response.responseData.fathersName,
              dob: response.responseData.dateOfBirth,
              gender: response.responseData.gender,
              al1: response.responseData.address,
              al2: response.responseData.address,
              state: response.responseData.state,
              pin: response.responseData.pincode,
              district: response.responseData.district,
              country: response.responseData.country,
              credType: response.responseData.credType,





              // district : response[0]?.district
            });
            const month = (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1 < 10) ?
              "0" + (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1) :
              new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1


            const joinM = response.responseData.joiningMonth;
            const jm = this.monthMap[joinM]
            const passM = response.responseData.passingMonth;
            const pm = this.monthMap[joinM]

            this.newRegCourseDetailsformGroup.patchValue({
              courseName: response.responseData.courseName,
              collegeName: response.responseData.nursingCollage,
              examBody: response.responseData.examBody,
              university:response.responseData.university,

              joinDate: response.responseData.joiningYear + "-" + jm + "-01",
              rollNum: response.responseData.finalYearRollNo,
              passDate: response.responseData.passingYear + "-" + pm + "-01",
              requestType: response.responseData.requestType
            });

            // }


            /*     this.listOfFiles =  */
          }
        );

    }
    else if (this.entity === "StudentOutsideUP" && this.userEmail === "Regulator") {
      this.baseService.getCandidatePersonalDetailsRegulator$(this.entity,this.osid)
        .subscribe(
          (response: any) => {
            this.osid = response.responseData.osid;
            this.urlDataResponse = response.responseData.docproof;
            if (!!this.urlDataResponse) {
              this.urlData = this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
              if (this.urlData.length) {
                this.listOfFiles = this.urlData?.map(url => {
                  const parts = url.split('=');
                  const fileNameWithQueryParams = parts[1];
                  const fileName = fileNameWithQueryParams.split('/').pop();
                  const extractLastPart = fileName?.split('_').pop();
                  const getuploadObject = {
                    name: extractLastPart,
                    url: url
                  }
                  return getuploadObject;
                });
              }
            }



            this.newRegCertDetailsformGroup.patchValue({
              email: response.responseData.email,
              mobNumber: response.responseData.phoneNumber,
              applicantName: response.responseData.name,
              adhr: response.responseData.aadhaarNo,
              motherName: response.responseData.mothersName,
              fatherName: response.responseData.fathersName,
              dob: response.responseData.dateOfBirth,
              gender: response.responseData.gender,
              al1: response.responseData.address,
              al2: response.responseData.address,
              state: response.responseData.state,
              pin: response.responseData.pincode,
              district: response.responseData.district,
              country: response.responseData.country,
              credType: response.responseData.credType,





              // district : response[0]?.district
            });
            const month = (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1 < 10) ?
              "0" + (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1) :
              new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1


            const joinM = response.responseData.joiningMonth;
            const jm = this.monthMap[joinM]
            const passM = response.responseData.passingMonth;
            const pm = this.monthMap[joinM]

            this.newRegCourseDetailsformGroup.patchValue({
              courseName: response.responseData.courseName,
              collegeName: response.responseData.nursingCollage,
              examBody: response.responseData.examBody,

              joinDate: response.responseData.joiningYear + "-" + jm + "-01",
              rollNum: response.responseData.finalYearRollNo,
              passDate: response.responseData.passingYear + "-" + pm + "-01",
              requestType: response.responseData.requestType,
              university:response.responseData.university
            });

            console.log(this.newRegCourseDetailsformGroup.value.joinDate)
            // }


            /*     this.listOfFiles =  */
          }
        );

    }
    else {

      if (this.stateData?.origin === "StudentOutsideUP") {
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS_OUTSIDE_UP
        // switch (this.stateData?.origin) {

        //   case 'StudentOutsideUP':
        //     this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS_OUTSIDE_UP
        //     this.courseUrl= this.configService.urlConFig.URLS.STUDENT.GET_COURSES_OUTSIDE
        //     this.getCourses(this.courseUrl)
        //     break;
        //     case 'StudentFromUP':
        //     this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS
        //     this.courseUrl = this.configService.urlConFig.URLS.STUDENT.GET_COURSES + 'DEGREE'
        //     this.getCourses(this.courseUrl)
        //     break;
        //     case 'Regulator':
        //     // this.router.navigate(['claims/new-regn-cert'])
        //     break;

        //   default:
        //     return '';
        // }
      }
      else {
        this.endPointUrl = this.configService.urlConFig.URLS.STUDENT.GET_STUDENT_DETAILS

      }


      this.baseService.getCandidatePersonalDetails$(this.endPointUrl)
        .subscribe(
          (response: any) => {
            if (response.responseData.length) {
              this.candidateDetailList = response.responseData
              this.osid = this.candidateDetailList[0].osid;
              this.urlDataResponse = this.candidateDetailList[0].docproof;


              if (!!this.urlDataResponse) {
                this.urlData = this.urlDataResponse?.split(",").filter(url => url.trim() !== "");
                if (this.urlData.length) {
                  this.listOfFiles = this.urlData?.map(url => {
                    const parts = url.split('=');
                    const fileNameWithQueryParams = parts[1];
                    const fileName = fileNameWithQueryParams.split('/').pop();
                    const extractLastPart = fileName?.split('_').pop();
                    const getuploadObject = {
                      name: extractLastPart,
                      url: url
                    }
                    return getuploadObject;
                  });
                }
              }



              // this.listOfFiles = this.candidateDetailList[0].docproof;
              this.newRegCertDetailsformGroup.patchValue({
                email: this.candidateDetailList[0]?.email,
                mobNumber: this.candidateDetailList[0]?.phoneNumber,
                applicantName: this.candidateDetailList[0]?.name,
                adhr: this.candidateDetailList[0]?.aadhaarNo,
                motherName: this.candidateDetailList[0]?.mothersName,
                fatherName: this.candidateDetailList[0]?.fathersName,
                dob: this.candidateDetailList[0]?.dateOfBirth,
                gender: this.candidateDetailList[0]?.gender,
                al1: this.candidateDetailList[0]?.address,
                al2: this.candidateDetailList[0]?.address,
                state: this.candidateDetailList[0].state,
                pin: this.candidateDetailList[0]?.pincode,
                district: this.candidateDetailList[0]?.district,
                country: this.candidateDetailList[0]?.country,
                credType: this.candidateDetailList[0]?.credType



                // district : response[0]?.district
              });
              const month = (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1 < 10) ?
                "0" + (new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1) :
                new Date(Date.parse(this.candidateDetailList[0]?.joiningMonth + " 1, 2012")).getMonth() + 1

              this.newRegCourseDetailsformGroup.patchValue({
                courseName: this.candidateDetailList[0]?.courseName,
                collegeName: this.candidateDetailList[0]?.nursingCollage,
                examBody: this.candidateDetailList[0]?.examBody,
                joinDate: this.candidateDetailList[0]?.joiningYear + "-" + month + "-01",
                rollNum: this.candidateDetailList[0]?.finalYearRollNo,
                passDate: this.candidateDetailList[0]?.passingYear + "-" + month + "-01",
                requestType: this.candidateDetailList[0]?.requestType,
                university:this.candidateDetailList[0]?.university
              });

            }


            /*     this.listOfFiles =  */
          }
        );
    }

  }

  newRegCertDetailsformGroupSubmit(value: any) {
    this.submitted = true;
    // if (this.newRegCertDetailsformGroup.valid) {
      this.candidateDetails = false;
    // }

  }
  onNewRegCourseDetailsformSubmit(value: any) {
    this.submitted = true;
    const osid = this.stateData?.id
    if (this.entity === "StudentFromUP") {
      const approveBody = {
        action: "GRANT_CLAIM",
        note: "Registration Certificate"
      }
      this.baseService.approveClaim$(osid, approveBody)
        .subscribe((response) => {
        })
    }
    else if (this.entity === "StudentOutsideUP" && this.userEmail === "Regulator") {
      const message = `Enter the email`;
      const message1 = `Upload Document`;

      const shouldShowFileUpload = true;
      const resDialog = new DialogModel(message, message1);

      let dialogRef = this.dialog.open(DialogBoxComponent, {
        disableClose: true,
        // width: '40rem',
        // height:'25rem',
        data: { message, message1, shouldShowFileUpload }
      });
      dialogRef.afterClosed().subscribe(result => {
        // const reason = result;


        if (result) {
          this.urlList = this.updatedUrlList ? this.updatedUrlList : [...this.docsUrl, ...this.urlData]
          if (this.urlData.length) {
            this.listOfFiles = this.urlData?.map(url => {
              const parts = url.split('=');
              if (parts.length === 2) {
                return decodeURIComponent(parts[1]);
              }
              return null;
            });

          }
          const details = JSON.parse(this.stateData.propertyData);
          //convert to string with commaa separated
          this.convertUrlList = this.listOfFiles.join(',')
          const mailBody = {
            outsideEntityMailId: result.reason,
            name: this.newRegCertDetailsformGroup.value.applicantName,
            gender: this.newRegCertDetailsformGroup.value.gender,
            council: details.council,
            email: this.newRegCertDetailsformGroup.value.email,
            examBody: value.examBody,
            docProofs: [this.convertUrlList],
            diplomaNumber: value.diplomaNumber,
            nursingCollage: value.collegeName,
            courseState: "aaaaa",
            courseCouncil: "BBB",
            state: this.newRegCertDetailsformGroup.value.state,
            country: this.newRegCertDetailsformGroup.value.country,
            // state: this.newRegCertDetailsformGroup.value.state,
            attachment: result.file,

          }
          this.baseService.sendMailOutsideUp$(mailBody).subscribe((response) => {
          })

        }

      });


    }
    else {
      if (this.newRegCourseDetailsformGroup.valid) {

        const joinDate = new Date(this.newRegCourseDetailsformGroup.get('joinDate')?.value);

        const passDate = new Date(this.newRegCourseDetailsformGroup.get('passDate')?.value);
        const jMonth = joinDate.getMonth();
        const pMonth = passDate.getMonth();
        const joinYear = joinDate.getFullYear();
        const passYear = joinDate.getFullYear();

        const joinMonth = this.months[jMonth];
        const passMonth = this.months[pMonth];
        this.urlList = this.updatedUrlList ? this.updatedUrlList : [...this.docsUrl, ...this.urlData]
        //convert to string with commaa separated
        this.convertUrlList = this.urlList.join(',')
        this.updateStudentBody =
        {
          // "date": this.datePipe.transform(new Date(), "yyyy-MM-dd")?.toString(),
          "candidatePic": "arun.jpg",
          "joiningYear": joinYear.toString(),
          "fathersName": this.newRegCertDetailsformGroup.value.fatherName,
          "gender": this.newRegCertDetailsformGroup.value.gender,
          "address": this.newRegCertDetailsformGroup.value.al1,
          "state": this.newRegCertDetailsformGroup.value.state,
          "district": this.newRegCertDetailsformGroup.value.district,
          "country": this.newRegCertDetailsformGroup.value.country,
          "pincode": this.newRegCertDetailsformGroup.value.pin,
          "finalYearRollNo": value.rollNum,
          "examBody": value.examBody,
          "joiningMonth": joinMonth,
          "passingMonth": passMonth,
          // "email": this.newRegCertDetailsformGroup.value.email,
          "paymentStatus": "SUCCESS",
          "feeReciptNo": "12345678",
          "aadhaarNo": this.newRegCertDetailsformGroup.value.adhr,
          // "dateOfBirth": this.datePipe.transform(this.newRegCertDetailsformGroup.value.dob, "yyyy-MM-dd")?.toString(),
          "barCode": "123457",
          "nursingCollage": value.collegeName,
          "passingYear": passYear.toString(),
          "courseName": value.courseName,
          "phoneNumber": this.newRegCertDetailsformGroup.value.mobNumber,
          "registrationType": this.stateData.claimType,
          "council": this.stateData.councilName,
          "mothersName": this.newRegCertDetailsformGroup.value.motherName,
          "name": this.newRegCertDetailsformGroup.value.applicantName,
          "credType": this.newRegCertDetailsformGroup.value.credType,
          "examYear": '',
          "centerCode": '',
          "requestType": value.requestType,
          "docproof": this.convertUrlList,
          "regNumber": this.stateData?.regNo ? this.stateData?.regNo : "NA",
          "diplomaNumber": value.diplomaNumber,
          "courseState": value.stateName ? value.stateName : "NA",
          "courseCouncil": value.newCouncil ? value.newCouncil : "NA",
          "nurseRegNo": value.otherRegnNo ? value.otherRegnNo : "NA",
          "nurseRegDate": value.date ? value.date : "NA",
          "claimType": "registration",
          "certificateNo": "NA",
          "university": value.university,
          "candidateSignature": "NA",
          "validityUpto": "NA"

        }

        if (this.osid) {
          const paymentData = {
            osId: this.osid,
            origin: this.stateData?.origin,
            endPointUrl: this.endPointUrl
          }
          localStorage.setItem('payData', JSON.stringify(paymentData))
          this.baseService.updateStudent$(this.osid, this.updateStudentBody, this.endPointUrl)
            .subscribe(
              (response) => {
                this.paymentDetails = true;


              },
            )
        } else {
          this.updateStudentBody = {
            ...this.updateStudentBody,
            email: this.newRegCertDetailsformGroup.value.email,
          }
          this.baseService.postStudent$(this.updateStudentBody, this.endPointUrl).subscribe((data) => {
            if (data.result['StudentOutsideUP']) {
              this.paymentDetails = true;
              this.osid = data?.result?.StudentOutsideUP['osid']

              const paymentData = {
                osId: this.osid,
                origin: this.stateData?.origin,
                endPointUrl: this.endPointUrl
              }
              localStorage.setItem('payData', JSON.stringify(paymentData))
            }

          })
        }
      }
    }
  }

  navigateToUrl(item: any) {
    window.open(item, "_blank");
  }


  onFileChanged(event?: any) {
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name);

      }
    }
    this.uploadFiles();

  }

  uploadFiles() {

    const formData = new FormData();
    for (var i = 0; i < this.fileList.length; i++) {
      formData.append("files", this.fileList[i]);
    }
    this.baseService.uploadFiles$(this.osid, formData, this.endPointUrl).subscribe((data) => {
      this.docsResponseUrl = data.result;
      this.docsUrl = this.docsResponseUrl.split(',').filter(url => url.trim() !== "")

      const uploadObj = this.docsUrl.map(url => {
        const parts = url.split('=');
        const fileNameWithQueryParams = parts[1];
        const fileName = fileNameWithQueryParams.split('/').pop();
        const extractLastPart = fileName?.split('_').pop();
        const getuploadObject = {
          name: extractLastPart,
          url: url
        }
        return getuploadObject;
      });
      this.listOfFiles.push(...uploadObj)
    })

  }

  onCourseFileChanged(event?: any) {
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
    this.updatedUrlList = this.listOfFiles.map(item => item.url)
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
  selectLink(link: string) {
    this.selectedLink = link;
  }

  showInfo(option: any) {
    this.selectLink(option);
    switch (option) {
      
      case 'Candidate Details':
        this.candidateDetails = true;
        break;
      case 'Course Details':
        this.candidateDetails = false;
        break;
      default:

        return '';
    }
    return;
  }

  doFormReset() {
    this.submitted = false;
    this.newRegCertDetailsformGroup.reset();
    this.listOfFiles = [];
  }

  takeAcceptRejectAction(entity: string) {
    if (this.entity === "StudentFromUP") {
      const message = `Reason For Rejection`;
      // const resDialog = new DialogModel( message);
      const shouldShowFileUpload = false;


      let dialogRef = this.dialog.open(DialogBoxComponent, {
        disableClose: true,
        width: '40rem',
        height: '25rem',
        data: { message, shouldShowFileUpload }
      });

      dialogRef.afterClosed().subscribe(result => {
        const reason = result;

        if (result) {
          const approveBody = {
            action: "REJECT_CLAIM",
            note: reason
          }
          const osid = this.stateData?.id
          this.baseService.approveClaim$(osid, approveBody)
            .subscribe((response) => {
            })

        }


      });


    } else { //studentoutside UP Regulator role
      this.createQRCode().then((qrCodeURL: any) => {
        this.generatePDF(qrCodeURL.toString())
      })
    }
  }

  onReset(entity: string) {
    this.userEmail === "Regulator" ? this.takeAcceptRejectAction(entity) : this.doFormReset();
  }

  async createQRCode() {
    const qrCodeData = 'https://example.com'; // Replace with your QR code data
    return await QRCode.toDataURL(qrCodeData);
  }

  navToPreviousPage() {
    this.location.back()
  }
  
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'open';
      case 'CLOSED':
        return 'closed';
      case 'REJECTED':
        return 'rejected';
      default:
        return '';
    }
  }

  handlePayment() {
    const postData = {
      endpoint: "https://eazypayuat.icicibank.com/EazyPG",
      returnUrl: "https://payment.uphrh.in/api/v1/user/payment",
      paymode: "9",
      secret: "",
      merchantId: "600547",
      mandatoryFields: {
        referenceNo: this.baseService.generate_uuidv4(),
        submerchantId: "45",
        transactionAmount: "1000",
        invoiceId: "x1",
        invoiceDate: "x",
        invoiceTime: "x",
        merchantId: "x",
        payerType: "registration",
        payerId: 'instituteId',
        transactionId: "x",
        transactionDate: "x",
        transactionTime: "x",
        transactionStatus: "x",
        refundId: "x",
        refundDate: "x",
        refundTime: "x",
        refundStatus: "x",
      },

      optionalFields: "registration",

    };
    this.http.getPaymentUrl(postData).subscribe((data) => {
      if (data) {
        window.open(data?.redirectUrl, '_blank')

      }
    }
    )
  }
  generatePDF(qrCodeString: string) {
    const doc = new jsPDF()
    autoTable(doc, {
      margin: { top: 50 },
      rowPageBreak: 'auto',
      bodyStyles: { valign: 'top' },

      head: [],
      body: [
        [this.labels.applicantName, this.newRegCertDetailsformGroup.controls['applicantName'].value],
        [this.labels.mobNumber, this.newRegCertDetailsformGroup.controls['mobNumber'].value],
        [this.labels.email, this.newRegCertDetailsformGroup.controls['email'].value],
        [this.labels.fatherName, this.newRegCertDetailsformGroup.controls['fatherName'].value],
        [this.labels.motherName, this.newRegCertDetailsformGroup.controls['motherName'].value],
        [this.labels.dob, this.newRegCertDetailsformGroup.controls['dob'].value],
        [this.labels.credType, this.newRegCertDetailsformGroup.controls['credType'].value],
        [this.labels.gender, this.newRegCertDetailsformGroup.controls['gender'].value],
        [this.labels.al2, this.newRegCertDetailsformGroup.controls['al2'].value],
        [this.labels.al2, this.newRegCertDetailsformGroup.controls['al2'].value],
        [this.labels.district, this.newRegCertDetailsformGroup.controls['district'].value],
        [this.labels.state, this.newRegCertDetailsformGroup.controls['state'].value],
        [this.labels.pin, this.newRegCertDetailsformGroup.controls['pin'].value],
        [this.labels.country, this.newRegCertDetailsformGroup.controls['country'].value],
        [this.labels.adhr, this.newRegCertDetailsformGroup.controls['adhr'].value],
        // [this.labels.attach,this.newRegCertDetailsformGroup.controls['attach'].value ],  
        [this.labels.requestType, this.newRegCourseDetailsformGroup.controls['requestType'].value],
        [this.labels.courseName, this.newRegCourseDetailsformGroup.controls['courseName'].value],
        [this.labels.collegeName, this.newRegCourseDetailsformGroup.controls['collegeName'].value],
        [this.labels.university, this.newRegCourseDetailsformGroup.controls['university'].value],
        [this.labels.examBody, this.newRegCourseDetailsformGroup.controls['examBody'].value],
        [this.labels.rollNum, this.newRegCourseDetailsformGroup.controls['rollNum'].value],
        [this.labels.diplomaNumber, this.newRegCourseDetailsformGroup.controls['diplomaNumber'].value],
        [this.labels.joinDate, this.newRegCourseDetailsformGroup.controls['joinDate'].value],
        [this.labels.passDate, this.newRegCourseDetailsformGroup.controls['passDate'].value],

      ],
      didDrawPage: (data) => {
        doc.text(this.labels.header, 14, 40);
        doc.addImage(this.logo, 10, 8, 80, 20);
        doc.addImage(qrCodeString, 160, 10, 30, 30);
        doc.addImage(this.internalLogo, 173, 23, 5, 5);
        const text = 'Please scan this QR code to approve / reject the claim'; // Replace with your desired text
        doc.setFontSize(7)
        doc.text(text,145, 40 );
      }
    });

    doc.save(`Certificate_${this.newRegCourseDetailsformGroup.controls['rollNum'].value}_.pdf`)

  }

}
