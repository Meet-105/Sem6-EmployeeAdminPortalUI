import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
type Department = {
  departmentID:Number,
  desciption:string
}
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // constructor() { }
  private baseApiUrl = 'https://localhost:7226'
  constructor(private httpClient:HttpClient) { }
  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.baseApiUrl + '/Department');
  }
  getDepartment(id:Number) : Observable<Department>{
    return this.httpClient.get<Department>(this.baseApiUrl + '/Department/' + id);
  }
}
