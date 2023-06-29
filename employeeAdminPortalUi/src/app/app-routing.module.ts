import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

const routes: Routes = [
  {
    path : '',
    component : EmployeeComponent
  },
  {
    path : 'employees',
    component : EmployeeComponent
  },
  {
    path : 'employees/:id',
    component : ViewEmployeeComponent
  },
  {
    path : 'employees/add/:id',
    component : ViewEmployeeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
