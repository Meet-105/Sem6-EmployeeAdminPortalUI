import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { RoleService } from 'src/app/services/role.service';
import { EmployeeService } from '../employee.service';
type Role = {
  roleID:Number,
  desciption:string
}
type Department={
  departmentID : Number,
  desciption : string
}
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit{
  id:Number | null | undefined;
  employee:Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    roleId: 0,
    deptId: 0,
    address: ''
  }
  isNew = false
  header=''
  roleList : Role[] = []
  deptList : Department[] = []
  constructor(private readonly employeeService:EmployeeService, private readonly route:ActivatedRoute,
    private readonly roleS:RoleService,
    private readonly deptS:DepartmentService,
    private snakbar:MatSnackBar,
    private router:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = Number(params.get('id'));
      if (this.id) {
        if (this.id == -1) {
          this.isNew = true;
          this.header = 'Add New Employee'
        }else{
          this.header = 'Edit Employee'
          this.isNew = false;
          this.employeeService.getEmployee(this.id).subscribe(
            (succ)=>{
              this.employee = succ
            }
          )
        }
        this.roleS.getRoles().subscribe(
          (succc)=>{
            this.roleList = succc
          })
        this.deptS.getDepartments().subscribe(
          (succcc)=>{
            this.deptList = succcc
          }
        )
      }
    });
  }

  onUpdate(): void{
    this.employeeService.updateEmployee(this.employee.id,this.employee).subscribe(
      (succ)=>{
        this.snakbar.open("Data Saved Successfully!",undefined,{
          duration:2000
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/employees');
        },2000)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  onDelete():void{
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      (succ)=>{
        this.snakbar.open("Data Deleted Successfully!",undefined,{
          duration:2000,
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/employees');
        },2000)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  onAdd():void{
    this.employeeService.addEmployee(this.employee).subscribe(
      (succ)=>{
        this.snakbar.open("Data Saved Successfully!",undefined,{
          duration:2000,
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/employees');
        },2000)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
