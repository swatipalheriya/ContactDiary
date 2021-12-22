import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  modal: any;
  // showModel = false;
  showadd!: boolean;
  showupdate!: boolean;
  imagepath:"src/assets/is.jpg" | undefined;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      contact: [''],
      formFile: [''],
      // sampleFile:['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showadd=true;
    this.showupdate=false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.formFile = this.formValue.value.imagepath;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Employee added successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        (err: any) => {
          alert("something went");
        }
      )
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
      .subscribe((res: any) => {
        alert("employee deleted");
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showadd=false;
    this.showupdate=true;
    this.employeeModelObj.id = row.id;       //passing id value to employeeobject
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['formFile'].setValue(row.formFile);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.formFile = this.formValue.value.formFile;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res: any) => {
        alert("updated succeessfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      }
      );
  }
  uploadFile(event:any){
    console.log("file upload");
       if(event.target.files[0]>0){
      const file=event.target.files[0];
      this.formValue.get('formFile')?.setValue(file);

    }
  
  }
  
}
