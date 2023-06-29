import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Employee } from '../models/api-models/employee.model'
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
type AddReq={
  firstName : string,
  lastName : string,
  dateOfBirth : string,
  email : string,
  mobile : Number,
  roleId : Number,
  address : string,
  deptId : Number
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseApiUrl = 'https://localhost:7226'
  constructor(private httpClient:HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseApiUrl + '/employees');
  }
  getEmployee(id:Number) : Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseApiUrl + '/employees/' + id);
  }
  updateEmployee(id:Number, updateEmpReq:Employee):Observable<Employee>{
    const req : Employee = {
      id:updateEmpReq.id,
      firstName : updateEmpReq.firstName,
      lastName : updateEmpReq.lastName,
      email : updateEmpReq.email,
      dateOfBirth : updateEmpReq.dateOfBirth,
      mobile : updateEmpReq.mobile,
      address : updateEmpReq.address,
      roleId : updateEmpReq.roleId,
      deptId : updateEmpReq.deptId
    }
    console.log("Updated dept id  : ", req.deptId)
    return this.httpClient.put<Employee>(this.baseApiUrl + '/employees/' + id,req)
  }
  deleteEmployee(id:Number):Observable<Employee>{
    return this.httpClient.delete<Employee>(this.baseApiUrl + '/employees/' + id)
  }
  addEmployee(addEmp:Employee):Observable<Employee>{
    const req : AddReq = {
      firstName : addEmp.firstName,
      lastName : addEmp.lastName,
      email : addEmp.email,
      dateOfBirth : addEmp.dateOfBirth,
      mobile : addEmp.mobile,
      address : addEmp.address,
      roleId : addEmp.roleId,
      deptId : addEmp.deptId
    };
    return this.httpClient.post<Employee>(this.baseApiUrl + '/employees/add', req)
  }
}
