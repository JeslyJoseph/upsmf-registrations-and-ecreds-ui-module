import { Component } from '@angular/core';
import { ClaimDashBoardData, DashBoardData, TableColumn } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isDataLoading: boolean = false;

  adminTableColumns: TableColumn[] = [];
  adminData: DashBoardData[] = [];
  adminClaimData:ClaimDashBoardData[]=[];
  adminClaimTableColumns: TableColumn[]=[];

  ngOnInit(): void {
    this.initializeColumns();
    console.log(this.adminTableColumns)
    this.getUsers();
    console.log(this.adminData)
  }

  initializeColumns(): void {
    this.adminClaimTableColumns = [
      {
        columnDef: 'no',
        header: '#',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['no']}`
      },
      {
        columnDef: 'name',
        header: 'Applicant name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['name']}`
      },
      {
        columnDef: 'type',
        header: 'Claim type',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['type']}`
      },
      {
        columnDef: 'id',
        header: 'Claim Id',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['id']}`
      },
      {
        columnDef: 'claimdate',
        header: 'Claim date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['claimdate']}`
      },
      {
        columnDef: 'prdate',
        header: 'Approval/Rejection date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['prdate']}`
      },
      {
        columnDef: 'issuedate',
        header: 'Credential issuance date',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['issuedate']}`
      },
      {
        columnDef: 'status',
        header: 'Claim Status',
        isSortable: false,
        cell: (element: Record<string, any>) => `${element['status']}`
      },


    ];
  this.adminTableColumns = [
    {
      columnDef: 'no',
      header: '#',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['no']}`
    },
    {
      columnDef: 'type',
      header: 'Credential Type',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['type']}`
    },
    {
      columnDef: 'totalclaim',
      header: 'Total Claim',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['totalclaim']}`
    },
    {
      columnDef: 'pending',
      header: 'Pending',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['pending']}`
    },
    {
      columnDef: 'rejected',
      header: 'Rejected',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['rejected']}`
    },
    {
      columnDef: 'payment',
      header: 'Payment Pending',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['payment']}`
    },
    {
      columnDef: 'issue',
      header: 'Credential Issued',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['payment']}`
    },
    {
      columnDef: 'approval',
      header: 'TAT(Approval)',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['approval']}`
    },
    {
      columnDef: 'claimpending',
      header: 'Claim Pending >15 days',
      isSortable: false,
      // isMenuOption: true,
      cell: (element: Record<string, any>) => `${element['claimpending']}`
    }

  ];
  }

  getUsers() {
    this.isDataLoading = true;
    setTimeout(() => {
      this.isDataLoading = false;
    }, 1000);
    this.adminClaimData=[
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      },
      {
        no:"1",
        name:"Devaprathap Nagendra",
        type:"Paramedical",
        id:"IVFT4567987",
        claimdate:"24-09-2001",
        prdate:"26-04-2001",
        status:"Pending payment"
      }
    ]
    this.adminData = [
      {
        no : "1",
        type: "All Claim",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "34",
      },
      {
        no : "2",
        type: "UP - Registration - Diploma",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "12",
      },
      {
        no : "3",
        type: "UP - Registration - Degree",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "67",
      },
      {
        no : "4",
        type: "Non UP - Registration",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "23",
      },
      {
        no : "5",
        type: "Foreign Verification Request",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "56",
      },
      {
        no : "6",
        type: "Other Certificate",
        totalclaim: "87",
        pending: "87",
        rejected:"174",
        payment:"1",
        issue:"2",
        approval: "2",
        claimpending: "12",
      },]
    }

    onClickItem(e: any) {
      console.log(e)
      //let id = parseInt(e?.id)
      //this.router.navigate(['/:'+id], {state: {data: e}});
      //this.router.navigate(['/claims', e.id], { state: { data: e } });
      // this.router.navigate(['/grievance', e.id]);
    }

    onEditData(e : any){
      console.log(e)
    }
    onToggleData(e : any){
      console.log(e)
    }
    onDeleteData(e : any){
      console.log(e)
    }

}
