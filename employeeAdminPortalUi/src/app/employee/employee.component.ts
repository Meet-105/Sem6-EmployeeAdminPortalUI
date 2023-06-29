import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { Employee } from '../models/ui-models/employee.model';
import { EmployeeService } from './employee.service';
type Employee={
  id : Number,
  firstName : string,
  lastName : string,
  dateOfBirth : string,
  email : string,
  mobile : Number,
  roleId : Number,
  address : string,
  deptId : Number
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  employees : Employee[] = [];

  displayedColumns: string[] = ['Id', 'FirstName', 'LastName','DateOfBirth', 'MobileNo', 'RoleId', 'DeptId', 'edit'];
  datasource : MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) matpaginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private employeeservice : EmployeeService, private _liveAnnouncer: LiveAnnouncer){}

  ngOnInit(): void {
     this.employeeservice.getEmployees().subscribe(
      (succ)=>{
        this.employees = succ;
        // this.datasource=this.employees;
        this.datasource = new MatTableDataSource<Employee>(this.employees);
        if (this.matpaginator) {
            this.datasource.paginator = this.matpaginator;
        }
        this.datasource.sort = this.sort;
      },
      (error)=>{
        this.employees = error;
      }

     );
  }
}
