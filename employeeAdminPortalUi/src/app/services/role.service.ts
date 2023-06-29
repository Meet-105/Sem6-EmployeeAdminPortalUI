import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
type Role = {
  roleID:Number,
  desciption:string
}
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // constructor() { }
  private baseApiUrl = 'https://localhost:7226'
  constructor(private httpClient:HttpClient) { }
  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.baseApiUrl + '/Role');
  }
  getRole(id:Number) : Observable<Role>{
    return this.httpClient.get<Role>(this.baseApiUrl + '/Role/' + id);
  }
}
