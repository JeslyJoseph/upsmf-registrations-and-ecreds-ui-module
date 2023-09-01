export interface ClaimsTableData {
    status: string;
    attachedDocs?: Array<string>;
    claimType?:string;
    id: string;
    entity: string;
    entityId: string;
    createdAt: string;
    updatedAt: string;
    attestedOn: string;
    attestorEntity: string;
    requestorName: string;
    attestationId: string;
    attestationName: string;
    attestorUserId: string;
    closed: boolean;
    notes?: string;
    propertyData?:string;
    conditions?:string;
    propertyURI?:string;
  }

  export interface UsersTableData {
    status: string;
    name: string;
    email:string;
    id: string;
    phoneNumber: string;
    role: string;
  }
  export interface DashBoardData{
    no:string;
    type:string;
    totalclaim:string
    pending:string;
    rejected:string;
    payment:string;
    issue:string;
    approval:string;
    claimpending:string
    
  }
  export interface ClaimDashBoardData{
    
      no:string,
      name:string,
      type:string,
      id:string,
      claimdate:string,
      prdate:string,
      status:string
    }

  export interface TableColumn {
    columnDef: string;
    header: string;
    cell: Function;
    isLink?: boolean;
    isAction?: boolean;
    url?: string;
    isMenuOption?: boolean;
    isSortable?: boolean;
  }

  export interface DialogData {
    examsTableColumns: [];
    exams: [];
  }
  export interface ApproveClaim{
    action:string,
    note:string
  }
  export interface SentMailBody{
    outsideEntityMailId:string,
    name: string,
    gender: string,
    council: string,
    email: string,
    examBody: string,
    docProof: string,
    diplomaNumber:string,
    nursingCollage: string,
    courseState:string,
    courseCouncil:string,
    state:string,
    country:string,
    // state: this.newRegCertDetailsformGroup.value.state,
    attachment:string,
  }


  export interface StudentDetails {

    date: string | undefined;
    candidatePic: string;
    joiningYear: string;
    fathersName:string;
    gender:string;
    finalYearRollNo:string;
    examBody:string;
    joiningMonth: string;
    passingMonth: string;
    email: string;
    paymentStatus: string;
    feeReciptNo: string;
    aadhaarNo: string;
    dateOfBirth: string | undefined;
    barCode: string;
    nursingCollage: string;
    passingYear: string;
    courseName: string;
    phoneNumber: string;
    registrationType:string;
    council: string;
    mothersName:string;
    name: string;
    docproof: string | string[]; 
    address?:string,
    state?: string
,   district?:string,
    country?:string,
    pincode?:string,
    credType?:string,
    examYear?:string,
    centerCode?:string

  }
  export interface ClaimDetails {
    entityName:string;
    entityId: string;
    name:string;
    propertiesOSID:object;
  }
  export interface StudentDetailsGoodStanding{
    name:string;
    fathersName:string;
    presentAddress:string;
    phoneNumber:string;
    email:string;
    trainingCenter:string;
    council:string
    workPlace:string;
    date:string | undefined;
    refNo:string;
    validityOfRegistration:string;
    dob:string | undefined;
    docproof:string | string[];
    candidatePic:string;
    paymentStatus: string,
    

  }
  export interface StudentDetailsForeignVerification{
    name:string;
    fathersName:string;
    address:string;
    phoneNumber:string;
    email:string;
    trainingCenter:string;
    council:string
    workPlace:string;
    date:string | undefined;
    refNo:string;
    validityOfRegistration:string;
    dob:string | undefined;
    docproof:string | string[];
    candidatePic:string;
    paymentStatus:string;

  }

  export interface paymentPostData {
      endpoint: string,
      returnUrl: string,
      paymode: string,
      secret: string,
      merchantId: string,
      mandatoryFields: {
        referenceNo: string,
        submerchantId: string,
        transactionAmount: string,
        invoiceId: string,
        invoiceDate: string,
        invoiceTime: string,
        merchantId: string,
        payerType: string,
        payerId: string,
        transactionId: string,
        transactionDate: string,
        transactionTime: string,
        transactionStatus: string,
        refundId: string,
        refundDate: string,
        refundTime: string,
        refundStatus: string,
      },

      optionalFields: string,
  }

  export interface studentUpdate {
    paymentStatus: string
  }


